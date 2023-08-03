import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {createRef, useState} from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const defaultTheme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans serif',
    ].join(','),
  },});


export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const {setUser, setToken} = useStateContext() 
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setValidationErrors({});

    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors){
            setValidationErrors(response.data.errors)
          }
          else{
            setValidationErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
             <img src="https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/image_2023-07-26_222231573.png" 
             />
            </Box>
            <Box sx={{textAlign: 'left', fontSize: '20px', fontWeight: '700', fontFamily: 'Open Sans', mb: 2, mt: 2}}> 
              Login to your Account
            </Box>
            <Box component="form" noValidate onSubmit={onSubmit}>
            <label>Email</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder='Enter your email address'
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailRef}
                type='email'
                error={!!validationErrors.email}
                helperText={validationErrors.email || ''}
              />
              <label>Password</label>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Enter your Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
                error={!!validationErrors.password}
                helperText={validationErrors.password || ''}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4285f4', textTransform: 'capitalize', borderRadius: '8px' }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" underline='none' variant="body2" sx={{display: 'flex', justifyContent: 'right'}}>  
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Box sx={{textAlign: 'left', fontSize: 'p.fontSize', fontWeight: '700', fontFamily: 'Open Sans', mb: 2, mt: 2}}> 
              Are you an applicant? 
            </Box>
            <Button
                id='btn-apply'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, backgroundColor: '#0D9488', textTransform: 'capitalize', borderRadius: '8px'}}
                href='/register'
              >
                Apply Here
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.sm-foundation.org/wp-content/uploads/2022/01/SMFI-1-10.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

