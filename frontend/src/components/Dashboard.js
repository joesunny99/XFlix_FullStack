import Video from "./Video";
import { Grid } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

const Dashboard = ({videoData, handleVideoChange}) => {

  const location = useLocation();
  const params = useParams();

  return (
    <Grid container spacing={2}>
      {videoData.map((vid) => {
        return (
          <Grid item xs={6} sm={4} md={3} key={vid["_id"]}>
            {location.pathname === "/" ?
            <Link to={`video/${vid._id}`} style={{ textDecoration: "none" }}>
              <Video video={vid} />
            </Link> :
            <Link to={`/video/${vid._id}`} style={{ textDecoration: "none" }} onClick={()=>handleVideoChange(vid._id)}>
              <Video video={vid} />
            </Link>
            }
            {/* <Link to={`video/${vid._id}`} style={{ textDecoration: "none" }}>
            
              <Video video={vid} />
            
            </Link> */} 
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Dashboard;