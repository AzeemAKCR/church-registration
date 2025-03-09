'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Container,
  TablePagination,
  IconButton,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  gradeLevel: string;
  address: string;
  description?: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/registrations');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch registrations');
        }
        
        setRegistrations(data.registrations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
console.log(registrations);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{
          color: '#1a237e',
          textAlign: 'center',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          mb: 4,
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
        VBS Registrations
      </Typography>
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: 2,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="registrations table">
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: '#1a237e',
              '& th': { 
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem'
              }
            }}>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((registration, index) => (
                <TableRow
                  key={registration._id}
                  sx={{ 
                    '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                    '&:hover': { backgroundColor: '#e8eaf6' },
                    transition: 'background-color 0.2s ease',
                    '& td': { 
                      padding: '16px',
                      fontSize: '0.9rem'
                    }
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {registration.firstName}
                  </TableCell>
                  <TableCell>{registration.lastName}</TableCell>
                  <TableCell>{registration.age} years</TableCell>
                  <TableCell sx={{ 
                    color: registration.gender === 'male' ? '#1565c0' : '#ad1457',
                    fontWeight: 500
                  }}>
                    {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}
                  </TableCell>
                  <TableCell>Class {registration.gradeLevel}</TableCell>
                  <TableCell sx={{ 
                    maxWidth: '250px',
                    '& .address-content': {
                      whiteSpace: 'pre-line',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.5'
                    }
                  }}>
                    <div className="address-content">
                      {registration.address}
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {registration.description}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {new Date(registration.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={registrations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid rgba(224, 224, 224, 1)',
            '& .MuiTablePagination-select': {
              marginRight: 1
            }
          }}
        />
      </TableContainer>
    </Container>
  );
}
