import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { config } from "../App";
import { Box } from "@mui/system";
import { Grid, Chip, InputAdornment, Typography } from "@mui/material";
import { PreviewOutlined, ThumbDown, ThumbUp } from "@mui/icons-material";
import Header from "./Header";
import Video from "./Video";
import Dashboard from "./Dashboard";

import { monthD } from "./Video";
import "./VideoPage.css";

const VideoPage = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  // const [currentVideo, setCurrentVideo] = useState({contentRating: "12+",
  // genre: "Movies",
  // previewImage: "https://i.ytimg.com/vi/nx2-4l4s4Nw/mqdefault.jpg",
  // releaseDate: "18 Jan 2021",
  // title: "Consumed by the Apocalypse",
  // videoLink: "youtube.com/embed/nx2-4l4s4Nw",
  // viewCount: 0,
  // votes: {upVotes: 0, downVotes: 1},
  // _id: "60331f421f1d093ab5424489"});

  const [currentVideoId, setCurrentVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isNewVideo, setIsNewVideo] = useState(true);
  const params = useParams();
  const history = useHistory();

  const location = useLocation();

  const vid = {};

  const allVideosAPICall = async () => {
    try {
      let response = await axios.get(`${config.endpoint}/v1/videos`);
      let data = response.data.videos;
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const getOtherVideos = async (id) => {
    let allVids = await allVideosAPICall();
    let arr = allVids.filter((vid) => {
      return vid._id != id;
    });
    setAllVideos([...arr]);
  };

  const getVideoAPICall = async (id) => {
    try {
      let response = await axios.get(`${config.endpoint}/v1/videos/${id}`);
      let data = response.data;
      //console.log(data.videoLink, "video data");
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const updateViews = async (vid) => {
    if (Object.keys(vid).length != 0) {
      try {
        const res = await axios.patch(`${config.endpoint}/v1/videos/${vid._id}/views`);
        if(res.status==204){
        setCurrentVideo((prev) => ({
          ...prev,
          viewCount: parseInt(prev.viewCount) + 1,
        }));

        }
        return res.status;
      } catch (e) {
        console.log("error");
      }
    }
  };

  const getCurrentVideo = async (id) => {
    let obj1 = await getVideoAPICall(id);
    setCurrentVideo({ ...obj1 });
    return obj1;
  };

  const handleVote = async (e, value) => {
    console.log(currentVideoId);
    try {
      if (value == "up") {
        const res = await axios.patch(`${config.endpoint}/v1/videos/${currentVideoId}/votes`, {
            "vote": "upVote",
            "change": "increase"
        });
        console.log(res.status);
        if(res.status==204){
        setCurrentVideo((prev) => ({
          ...prev,
          votes: {
            ...prev.votes,
            upVotes: prev.votes.upVotes + 1,
          },
        }));
        }
      } else {
        const res = await axios.patch(`${config.endpoint}/v1/videos/${currentVideoId}/votes`, {
            "vote": "upVote",
            "change": "increase"
        });
        console.log(res.status);
        if(res.status==204){
        setCurrentVideo((prev) => ({
          ...prev,
          votes: {
            ...prev.votes,
            downVotes: prev.votes.downVotes + 1,
          },
        }));
        }
      }
    } catch (e) {
      console.log("error");
    }
  };

  const handleVideoChange = async(abc) =>{

    setCurrentVideoId((curr)=>{
      return params.id;
    });
      let currentVideo = await getCurrentVideo(abc);
      let views = await updateViews(currentVideo);
      let otherVideos = getOtherVideos(abc);

  }

  useEffect(() => {
    setCurrentVideoId(params.id);
    (async () => {
      let currentVideo = await getCurrentVideo(params.id);
      let views = await updateViews(currentVideo);
      let otherVideos = getOtherVideos(params.id);
      if(Object.keys(currentVideo)!==0){
          setIsLoading(false);
      }
    })();
    
  }, []);



  return (
    <Box>
      <Header videoPage />
      <Box  display="flex" justifyContent="center">
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <Box  mt={3} sx={{ width: 4 / 5 }}>
            <div className="container">
              <iframe
                src={`https://www.${currentVideo.videoLink}`}
                className="videodisplay"
                frameBorder="0"
                title={currentVideo.title}
              />
            </div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
            >
              <Box>
                <Box><Typography align="left" variant="h5">{currentVideo.title}</Typography></Box>
                <Box display="flex" justifyContent="flex-start">
                  <Typography variant = "subtitle2" color="common.white">+{currentVideo.viewCount}</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    m={1}
                  >
                    <span className="dot"></span>
                  </Box>
                  <Typography variant = "subtitle2" color="common.white">{monthD(currentVideo)}</Typography>
                </Box>
              </Box>
              <Box display="flex" width={130} justifyContent="space-around">
                <Chip
                  label={`${currentVideo["votes"]["upVotes"]}`}
                  icon={<ThumbUp />}
                  onClick={(e) => handleVote(e, "up")}
                />
                <Chip
                  label={currentVideo["votes"]["downVotes"]}
                  icon={<ThumbDown />}
                  onClick={(e) => handleVote(e, "down")}
                />
              </Box>
            </Box>
            <hr></hr>
            <Box>
              <Dashboard videoData={allVideos} handleVideoChange={handleVideoChange}/>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoPage;
