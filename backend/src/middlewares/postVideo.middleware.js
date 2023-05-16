const Joi = require("joi");

const postVideoSchema = Joi.object().keys({
    videoLink: Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    contentRating: Joi.string().required(),
    releaseDate: Joi.string().required(),
    previewImage: Joi.string().required(),
})

const validateVideo = (req,res,next)=>{
    const result = postVideoSchema.validate(req.body);
    if(result.error){
        console.log("caught in middleware")
        return res.status(404).json(result.error)
    }else {
        return next();
    }
}

module.exports = {validateVideo}