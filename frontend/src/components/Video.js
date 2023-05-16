import React from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  import "./Video.css";

  export const monthD=(video)=> {

    let dateTo = new Date();
    let dateFrom=new Date(video.releaseDate);
    let temp= dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))

    if(temp<12){
        return(`${temp} months ago`)
    }else{
        if(temp<24){
            return(`${Math.floor(temp/12)} year ago`)   
        }
        return(`${Math.floor(temp/12)} years ago`)
    }
   }

const Video =({video})=>{
    // useEffect(()=>{
    //     console.log(video);
    // },[])

    const monthDiff=(video)=> {

        let dateTo = new Date();
        let dateFrom=new Date(video.releaseDate);
        let temp= dateTo.getMonth() - dateFrom.getMonth() + 
          (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))

        if(temp<12){
            return(`${temp} months ago`)
        }else{
            if(temp<24){
                return(`${Math.floor(temp/12)} year ago`)   
            }
            return(`${Math.floor(temp/12)} years ago`)
        }
       }

    //    console.log(monthDiff(video));
    //sasasa
    return (
        <Card className="card" style={{height:"100%"}}>
            <Box height="200">
                <CardMedia component="img"  image={video.previewImage} />
            </Box>
            <CardContent >
                {/* <Box pt={0} pb={0} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}> */}
                <Typography align="left" variant="h6">{video.title}</Typography>
                <Typography align="left" variant="subtitle2" color="common.white">{monthDiff(video)}</Typography>
              
            </CardContent>
      </Card>
    )       
} 

export default Video;