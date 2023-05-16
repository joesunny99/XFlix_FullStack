import React, { useState } from "react";
import {
  Chip,
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  SvgIcon
} from "@mui/material";
import { ImportExport } from "@mui/icons-material";
import "./Genre.css";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Person from "@material-ui/icons/Person";

const Genre = (props) => {
  // useEffect(()=>{
  //     console.log(filters.filters.genre);
  // },[])

  const [clicked, setClicked] = useState(false);

  const handleGenre = (e) => {
    //console.log(e.target.innerHTML);
    props.handleParentGenre(e.target.textContent);
    //console.log(e.target.classList);
    //console.log(e.target.classList);
  };
  const handleRating = (e) => {
    //console.log(e.target.innerHTML);
    props.handleParentRating(e.target.textContent);
  };

  return (
    <Box pb={1.5} backgroundColor="primary.light" 
      display={{xs:"flex", sm:"block"}}
      direction="row"
      justifyContent="center"
    >
      <Stack
        direction={{xs:"column", sm:"row"}}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 1 }}
        spacing={2}
      >
        {props.filters.genre.map((gen, index) => {
          if (gen == "All Genre") {
            return (
              <Chip
                label={gen}
                key={index}
                style={{
                  backgroundColor: props.searchParams.genres.includes("All")
                    ? "#FFFFFF"
                    : "#202020",
                  color: props.searchParams.genres.includes("All")
                    ? "#202020"
                    : "#FFFFFF"
                }}
                onClick={handleGenre}
              />
            );
          } else {
            return (
              <Chip
                label={gen}
                key={index}
                style={{
                  backgroundColor: props.searchParams.genres.includes(gen)
                    ? "#FFFFFF"
                    : "#202020",
                  color: props.searchParams.genres.includes(gen)
                    ? "#202020"
                    : "#FFFFFF",
                }}
                onClick={handleGenre}
              />
            );
          }
          // return <button className="pill">{gen}</button>
        })}
            <div className="sortPill">
            <Select
                sx={{ backgroundColor: "#FFFFFF", color:"#202020", width: 160, borderRadius: 10, padding: '0 !important', height:30 }}
                defaultValue="releaseDate"               
                displayEmpty
                IconComponent={()=>null} 
                onChange={(e)=>props.handleSort(e.target.value)}           
                renderValue={(value) => {
                    let item = Object.keys(props.filters.sort).find(key => props.filters.sort[key] === value);
                    return (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <SvgIcon color="primary">
                            <ImportExport />
                        </SvgIcon>
                        {item}
                    </Box>
                    );
                }}
            >
            {Object.keys(props.filters.sort).map(function(key) {
                  return <MenuItem key={key} selected={key=="Release Date"? true:false} value={props.filters.sort[key]}>{key}</MenuItem>
              })
            }
          </Select>
        </div>
      </Stack>
      <Stack
        direction={{xs:"column", sm:"row"}}
        justifyContent={{xs:"flex-start", sm:"center"}}
        alignItems="center"
        sx={{ mb: 2 }}
        spacing={2}
      >
        {props.filters.age.map((age, index) => {
          if (age == "Any age group") {
            return (
              <Chip
                style={{
                  backgroundColor:
                    props.searchParams.age == "Anyone" ? "#FFFFFF" : "#202020",
                  color: props.searchParams.age == "Anyone" ? "#202020" : "#FFFFFF",
                }}
                label={age}
                key={index}
                onClick={handleRating}
              />
            );
          } else {
            return (
              <Chip
                style={{
                  backgroundColor:
                    props.searchParams.age == age ? "#FFFFFF" : "#202020",
                  color: props.searchParams.age == age ? "#202020" : "#FFFFFF",
                }}
                label={age}
                key={index}
                onClick={handleRating}
              />
            );
          }
        })}
      </Stack>
    </Box>
  );
};

export default Genre;
