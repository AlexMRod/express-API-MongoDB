import connectDB from "../../db/connectDB.js";
import Song from "../../models/songModel.js";
connectDB();
const songController = {
    getSong: async (req, res) => {
        let query = {};
        if (req.params.id) {
            query._id = req.params.id;
        }

        try {
            const songs = await Song.find(query);
            return res.status(200).json(songs);
        }
        catch (err) {
            res.status(500).send(err)
        }
    },
    postOneSong: async (req, res) => {
        const songData = req.body;
        try {
            const newSong = new Song(songData);
            const result = await newSong.save();
            res.status(201).json(result)
        }
        catch (err) {
            console.error(err)
            res.status(500).send(err)
        }
    },
    deleteOneSong: async (req, res) => {
        try {
            const result = await Song.deleteOne({ _id: req.params.id });
            if (result.n === 0) return res.sendStatus(404);
            res.sendStatus(204)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

}

export default songController;