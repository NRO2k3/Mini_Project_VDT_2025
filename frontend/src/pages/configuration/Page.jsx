import React from 'react'
import Topbar from '../../layouts/Topbar'
import Footer from '../../layouts/Footer'
import { Grid, Typography } from '@mui/material'
import TableUsers from '../../components/TableUsers'
import TableInRate from '../../components/TableInRate'

function Page() {
  return (
    <>
      <Topbar/>
      <Grid container justifyContent={"center"} alignItems={"center"} spacing={4}>
        <Grid item xs={6}>
          <TableUsers/>
        </Grid>
        <Grid item xs={6}>
          <TableInRate/>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
        </Grid>
    </Grid>
      <Footer/>
    </>
  )
}

export default Page