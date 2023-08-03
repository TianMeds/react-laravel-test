import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
  
  
  export default function Register() {
  
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const {setUser, setToken} = useStateContext() 
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});  
  
    const onSubmit = (ev: React.FormEvent) => {  
      ev.preventDefault()
  
      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      };
      
      setValidationErrors({});

      axiosClient.post('/register', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          setValidationErrors(response.data.errors || {})
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
            flexDirection: 'column',
          }}
        >
         <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
             <img src="https://raw.githubusercontent.com/TianMeds/image--stocks-for-coding/main/image_2023-07-26_222231573.png" 
             />
            </Box>
            <Box sx={{textAlign: 'left', fontSize: '20px', fontWeight: '700', fontFamily: 'Open Sans', mb: 2, mt: 2}}> 
              Register your account
            </Box>
          <Box component="form" className="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label>Name</label>
                <TextField
                  required
                  fullWidth
                  placeholder='Enter your Full name'
                  inputRef={nameRef}
                  error={!!validationErrors.name}
                  helperText={validationErrors.name || ''}
                />
              </Grid>
              <Grid item xs={12}>
              <label>Email</label>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder='Enter your email address'
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                  type='email'
                  error={!!validationErrors.email}
                  helperText={validationErrors.email || ''}
                />
                
              </Grid>
              <Grid item xs={12}>
              <label>Password</label>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder='Password'
                  type="password"
                  inputRef={passwordRef}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Confirm Password</label>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  placeholder='Confirm your password'
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordConfirmationRef}
                  sx={{borderColor: 'grey.900'}}
                  error={!!validationErrors.password_confirmation}
                  helperText={validationErrors.password_confirmation || ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2,  textTransform: 'capitalize', borderRadius: '8px' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" underline='none' >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>

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
