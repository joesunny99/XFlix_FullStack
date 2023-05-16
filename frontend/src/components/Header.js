import React from "react";
import {Button, Stack, InputAdornment, TextField, Typography} from "@mui/material";
import { Box} from "@mui/system";
import { Search, Upload } from "@mui/icons-material";
import "./Header.css";
import img1 from "../images/Xflix logo.png"

const Header=(props)=>{
    return (
        <Box backgroundColor="primary.light" className ={props.videoPage?"header-videopage":"header-standard"}>
            {props.videoPage?(
                <div className="image-box">
                    <img src ={img1} alt="XFlix logo" />
                </div>
            ):(
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box sx={{minWidth:70}}>
                    <div className="image-box">
                        <img src ={img1} alt="XFlix logo" />
                    </div>
                </Box>
                <TextField
                className="search-desktop"
                size="small"
                sx={{ m: 1, 
                     width: '65ch',
                     minWidth:110,
                     backgroundColor:'#121212', 
                     border: '2px solid #444D56', 
                     input: { color: '#606060' },
                     flexBasis: "4/10" 
                    }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end" >
                        <Search style={{ color: "#444D56" }} className="searchTool"/>
                    </InputAdornment>
                    ),
                }}
                placeholder="Search"
                name="search"
                onClick = {(e)=>props.handleSearch(e.currentTarget.children[0].children[0].value)}
                />
                <Button variant="contained" onClick={props.handleUpload} 
                  sx={{backgroundColor:'#4CA3FC', minWidth:80}} 
                  className="upload-button"
                  startIcon={<Upload />}>
                      <Typography variant="span" className="upload-text">Upload</Typography></Button>
            </Stack>
            )
        }
        </Box>
    )
}

export default Header;