import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

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
  palette: {
    primary: {
      main: blueGrey[300],
      dark: blueGrey[600],
      light: blueGrey[100],
      contrastText: "#fff",
    }
  },
  typography: {
    fontFamily: [
      'Meiryo',
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
