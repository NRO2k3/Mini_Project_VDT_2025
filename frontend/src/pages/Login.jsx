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
import { login } from '../api/auth';
import { ParamContext } from '../App';
import { useNavigate } from "react-router-dom";

function Login() {
    const { setIsSignin, host} = useContext(ParamContext);
    const navigate = useNavigate();
    console.log("Login component rendered");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("email");
        const password = data.get("password");
    
        try {
            let check = await login(username, password, host);
            if(check){
                localStorage.setItem("isSignIn", "true");
                setIsSignin(true);
                navigate("/home");
            }
        } catch (err) {
            alert("Login failed: " + err.message);
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
            Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            />

            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
            <Box sx={{ width: '100%' }}>
                <Grid container justifyContent="flex-end" spacing={1}>
                <Grid item>
                    <Link variant="body2" sx={{ cursor: 'pointer' }}>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup" variant="body2" sx={{ cursor: 'pointer' }}>
                        Sign Up?
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Box>
        </Box>

        <CopyRight sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

export default Login;
