import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function NavBar({setAddtask, toggleDarkmode , darkMode}) {
  function handleClick(){
    setAddtask(true)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{bgcolor: 'secondary.light', borderTop: '1px solid #ccc',borderBottom: '1px solid #ccc', px:'10px'}} elevation={0}>
        <Toolbar>
          
          <Typography variant="h5" component="div" sx={{px:2,py:0.5, borderRadius: '8px',color: 'primary.main', fontFamily: 'Bricolage Grotesque'}}>
            Task Manager
          </Typography>
          <Box sx={{flexGrow: 1}}>
            {/* put search bar here when its logged in */}
          </Box>
          <Button onClick={toggleDarkmode}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon/> }
          </Button>
          <Button variant='contained' onClick={handleClick}>+ Add Task</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
