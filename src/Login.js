import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import './App.css';
import { ReactDOM } from 'react';
// import Home from './Home';////////////////

function Copyright(props) {
     useEffect(()=>{
     localStorage.clear();
},[])
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const [adminMobile, setAdminMobile] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSigninAdmin = (obj) => {
    axios.post("https://active-backend.onrender.com/api/login/admin",obj).then((res) => {
        if (res.data.admin) {
            localStorage.clear();
            localStorage.setItem("adminlog", JSON.stringify(res.data.admin));
            window.location.href = '/adminhome';
        }
        else {
            alert("Invalid login details");
            window.location.reload();
        }
    })
}

const handleSigninUser = (obj) => {
    axios.post("https://active-backend.onrender.com/api/login/user", obj).then((res) => {
        if (res.data.user) {
            localStorage.clear();
            localStorage.setItem('userlog', JSON.stringify(res.data.user));
            window.location.href = '/userhome';
        }
        else {
            alert("Invalid login details");
            window.location.reload();
        }
    })
}

    return (
        <div>
            <div className='logincaption' style={{ width: '100%', fontSize: '50px', marginTop: '50px' }}>
                <b>Caption</b>
            </div>
            <div className='loginpage' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', position: 'fixed', height: '60%' }}>

                <div className='loginchild' style={{ width: '49%', border: '1px' }}>
                    <ThemeProvider theme={theme} >
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{

                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Admin Login
                                </Typography>
                                <Box noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={(e) => {
                                            setAdminMobile(e.target.value);
                                        }}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="number"
                                        label="Phone Number"
                                        name="number"
                                        autoComplete="number"
                                        autoFocus
                                    />
                                    <TextField
                                        onChange={(e) => {
                                            setAdminPassword(e.target.value);
                                        }}
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
                                        onClick={() => {
                                            let obj = {
                                                mobile: `${adminMobile}`,
                                                password: `${adminPassword}`,
                                            }
                                            handleSigninAdmin(obj);
                                        }}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Log In
                                    </Button>

                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
                <div className='loginchild' style={{ width: '49%' }}>
                    <ThemeProvider theme={theme} className='loginchild'>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{

                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                {/* <div><img src='./pic-removebg-preview.png' width='50px' /></div> */}
                                <Typography component="h1" variant="h5">
                                    User Login
                                </Typography>
                                <Box noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={(e) => {
                                            setUserMobile(e.target.value);
                                        }}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Phone Number"
                                        name="email"
                                        autoComplete="email"
                                    />
                                    <TextField
                                        onChange={(e) => {
                                            setUserPassword(e.target.value);
                                        }}
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
                                        onClick={() => {
                                            let obj = {
                                                mobile: `${userMobile}`,
                                                password: `${userPassword}`,
                                            }
                                            handleSigninUser(obj);
                                        }}
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Log In
                                    </Button>

                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}
