import express from 'express';
import Song from '../models/song.js';

const router = express.Router();

// Get songs or a specific song
router.get('/:id?', async (req, res) => {
    let query = {};
    if (req.params.id) {
        query._id = req.params.id;
    }

    try {
        const songs = await Song.find(query);
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create a new song
router.post('/', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        const result = await newSong.save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Delete a song
router.delete('/:id', async (req, res) => {
    try {
        const result = await Song.deleteOne({ _id: req.params.id });
        if (result.n === 0) return res.sendStatus(404);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
