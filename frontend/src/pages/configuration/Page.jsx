import React, { useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Footer from '../../layouts/Footer'
import { Tabs, Tab, Box, Grid } from '@mui/material'
import TableUsers from '../../components/TableUsers'
import TableInRate from '../../components/TableInRate'
import TableProducts from '../../components/TableProducts'

function Page() {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Topbar />

      <Grid container spacing={2} sx={{ height: 'calc(100vh - 64px - 64px)'}}>
        <Grid item xs={2}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider', height: '100%',width: '180px', '& .MuiTab-root': {
              fontWeight: 'bold'
            }}}
          >
            <Tab label="Users"/>
            <Tab label="Interest Rate"/>
            <Tab label="Products"/>
          </Tabs>
        </Grid>

        <Grid item xs={10}>
          <Box
            sx={{
              width: '1300px',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {tabValue === 0 && <TableUsers/>}
            {tabValue === 1 && <TableInRate/>}
            {tabValue === 2 && <TableProducts/>}
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  )
}

export default Page
