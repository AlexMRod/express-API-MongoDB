import 'dotenv/config'
import mongoose, { Schema } from 'mongoose'
import express from "express"

const app = express();

const {
    PORT = 3333,
    MONGODB_URI= "mongodb://localhost:27017/c18"
} = process.env;

try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("connected", conn);
  
    // this is for errors after a connection has been established
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    // this is for connection error
    console.log(error);
  }

  // functionality
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse application/json

const songSchema = new Schema({
    artist: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false,
        max: 2030
    },
    song_url:{
        type: String,
        required:false,
        match: /^(http:\/\/|https:\/\/)/,
        message: 'URL must start with http:// or https://',
    }
})

const Song = mongoose.model('Song', songSchema)

app.get('/api/v1/songs/:id', async (req, res) => {
let query = {};
if(req.params.id){
    query._id = req.params.id;
}

try {
    const songs = await Song.find(query);
    return res.status(200).json(songs);
}
catch (err) {
    res.status(500).send(err)
}
})

app.post("/api/v1/songs", async (req, res) => {
    const songData = req.body;
    try {
        const newSong = new Song(songData);
        const result = await newSong.save();
        res.status(200).json(result)
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}); 

app.delete('/api/v1/songs/:id', async (req, res) => {
try{
    const result = await Song.deleteOne({_id: req.params.id });
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(204)
}
catch (err) {
    res.status(500).send(err)
}
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});