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

export const basicTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
