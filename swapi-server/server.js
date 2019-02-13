const express = require("express");
const app = express();
const PORT = 4000;
const request = require("request-promise-native");
const path = require("path");
const fs = require("fs");
const imagesDbPath = path.resolve(`./data/images.json`);
const imagesDb = JSON.parse(fs.readFileSync(imagesDbPath));
const saveImagesDB = () =>
  fs.writeFileSync(imagesDbPath, JSON.stringify(imagesDb, null, 2));
const bodyParser = require("body-parser");
const swapi = "https://swapi.co";
const apiBase = `${swapi}/api`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log to console for debugging
app.use((req, res, next) => {
  console.log(
    `request: ${req.method} ${req.path}`,
    req.method === "POST" ? req.body : ""
  );
  next();
});

// Save a custom image for a resource
app.post("/images/:type/:id", (req, res, next) => {
  const type = req.params.type;
  const id = req.params.id;
  const images = imagesDb[type] || {};
  images[id] = req.body.imageUrl;
  imagesDb[type] = images;
  saveImagesDB();
  res.json({});
});

// Return image of a resource
app.get("/images/:type/:id", (req, res, next) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const images = imagesDb[type] || {};
    if (images[id]) {
      request({
        url: images[id]
      }).pipe(res);
    } else {
      const defaultImage = path.resolve(`./default-images/${type}.png`);
      if (fs.existsSync(defaultImage)) res.sendFile(defaultImage);
      else next();
    }
  } catch (err) {
    next();
  }
});

// Facade for getting all schemas together
app.get("/schemas", (req, res, next) => {
  const resources = [
    "films",
    "people",
    "species",
    "starships",
    "planets",
    "vehicles"
  ];
  Promise.all(
    resources.map(res => request({ url: `${apiBase}/${res}/schema` }))
  )
    .then(values => {
      let schema = {};
      resources.forEach((res, i) => (schema[res] = JSON.parse(values[i])));
      res.json(schema);
    })
    .catch(error => {
      console.log(" ERROR in /schemas: ", error.message);
      res.status(400);
      res.json({
        error:
          "Sorry, unable to get required details from SWAPI server!\nPlease try again after sometime."
      });
    });
});

// Proxy to SWAPI
app.use((req, res, next) => {
  const query = require("url").parse(req.url).query;
  const reqPath = req.path.toLowerCase();
  if (reqPath.indexOf("/api/") === 0) {
    request({
      url: `${swapi}/${reqPath}?${query}`
    }).pipe(res);
  } else next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
