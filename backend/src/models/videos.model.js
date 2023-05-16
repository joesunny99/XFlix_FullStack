const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    videoLink:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    contentRating:{
        type: String,
        required: true,
    },
    releaseDate: {
        type:Date,
        required: true,
    },
    previewImage:{
        type: String,
        required: true,
    },
    votes:{
        type: {
            upVotes: Number,
            downVotes: Number
        },
        default: {
          upVotes: 0,
          downVotes: 0,
        },
        _id:false
    },
    viewCount: {
        type: Number,
        default: 0
    }
})

const videoModel = mongoose.model("Videos", videoSchema);
module.exports = videoModel;