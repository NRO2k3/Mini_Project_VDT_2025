import React, { useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Footer from '../../layouts/Footer'
import { Tabs, Tab, Box, Grid } from '@mui/material'
import TableUsers from '../../components/TableUsers'
import TableInRate from '../../components/TableInRate'
import TableProducts from '../../components/TableProducts'
import TableCustomer from '../../components/TableCustomer'

function Page() {
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
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
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
