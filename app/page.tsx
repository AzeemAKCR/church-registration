'use client';
import SignupForm from './components/SignupForm';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <SignupForm />
    </Container>
  );
}
