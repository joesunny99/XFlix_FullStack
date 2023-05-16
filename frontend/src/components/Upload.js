import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, MenuItem, Box,Typography  } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles} from '@mui/styles';
import "./Upload.css"


const useStyles = makeStyles(() => ({
  select: {
    "&:before": {
      borderColor: "white"
    },
    "&:after": {
      borderColor: "white"
    }
  },
  icon: {
    fill: "white"
  },
  floatingLabelFocusStyle: {
    color: "white"
  },
  button:{
    color:"white",
    backgroundColor:"red"
  }
}));

const testClass = {
  "&&": {
    marginBottom: "0.5rem",
    // height: "4rem"
  },
  "& .MuiInputLabel-root": {
    color: "rgba(250, 249, 246, 0.8) !important",
    fontSize: {xs:"0.85rem", sm:"1rem"}
  },//styles the label
  // "& .MuiInputBase-input":{padding: "10px"},
  "& .MuiOutlinedInput-root": {
    color: "rgba(250, 249, 246, 0.8)",
    "& > fieldset": { borderColor:'rgba(250, 249, 246, 0.5)' },
    "&:hover > fieldset ": { borderColor: 'rgba(250, 249, 246, 0.8)' },
    "&.Mui-focused > fieldset ": { borderColor: 'rgba(250, 249, 246, 0.8)' },
  },
  
  '& .MuiFormHelperText-root': {
    color: "rgba(250, 249, 246, 0.8)",
    //display: {xs:"none", sm:"block"}
    fontSize: {xs:"0.6rem", sm:"0.75rem"}
  },
  input: { color: 'rgba(250, 249, 246, 0.8)' }
  // "& .MuiOutlinedInput" :{ color: "white !important" },
  // "& .MuiSelect-select" :{ color: "white !important" },
}

export default function Upload({ filters, open, handleClose }) {

  const classes = useStyles();
  const [filterOptions, setFilterOptions] = useState({});
  let [formData, setFormData] = useState(
    {
      "videoLink": "",
      "title": "",
      "genre": "",
      "contentRating": "",
      "releaseDate": "",
      "previewImage":""
    }
    );

    const handleInput =(e) =>{
      setFormData({...formData, [e.target.name]:e.target.value})
      //console.log(formData);
    }


  const setNewFilters = (filters) => {
    let newGenreFilter = filters.genre.filter((x) => x != "All Genre");
    let newAgeFilter = filters.age.filter((x) => x != "Any age group");
    let newObj = { genre: [...newGenreFilter], age: [...newAgeFilter] };
    setFilterOptions({...newObj});
  };

  const handleSubmit =()=>{
    let obj1={...formData};
    let date1= new Date(obj1.releaseDate)
    let c =date1.toLocaleString('en-IN', {year: 'numeric', month: 'short', day: 'numeric' });
    obj1.releaseDate = c;

    let paramString = obj1.videoLink.split('=')[1];
    obj1.videoLink =`youtube.com/embed/${paramString}`;
    handleClose(obj1);

  }

  useEffect(() => {
    //console.log(filters.genre);
    setNewFilters(filters);
  }, []);

  return (
    <Box>
      {Object.keys(filterOptions).length && (
        <Box>
          <Dialog 
          PaperProps={{
            style: { color: "white", backgroundColor: '#202020', width:'60vh' }   
          }}
          open={open} 
          onClose={handleClose}
          >
            <DialogTitle>
              <Typography sx={{fontSize:"1.5rem"}}>
              Upload Video
              </Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="videoLink"
                name="videoLink"
                label="Video Link"
                helperText="This link will be used to derive the video"
                type="url"
                fullWidth
                size="small"
                variant="outlined"
                value = {formData.videoLink}
                onChange ={e=>handleInput(e)}
                sx={testClass}
              />
              <TextField
                margin="dense"
                id="previewImage"
                name="previewImage"
                label="Thumbnail Image Link"
                helperText="This image will be used to preview the thumbnail image"
                type="url"
                size="small"
                fullWidth
                variant="outlined"
                value = {formData.previewImage}
                onChange ={e=>handleInput(e)}
                sx ={testClass}
              />
              <TextField
                margin="dense"
                id="title"
                name="title"
                label="Title"
                helperText="This will be the representative text for the video"
                type="text"
                fullWidth
                size="small"
                variant="outlined"
                value = {formData.title}
                onChange ={e=>handleInput(e)}
                sx ={testClass}
              />
              <TextField
                id="genre"
                name="genre"
                label="Genre"
                fullWidth
                size="small"
                select
                value = {formData.genre}
                onChange ={e=>handleInput(e)}
                helperText="Genre will help in categorizing your videos"
                sx ={testClass}
                SelectProps={{
                  classes: {
                    icon:  classes.icon
                  }
                }}
              >
                {filterOptions.genre.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="contentRating"
                name="contentRating"
                label="Suitable age group for the clip"
                fullWidth
                size="small"
                select
                value = {formData.contentRating}
                onChange ={e=>handleInput(e)}
                helperText="This will be used to filter videos on age group suitability"
                sx ={testClass}
                SelectProps={{
                  classes: {
                    icon: classes.icon
                  }
                }}
              >
                {filterOptions.age.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="releaseDate"
                name="releaseDate"
                label="Release date"
                helperText="This will be used to sort videos"
                type="date"
                fullWidth
                size="small"
                variant="outlined"
                value = {formData.releaseDate}
                onChange ={e=>handleInput(e)}
                InputLabelProps={{
                  shrink: true
                }}
                sx ={testClass}
                // SelectProps={{
                //   classes: {
                //     icon:  classes.icon
                //   }
                // }}
              />
            </DialogContent>
            <DialogActions m={0}>
              <Button className={classes.button} onClick={handleSubmit}>Upload Video</Button >
              
              <Button sx={{color:"rgba(250, 249, 246, 0.8)"}} onClick={(e)=>handleClose({})}>Cancel</Button >
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}
