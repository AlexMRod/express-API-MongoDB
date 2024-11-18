import express from "express";
import songController from "../controllers/song.controller.js";

const songRoutes = express.Router();

songRoutes
    .get('/songs/:id', songController.getSong)
    .post("/songs", songController.postOneSong)
    .delete('/songs/:id', songController.deleteOneSong)

export default songRoutes;