import Header from "./Header"
import Genre from "./Genre"
import Dashboard from "./Dashboard";
import Upload from "./Upload"
import { Box} from "@mui/system";
import {useState, useEffect} from "react";
import axios from "axios";
import { config } from "../App";


const Products = () =>{
    const filters = {
        genre: ["All Genre", "Education", "Sports", "Comedy", "Movies", "Lifestyle"],
        age: ["Any age group", "7+", "12+", "16+", "18+"],
        sort: {"View Count":"viewCount", 
                "Release Date":"releaseDate"
              }
    };
    const [allVideoData, setAllVideoData] = useState([]);
    const [searchParams, setSearchParams] = useState({
        search : "",
        genres: ["All"],
        age: "Anyone",
        sort: "releaseDate"
    });
    const [open, setOpen] = useState(false);


    const findURL =(text,genres,Rating, sortVal)=>{
        // console.log(text,genres,Rating, sortVal, "inside URL")
          let str = `${config.endpoint}/v1/videos?`;
          
          if(text.length>0){
             str +="title="
             str +=text;
             }
          
          if(genres.length>0){
            if(text.length>0) str +="&genres="
            else str+="genres="
            
             genres.forEach((gen,index)=>{
               if(index==0) str += gen;
               else {
                 str +=`,${gen}`
               }
             })
             
             }
          
          if(Rating){
             if(text.length>0 || genres.length>0) str +="&contentRating="
             else str +="contentRating="
             str += encodeURIComponent(Rating);
          }
          if(sortVal){
            str+=`&sortBy=${sortVal}`
          }else{
            str+=`&sortBy=${searchParams.sort}`
          }
          return str;
    }

    const performAPICall =async(text,genres,Rating, sortVal)=>{
        // console.log(text,genres,Rating,sortVal, "inside API call");
        try{ 
            if(!text && genres.length==0 && !Rating ){
                // console.log(sortVal, "inside perform API call")
                let response = await axios.get(`${config.endpoint}/v1/videos?sortBy=${sortVal}`);
                
                // console.log(response.data);
                let data=response.data.videos;       
                // console.log(data);
                // let data=response.data; 
                setAllVideoData(data);
                setSearchParams({...searchParams, sort: sortVal });
            }
            else{
                let url = findURL(text,genres,Rating, sortVal);
                // console.log(url);
                let response = await axios.get(url);
                let data=response.data.videos;   
                // let data=response.data;    
                //console.log(data);
                setAllVideoData(data);
            }
        }catch(e){
            alert("error",e);
        }
    }

    useEffect(()=>{
        performAPICall("",[],"","releaseDate");
    },[]);

    const chooseGenre =async (text)=>{
        // console.log(searchParams.genres);
        // console.log(text);
        let arr;
        if(searchParams.genres.includes(text)){
            arr = searchParams.genres.filter(genre=>{
                return genre!=text;
            })
        if(arr.length==0)  arr.push("All");   
        }else{
            if(text==="All Genre"){
                if(searchParams.genres.includes("All")){
                    arr = searchParams.genres.filter(genre=>{
                        return genre!="All";
                    })
                }else{
                    arr = [...searchParams.genres];
                    arr.push("All");
                }               
            }else{              
                arr = [...searchParams.genres];
                if(searchParams.genres.includes("All")){
                    arr = searchParams.genres.filter(genre=>{
                        return genre!="All";
                    })
                }
                arr.push(text); 
            }
        }
            setSearchParams(lastParams=>{       
             return {...lastParams, genres:arr}
            })       
        
        //console.log(searchParams);
        console.log(arr, "genre arr");
        await performAPICall(searchParams.search, arr, searchParams.age, searchParams.sort);
    }

    const chooseRating =async(text)=>{
        try{

        if(searchParams.age==text){
            // setSearchParams({...searchParams, age: ""})
            setSearchParams({...searchParams, age: "Anyone"})
            console.log(searchParams);
            // await performAPICall(searchParams.search, searchParams.genres, "");
            await performAPICall(searchParams.search, searchParams.genres, "Anyone");
        }else{
            if(text=="Any age group"){
                if(searchParams.age=="Anyone"){
                    setSearchParams({...searchParams, age: ""})
                    console.log(searchParams);
                    await performAPICall(searchParams.search, searchParams.genres, "");
                }else{
                    setSearchParams({...searchParams, age: "Anyone"})
                    console.log(searchParams);
                    await performAPICall(searchParams.search, searchParams.genres, "Anyone");                   
                }
            }else{
                setSearchParams({...searchParams, age: text})
                //console.log(searchParams);
                
                await performAPICall(searchParams.search, searchParams.genres, text, searchParams.sort)
            }
        }            
        } 
        catch(e){
            console.log("error",2)
        }     
    }

    const handleSort = async(val)=>{
        console.log(val);
        // await performAPICall("",[],"",val);
        setSearchParams({...searchParams, sort: val });
        await performAPICall(searchParams.search, searchParams.genres, searchParams.age,val);
        
    }


    const performSearch = async (text) => {
        //console.log(text);
        await performAPICall(text,searchParams.genres,searchParams.age);
         setSearchParams({...searchParams, search: text});
      };

      const uploadAPICall =async(obj1) =>{
          try{
            const response = await axios.post(`${config.endpoint}/v1/videos`, obj1);
            //console.log(response);
            if(response.status==201){
                setOpen(false);
                window.location.reload(false);
            }
            
          }catch(e){
              alert("Incorrect data");
          }
      }

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (obj1) => {
          //console.log(obj1, "inside the main handleclose");
          if(!Object.keys(obj1).length)
            setOpen(false);
          else
           uploadAPICall(obj1);
      };


    return(
        <Box>
            <Header handleSearch={performSearch} searchKey={searchParams.search} handleUpload={handleClickOpen}/>
            <Genre filters={filters} handleSort={handleSort} searchParams={searchParams} handleParentGenre={chooseGenre} handleParentRating={chooseRating}/>
            <Box display="flex" justifyContent="center">
                <Box mt={3} sx={{ width: 4 / 5 }}>
                    
                        <Dashboard videoData={allVideoData}/>
                   
                </Box>
            </Box>
            <Upload filters={filters} open={open} handleClose={handleClose}  />
        </Box>
    )
}

export default Products;