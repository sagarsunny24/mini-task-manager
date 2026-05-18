import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material'

import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

export default function Root(){
  const [darkMode, setDarkmode] = useState(false)
  const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#e0e0e0',
    },
    secondary: {
      main: '#1a1a1a',
      light: '#2c2c2c',
    },
    background: {
      default: '#0d0d0d',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
    divider: '#2e2e2e',
  },
});

  const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0d0d0d',
      light: '#2c2c2c',
    },
    secondary: {
      main: '#e0e0e0',
      light: '#f5f5f5',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d0d0d',
      secondary: '#5a5a5a',
    },
    divider: '#e0e0e0',
  },
});


  return ( <ThemeProvider theme={darkMode? darkTheme: theme}>
    <CssBaseline />
    <App toggleDarkmode={()=>setDarkmode(!darkMode)} darkMode ={darkMode} />
    </ThemeProvider>);
}
