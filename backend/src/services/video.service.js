const Video = require("../models/videos.model");

const getAllVideos = async (queryObj) => {
  // console.log(queryObj, "query");
  try {
    let videos;
    if (Object.keys(queryObj).length === 1 && queryObj.sortBy) {   
        videos = await Video.find({})
        videos.sort((a,b)=>b[queryObj.sortBy]-a[queryObj.sortBy]);
      return {
        videos: videos,
      };
    } else if (Object.keys(queryObj).length > 0) {
      let query = {
        $and: [],
      };

      if (queryObj.title) {
        query["$and"].push({
          title: { $regex: new RegExp(queryObj["title"], "i") },
        });
      }
      if (queryObj.genres && !queryObj.genres.includes("All")) {
        let arr = queryObj.genres.split(",");
        let genArr = arr.map((gen) => {
          return {
            genre: gen,
          };
        });
        query["$and"].push({ $or: genArr });
      }
      if (queryObj.contentRating && queryObj.contentRating!=="Anyone") {
        let rating = queryObj.contentRating.slice(0, -1) + "";
        // query["$and"].push({ $expr:{ $gte:[{$toDouble: "$contentRating"},queryObj["contentRating"]]}})
        // query["$and"].push({$where: `parseInt(this.contentRating)>=${rating}`})
        // query["$and"].push({
        //   $or: [
        //     { contentRating: "Anyone" },
        //     { $where: `parseInt(this.contentRating)>=${rating}` },
        //   ],
        // });

        //joe
        query["$and"].push({
          $or: [
            // { contentRating: "Anyone" },
            { $where: `parseInt(this.contentRating)>=${rating}` },
          ],
        });
      }

        // console.log(query, "the final query");

        if(query['$and'].length==0){
          videos = await Video.find({});
        }else {
          videos = await Video.find(query);
        }     

        if(queryObj.sortBy){
          videos.sort((a,b)=>b[queryObj.sortBy]-a[queryObj.sortBy]);
        }
      return {
        videos: videos,
      };
    } else {
      let videos = await Video.find({});
      return {
        videos: videos,
      };
      
    }
  } catch (err) {
    throw err;
  }
};

const getVideoById = async (id) => {
  try {
    let video = await Video.findOne({ _id: id });
    return video;
    // console.log("inside service")
    // throw 5;
  } catch (err) {
    throw err;
  }
};

const addVideo = async (videoObj) => {
  try {
    const {
      videoLink,
      title,
      genre,
      contentRating,
      releaseDate,
      previewImage,
    } = videoObj;
    let video = await Video.create({
      videoLink,
      title,
      genre,
      contentRating,
      releaseDate,
      previewImage,
    });
    return video;
  } catch (err) {
    throw err;
  }
};

const handleVoteChange = async (id, action) => {
  try {
    let video = await Video.findOne({ _id: id });
    // console.log(typeof video.viewCount, "before adding")
    if (video) {
      if (action === "upVote") {
        video.votes.upVotes++;
        let result = await video.save();
        // console.log(result, "after saving");
        return true;
      } else {
        video.votes.downVotes++;
        let result = await video.save();
        // console.log(result,"after saving")
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

const handleViewCount = async (id) => {
  try {
    const video = await Video.findOne({ _id: id });
    if (video) {
      // video.viewCount++;
      // let result = await video.save();
      // console.log(result);
      let newCount = ++video.viewCount;
      let result = await Video.findOneAndUpdate(
        { _id: id },
        { $set: { viewCount: newCount } },
        { new: true }
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  addVideo,
  handleVoteChange,
  handleViewCount,
};
