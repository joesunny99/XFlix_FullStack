const videoService = require("../services/video.service")
const AppError = require("../utils/appError");

const getAllVideos =async(req,res, next)=>{
    try{
        let videos = await videoService.getAllVideos(req.query);
        // console.log("getting request");
        // if(req.query.sortBy){                            
        //     videos.videos.sort((a,b)=>b[req.query.sortBy]-a[req.query.sortBy]);
        // }
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

const getVideoById = async(req, res, next)=>{
    try{
        let video = await videoService.getVideoById(req.params.id);
        if(video){
            res.json(video);
        }else{
            // let err = new Error("Video not found");
            // err.statusCode = 404;
            // throw err;
            throw new AppError("Video not found", 404)
        }
    }catch(err){
        next(err);
    }
}

const postVideo = async(req, res, next) =>{
    try{
        let video = await videoService.addVideo(req.body);
        res.status(201).json(video);
    }catch(err){
        next(err);
    }
}

const patchVotes = async(req,res, next)=>{
    try{
        let result = await videoService.handleVoteChange(req.params.id, req.body.vote);
        if(result){
            res.sendStatus(204);
        }else{
            // res.status(400).json({message:"Id not found"});
            throw new AppError("Id not found", 400);
        }
    }catch(err){
        // res.sendStatus(500);
        next(err)
    }
}

const patchViewCount = async(req,res, next)=>{
    try{
        let result = await videoService.handleViewCount(req.params.id);
        if(result){
            res.sendStatus(204);
        }else{
            // res.status(400).json({message:"Id not found"});
            throw new AppError("Id not found", 400);
        }
    }catch(err){
        next(err);
    }
}

module.exports = {getAllVideos, getVideoById, postVideo, patchVotes, patchViewCount}