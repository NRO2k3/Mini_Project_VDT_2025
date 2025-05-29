import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Language, Public, Share, Twitter } from '@mui/icons-material';
import CopyRight from '../components/CopyRight';
import MapboxMap from '../components/MapboxMap';


function Footer() {
    const footers = [
        {
            title: "Phone",
            icon: (<CallIcon/>),
            description: "Phone: ................................................"
        },
        {
            title: "Email",
            icon: (<EmailIcon/>),
            description: "Email: ................................................",
        },
        {
            title: "Address",
            icon: (<LocationOnIcon/>),
            description: "Address: ..............................................",
        },
    ];

    return (
        <Box component="footer" sx={{ backgroundColor: '#f9f9f9', py: 6 }}>
                <Grid container item spacing={5} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h5" color="text.primary" gutterBottom>
                                VDT 2025
                            </Typography>
                        </Box>
                        {footers.map((footer) => (
                            <Box key= {footer.title} display="flex" gap="10px" marginY='10px' justifyContent='center'>
                                <Box>
                                    {footer.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h6" color="text.primary" gutterBottom>
                                    {footer.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h5" color="text.primary" marginY={2} gutterBottom>
                                Follow us
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-evenly"
                        >
                            <Link color="inherit" href="https://hust.edu.vn/">
                                <GoogleIcon/>
                            </Link>
                            <Link color="inherit" href="https://hust.edu.vn/">
                                <FacebookIcon/>
                            </Link>
                            <Link color="inherit" href="https://hust.edu.vn/">
                                <Language/>
                            </Link>
                            <Link color="inherit" href="https://hust.edu.vn/">
                                <Twitter/>
                            </Link>
                            <Link color="inherit" href="https://hust.edu.vn/">
                                <Public/>
                            </Link>
                            <Link color="inherit" href="https://hust.edu.vn/">
                                <Share/>
                            </Link>
                        </Box>
                    </Grid >
                    <Grid item xs={12} sm={12} md={6} sx={{ width: '560px', ml: 12 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Typography variant="h5" color="text.primary" gutterBottom>
                            Location
                        </Typography>
                        </Box>
                        <MapboxMap />
                    </Grid>
                </Grid>
            <CopyRight sx={{ mt: 5}} />
        </Box>
    );
}

export default Footer;