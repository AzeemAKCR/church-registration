'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import { HowToReg, List } from '@mui/icons-material';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a237e', marginBottom: 4 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ 
          justifyContent: 'center', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          py: { xs: 1.5, sm: 2 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: { xs: 1, sm: 0 }
          }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, sm: 3 }
              }}>
                <Box sx={{
                  width: { xs: '45px', sm: '65px' },
                  height: { xs: '45px', sm: '65px' },
                  position: 'relative',
                  borderRadius: '50%',
                  border: '2px solid white',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <Image
                    src="/assets/logo.jpg"
                    alt="Church Logo"
                    fill
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Typography 
                  variant="h5"
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    letterSpacing: { xs: '0.5px', sm: '1px' },
                    whiteSpace: 'nowrap',
                    fontSize: { xs: '0.85rem', sm: '1.4rem' }
                  }}
                >
                  PUTHU KIRUBAI DEVA SABHAI
                </Typography>
              </Box>
            </Link>
          </Box>
          {/* <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button 
                color="inherit" 
                startIcon={<HowToReg />}
                sx={{ 
                  backgroundColor: pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/registrations" passHref style={{ textDecoration: 'none' }}>
              <Button 
                color="inherit"
                startIcon={<List />}
                sx={{ 
                  backgroundColor: pathname === '/registrations' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                }}
              >
                View Registrations
              </Button>
            </Link>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
