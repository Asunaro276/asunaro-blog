import { createTheme } from "@mui/material";

export const titleFontTheme = createTheme({
  typography: {
    fontFamily: [
      "Montserrat Subrayada",
      'Roboto',
      "sans-serif"
    ].join(","),
  },
})

const theme = createTheme({
palette: {
  primary: {
    main: '#78909c',
  },
},
});
