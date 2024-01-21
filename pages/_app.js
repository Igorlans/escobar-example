import '../styles/globals.scss'
import {createTheme, ThemeProvider} from "@mui/material";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
        typography: {
          fontFamily: 'Montserrat, sans-serif',
        },
        palette: {
          secondary: {
            main: '#09810a',
          },
          primary: {
            main: '#323232'
          }
        },
      },
  );

  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
