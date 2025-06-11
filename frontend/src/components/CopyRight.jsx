import React from 'react'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function CopyRight(props) {
  return (
    <Typography variant="body1" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="primary" href="https://web.facebook.com/tran.du.617558">NRO2K3</Link>{' '}
      {new Date().getFullYear()}{'.'}
    </Typography>
  )
}

export default CopyRight
