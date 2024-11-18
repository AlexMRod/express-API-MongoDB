import { Schema, model } from "mongoose"

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

const Song = model('Song', songSchema)

export default Song;