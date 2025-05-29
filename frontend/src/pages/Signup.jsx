import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CopyRight from '../components/CopyRight';
import { useNavigate } from 'react-router-dom';
import { ParamContext } from '../App';
import { create_user } from '../api/auth';

function Signup() {
    const { host} = useContext(ParamContext);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('password') !== data.get('password_verify')){
            alert("Password and Verify Password must be the same!")
        } else {
            alert("Valid!")
            const dataRequest= {"name": data.get("username"),
                                "password": data.get("password"),
                                "email": data.get("email"),
                                "phone": data.get("phone")};
            let isSuccessfull = await create_user(dataRequest, host);
            if(isSuccessfull === true){
              navigate("/login");
            }
        }
    };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{width: "400px"}}>
                    <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sx={{width: "400px"}}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sx={{width: "400px"}}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="text"
                    id="phone"
                    autoComplete="phone"
                  />
                </Grid>
                <Grid item xs={12} sx={{width: "400px"}}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sx={{width: "400px"}}>
                  <TextField
                    required
                    fullWidth
                    name="password_verify"
                    label="Verify Password"
                    type="password"
                    id="password_verify"
                    autoComplete="new-password"
                  />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" sx={{ cursor: 'pointer' }}>
                  Sign in?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRight sx={{ mt: 5 }} />
      </Container>
  );
}

export default Signup;