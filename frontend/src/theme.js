import { createTheme } from "@mui/material/styles";

const themeDark = createTheme({
    palette: {
      primary: {
          main: "#212121",
          light: "#202020",
          dark: "#000000",
          contrastText:"#FFFFFF"
      },
      common:{
        white:'rgba(250, 249, 246, 0.5)',
      },
      secondary:{       
        main: "#FF0000"
      }, 
      // palette:{
      //   type: 'dark'
      // } ,
      background: {
        default: "#181818",
        paper: "#181818",
        // paper: "#202020"
      },
      text: {
        primary: "#FFFFFF"
      }
    },
    typography: {
      h5:{
        fontSize: '1.1rem',
        fontWeight: 700,
      },
      h6:{
        fontSize: '1rem',
        fontWeight: 500
      },
      subtitle2:{
        fontSize: '0.8rem',
        fontWeight: 10
      }
    },
  });

  themeDark.typography.h5 = {
    fontSize: '1.1rem',
    fontWeight: 700,
    [themeDark.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    // [themeDark.breakpoints.down('sm')]: {
    //   fontSize: '0.8rem',
    //   fontWeight: 400,
    // },
  };

  themeDark.typography.h6 = {
    fontSize: '1rem',
    [themeDark.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    // [themeDark.breakpoints.down('sm')]: {
    //   fontSize: '0.7rem',
    //   fontWeight: 400,
    // },
  };

  themeDark.typography.subtitle2 = {
        fontSize: '0.8rem',
        fontWeight: 10,
    [themeDark.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      fontWeight: 10
    },
    // [themeDark.breakpoints.down('sm')]: {
    //   fontSize: '0.6rem',
    //   fontWeight: 10
    // },
  };

  export default themeDark;