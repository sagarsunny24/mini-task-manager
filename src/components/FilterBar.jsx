
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container } from '@mui/material';

export default function FilterBar({onFilter, filterType}) {
  

  const handleChange = (event, newType) => {
    onFilter(newType);
  };

  return (
    <Container sx={{mt: 2,display:'flex', justifyContent:'flex-end'}}>
    <ToggleButtonGroup
      color="inherit"
      size='small'
      value={filterType}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
    '& .MuiToggleButton-root': {
      minWidth: 32,
      height: 28,
      px: 1,
    }}}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="completed">Completed</ToggleButton>
      <ToggleButton value="pending">Pending</ToggleButton>
    </ToggleButtonGroup>
    </Container>
  );
}