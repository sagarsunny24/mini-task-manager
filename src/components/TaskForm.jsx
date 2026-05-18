import { Avatar, Box, Button, Container, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function TaskForm({onSubmit, initialValues = null, onCancel}) {

  const isEditing = Boolean(initialValues)
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [priority, setPriority] = useState(initialValues?.priotity ?? 'medium');
  const [dueDate, setDuedate] = useState(initialValues?.dueDate ?? '');

  function handleSubmit(e){
    e.preventDefault()
    onSubmit({title, priority, dueDate})
  }
  return (
    <Container maxWidth='xs'>
      <Paper elevation={0} sx={{marginTop: 1,padding: 2}}>
        <Avatar sx={{
          mx: 'auto',
          bgcolor: isEditing ? 'warning.main':'primary.main',
          textAlign: 'center',
          mb: 1,
        }}>
          <AssignmentIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{textAlign:'center'}}>{isEditing ? 'Edit Task' : 'Add Task'}</Typography>
        <Box 
          component='form'
          onSubmit={handleSubmit}
          sx={{mt:1}}>
          <TextField 
            placeholder='Debug code'
            fullWidth
            required
            autoFocus
            sx={{mb:2}}
            value={title}
            onChange={(e) =>{setTitle(e.target.value)}}
            />
        <FormControl fullWidth>
          <InputLabel id="priority-id">Priority</InputLabel>
          <Select
            fullWidth
            label = 'Priority'
            labelId='priority-id'
            value={priority}
            onChange={(e)=> setPriority(e.target.value)}
            sx={{mb:2}}
            >
              <MenuItem value ='low'>Low</MenuItem>
              <MenuItem value ='medium'>Medium</MenuItem>                <MenuItem value='high'>High</MenuItem>
          </Select>
          </FormControl>
          {/* <Typography variant="body2" sx={{ mb: 0.5 }}>Due date</Typography> */}
          <TextField
          slotProps={{ inputLabel: { shrink: true } }}
          label='Due Date'
          type='date'
          fullWidth
          sx={{mb:2}}
          onChange={(e)=> setDuedate(e.target.value)}
          value={dueDate}
          />
          <Box sx={{display:'flex', gap: 1}}>
            <Button variant='outlined' fullWidth onClick={onCancel}>Cancel</Button>
          </Box>
          <Box sx={{display:'flex', gap:1}}>
            <Button type='submit' variant='contained' fullWidth sx={{mt:1}}>
              {isEditing? 'Save Changes': 'Add Task'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
