import React, { useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Footer from '../../layouts/Footer'
import { Tabs, Tab, Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import TableUsers from '../../components/TableUsers'
import TableInRate from '../../components/TableInRate'
import TableProducts from '../../components/TableProducts'
import TableCustomer from '../../components/TableCustomer'

function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0)
  const role = localStorage.getItem("role")
  const adminTabs = ["Users", "Interest Rate", "Products", "Customer"];
  const assistantTab = ["Customer"];

  const tabLabels = role === "ADMIN" ? adminTabs : assistantTab;

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Topbar />

      <Grid container spacing={2} sx={{ height: isMobile? 'calc(100vh - 64px)' :'calc(100vh - 64px - 34px)'}}>
        <Grid item xs={12} md={2}>
        <Tabs
          orientation={isMobile ? 'horizontal' : 'vertical'}
          value={tabValue}
          onChange={handleChange}
          sx={{
            borderRight: isMobile ? 'none' : 1,
            borderColor: 'divider',
            height: isMobile ? 'auto' : '100%',
            width: isMobile ? '100%' : '180px',
            '& .MuiTab-root': {
              fontWeight: 'bold',
            },
          }}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : 'off'}
          allowScrollButtonsMobile={true}
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
        </Grid>

        <Grid item xs={12} md={10}>
          <Box
            sx={{
              width: isMobile?"100%":"1320px",
              maxWidth: "100%",
              height: isMobile?"60%":'100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
          {role === "ADMIN" ? (
            <>
              {tabValue === 0 && <TableUsers />}
              {tabValue === 1 && <TableInRate />}
              {tabValue === 2 && <TableProducts />}
              {tabValue === 3 && <TableCustomer />}
            </>
          ) :
            tabValue === 0 && <TableCustomer />
          }
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </>
  )
}

export default Page
