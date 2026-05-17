import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material'
import {grey } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
      light: grey[700]
    },
    secondary: {
      main: grey['A200'],
      light: grey[100]
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
