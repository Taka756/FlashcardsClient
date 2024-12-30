import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(255, 255, 255)'
        },
        secondary: {
            main: 'rgb(60, 60, 60)',
        },

        background: {
            default: "rgb(245, 245, 245)"
        },
        success: {
            main: "#04F06A"
        },
        danger: {
            main: "rgb(255, 78, 78)"
        },
        // text: {
        //     main: "rgb(53, 57, 53)", // You may adjust this color if needed
        //     primary: "#212529", // Adjust primary text color for better contrast
        //     secondary: "#495057", // Adjust secondary text color for better contrast
        // },
        text: {
            main: "rgb(53, 57, 53)"
        },
        hover: {
            main: "rgb(240, 234, 214)"
        }
    },
    // components: {
    //     MuiButton: {
    //       styleOverrides: {
    //         root: {
    //           color: "#212529", // Ensure the button text is dark enough for visibility
    //           "&:hover": {
    //             color: "#ffffff", // Optionally change text color on hover to white for contrast
    //           },
    //         },
    //       },
    //     },
    //   },
})

export default theme