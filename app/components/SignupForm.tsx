import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: 3,
    gender: 'male',
    gradeLevel: '',
    address: '',
    description: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setSnackbar({
        open: true,
        message: 'Registration successful!',
        severity: 'success'
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        age: 3,
        gender: 'male',
        gradeLevel: '',
        address: '',
        description: ''
      });

    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to register. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4,
          borderRadius: 2,
          background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#1a237e', 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              backgroundColor: '#1a237e',
              borderRadius: '2px'
            }
          }}
        >
          Vacation Bible School Signup
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1a237e',
                },
              },
            },
            '& .MuiRadio-root': {
              color: '#1a237e',
            },
            '& .MuiFormControl-root': {
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1a237e',
                },
              },
            }
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Age</InputLabel>
            <Select
              name="age"
              value={formData.age}
              onChange={handleChange}
              label="Age"
              required
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
            >
              {Array.from({ length: 16 }, (_, i) => i + 3).map((age) => (
                <MenuItem key={age} value={age}>
                  {age} years
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <Typography variant="subtitle1" gutterBottom>Gender</Typography>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              label="Class"
              required
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
            >
              <MenuItem value="1">Class 1</MenuItem>
              <MenuItem value="2">Class 2</MenuItem>
              <MenuItem value="3">Class 3</MenuItem>
              <MenuItem value="4">Class 4</MenuItem>
              <MenuItem value="5">Class 5</MenuItem>
              <MenuItem value="6">Class 6</MenuItem>
              <MenuItem value="7">Class 7</MenuItem>
              <MenuItem value="8">Class 8</MenuItem>
              <MenuItem value="9">Class 9</MenuItem>
              <MenuItem value="10">Class 10</MenuItem>
              <MenuItem value="11">Class 11</MenuItem>
              <MenuItem value="12">Class 12</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Home Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            multiline
            rows={3}
            placeholder="Area, Block, Street, building number"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& textarea': {
                  lineHeight: '1.5'
                }
              }
            }}
          />

          <TextField
            fullWidth
            label="Comments"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              mt: 2,
              background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
              boxShadow: '0 3px 5px 2px rgba(26, 35, 126, .3)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 10px 4px rgba(26, 35, 126, .3)',
              }
            }}
          >
            Submit Registration
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
