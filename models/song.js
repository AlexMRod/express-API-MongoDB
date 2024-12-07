import mongoose from 'mongoose';

const { Schema } = mongoose;

const songSchema = new Schema({
    artist: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: false,
        max: 2030,
    },
    song_url: {
        type: String,
        required: false,
        match: /^(http:\/\/|https:\/\/)/,
    },
});

const Song = mongoose.model('Song', songSchema);
export default Song;
