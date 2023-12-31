const { Router } = require("express");

const {
  getVideogameHandler,
  getVideogameIdHandler,
  createVideogameHandler,
} = require("../handlers/videogameHandler");

const videogameRouter = Router();

videogameRouter.get("/", getVideogameHandler);

videogameRouter.get("/:id", getVideogameIdHandler);

videogameRouter.post("/", createVideogameHandler);

module.exports = videogameRouter;


