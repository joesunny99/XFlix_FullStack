const router = require("express").Router();

const {validateId} = require("../middlewares/video.middleware");
const {validateVideo} = require("../middlewares/postVideo.middleware")
const {getAllVideos, getVideoById, postVideo,patchVotes, patchViewCount} = require("../controllers/video.controller.js")

router.patch("/:id/votes",patchVotes);
router.patch("/:id/views",patchViewCount);
router.get("/:id",validateId,getVideoById);
router.get("/", getAllVideos);
router.post("/",validateVideo, postVideo);



module.exports = router;