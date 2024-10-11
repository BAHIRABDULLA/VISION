import React,{useState} from 'react'
import { TextField, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
const EditCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [duration, setDuration] = useState('');
    const [overview, setOverview] = useState('');
    const [curriculum, setCurriculum] = useState('');
    const [price, setPrice] = useState('');
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log({
        courseName,
        duration,
        overview,
        curriculum,
        price,
      });
    };
  
    return (
      <Container maxWidth="sm">
          
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Course
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Curriculum"
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Course
          </Button>
          <Link  className='ml-3' to='/admin/courses'>
            Back
          </Link>
        </form>
      </Container>
    );
}

export default EditCourse