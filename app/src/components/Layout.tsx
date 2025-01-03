import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Box from '@mui/material/Box';


export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Renders current route */}
        <Outlet />
      </Box>
      <Navbar />
    </Box>
  );
}
