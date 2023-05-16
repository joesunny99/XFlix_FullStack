const Joi = require("joi");

// const objectId = (value, helpers) => {
//     if (!value.match(/^[0-9a-fA-F]{24}$/)) {
//       return helpers.message('"{{#label}}" must be a valid mongo id');
//     }
//     return value;
//   };

const videoIdSchema = Joi.object().keys({
    id: Joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)),
})

const validateId = (request,response,next)=>{
    const result = videoIdSchema.validate(request.params);

    if(result.error){
        console.log("caught in middleware")
        return response.status(404).json({message: "invalid user Id"})
    }else {
        return next();
    }
}

module.exports = {
    validateId
}