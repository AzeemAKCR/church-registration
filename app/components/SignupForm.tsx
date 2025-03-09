'use client';
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  CircularProgress
} from '@mui/material';

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  gradeLevel: string;
  address: string;
  description: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  age: '3',
  gender: 'male',
  gradeLevel: '',
  address: '',
  description: ''
};

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Registration successful!'
        });
        setFormData(initialFormData);
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Registration failed. Please try again.'
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
          Vacation Bible School Signup
        </Typography>

        {submitStatus && (
          <Alert 
            severity={submitStatus.success ? "success" : "error"}
            sx={{ mb: 3 }}
          >
            {submitStatus.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Age</InputLabel>
                <Select
                  name="age"
                  value={formData.age}
                  label="Age"
                  onChange={handleChange}
                >
                  {Array.from({ length: 16 }, (_, i) => i + 3).map((age) => (
                    <MenuItem key={age} value={age.toString()}>{age} years</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Class</InputLabel>
                <Select
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  label="Class"
                  onChange={handleChange}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Home Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
