'use client';
import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  gradeLevel: string;
  address: string;
  description?: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/registrations');
        const data = await response.json();
        setRegistrations(data.registrations);
      } catch (err) {
        console.error('Failed to fetch registrations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Registrations
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((registration) => (
              <TableRow key={registration._id}>
                <TableCell>
                  {registration.firstName} {registration.lastName}
                </TableCell>
                <TableCell>{registration.age}</TableCell>
                <TableCell>{registration.gender}</TableCell>
                <TableCell>{registration.gradeLevel}</TableCell>
                <TableCell>{registration.address}</TableCell>
                <TableCell>{registration.description || '-'}</TableCell>
                <TableCell>
                  {new Date(registration.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
