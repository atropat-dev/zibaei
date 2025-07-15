import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
}));

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter phone number, Step 2: Enter OTP

  const handlePhoneSubmit = async (e: React.FormEvent): Promise<void> => {
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
      setStep(2); // Move to the next step
    } catch (error) {
      console.error('Error during OTP submission:', error);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('OTP submitted');
    // Add logic to verify OTP here
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
            bgcolor: 'background.default',
            p: 3,
            width: '100%',
            height: '100%',
          }}
        >
          {step === 1 && (
            <>
              <Typography variant="h4" gutterBottom>
                ورود به حساب کاربری
              </Typography>
              <Box component="form" onSubmit={handlePhoneSubmit} sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
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
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h4" gutterBottom>
                کد تایید را وارد کنید
              </Typography>
              <Box component="form" onSubmit={handleOtpSubmit} sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
                <TextField
                  fullWidth
                  label="کد تایید"
                  variant="outlined"
                  sx={{ mb: 2, textAlign: 'center' }}
                  inputProps={{ maxLength: 5, style: { textAlign: 'center' } }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  تایید
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Login;
