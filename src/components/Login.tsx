import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Vazirmatn, Arial, sans-serif',
  },
});

const cacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [rtlPlugin],
});

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    console.log('Phone number submitted:', phoneNumber);

    try {
      console.log('Sending OTP request to server...');
      const response = await fetch('http://localhost:3001/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: phoneNumber }),
      });

      if (!response.ok) {
        console.error('Failed to send OTP. Status:', response.status);
        return;
      }

      const data = await response.json();
      console.log('OTP response received:', data);
    } catch (error) {
      console.error('Error during OTP submission:', error);
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            ورود به حساب کاربری
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
            <TextField
              fullWidth
              label="شماره تماس"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ mb: 2, textAlign: 'right' }}
              inputProps={{ style: { textAlign: 'right' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              ارسال کد تایید
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Login;
