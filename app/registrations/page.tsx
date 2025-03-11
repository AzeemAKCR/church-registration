"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  styled,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  gradeLevel: string;
  address: string;
  primaryNumber: string;
  secondaryNumber: string;
  description?: string;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("/api/registrations");
        const data = await response.json();
        setRegistrations(data.registrations);
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#23217d",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, color: "#23217d" }}
      >
        {registrations.length > 0 ? "Registrations" : "No Registrations"}
      </Typography>

      {registrations.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Class</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Primary Number</StyledTableCell>
                <StyledTableCell>Seconday Number</StyledTableCell>
                <StyledTableCell>Comments</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registrations?.map((registration) => (
                <StyledTableRow key={registration._id}>
                  <StyledTableCell>
                    {registration.firstName} {registration.lastName}
                  </StyledTableCell>
                  <StyledTableCell>{registration.age}</StyledTableCell>
                  <StyledTableCell>{registration.gender}</StyledTableCell>
                  <StyledTableCell>{registration.gradeLevel}</StyledTableCell>
                  <StyledTableCell>{registration.address}</StyledTableCell>
                  <StyledTableCell>
                    {registration.primaryNumber}
                  </StyledTableCell>
                  <StyledTableCell>
                    {registration.secondaryNumber}
                  </StyledTableCell>
                  <StyledTableCell>
                    {registration.description || "-"}
                  </StyledTableCell>
                  <TableCell>
                    {new Date(registration.createdAt).toLocaleDateString()}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
