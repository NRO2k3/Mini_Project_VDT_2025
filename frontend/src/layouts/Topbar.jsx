import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo_lab.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout, verifyAccessToken, verifyRefreshToken } from "../api/auth";
import { ParamContext } from "../App";

function Topbar ()  {
	const {host, setIsSignin} = useContext(ParamContext);
	const [hoveredItem, setHoveredItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
	const [openProducts, setOpenProducts] = useState(null);
	const navigate = useNavigate();
	const role = localStorage.getItem("role")
	const username = localStorage.getItem("username")
	const handleLogout = async ()=>{
		if(!await verifyAccessToken(host)){
			if(!await verifyRefreshToken(host)){
				setIsSignin(false);
				localStorage.clear();
				return navigate("/login");
			} else{
				let check = await logout(host);
				if(check){
					setIsSignin(false);
					return navigate("/login");
				}
			}
		} else{
			let check = await logout(host);
				if(check){
					setIsSignin(false);
					return navigate("/login");
				}
		}
	}
  return (
    <Box display="flex"
				justifyContent="space-between"
				paddingRight={2}
				paddingLeft={2}
				backgroundColor="black"
		>
		<Box display="flex">
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					width={100}
					height={50}
					>
					<img
					alt="logo"
					style={{ maxWidth: '150%', maxHeight: '150%' }}
					src={logo}
					/>
				</Box>

				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft={role === "1" ? "2%" : "10%"}>
					<Link to="/home">
						<IconButton
							onMouseEnter={() => setHoveredItem("home")}
							onMouseLeave={() => setHoveredItem(null)}
						>
							<HomeIcon style={{ fill: 'white' }}/>
							<Typography variant="h6"
										color="white"
										display="inline"
										paddingLeft="5%"
										style={{fontWeight: hoveredItem === "home" ? 'bold' : 'normal' ,  transition: 'font-weight 0.15s', whiteSpace: "nowrap", }}>
								Home
							</Typography>
						</IconButton>
					</Link>
				</Box>
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%"
        >
						<IconButton
							aria-control='products-menu'
							onClick={e => setOpenProducts(e.currentTarget)}
							onMouseEnter={() => setHoveredItem("products")}
							onMouseLeave={() => setHoveredItem(null)}
						>
							<SettingsIcon style={{ fill: 'white' }}/>
							<Typography variant='h6'
										color="white"
										display="inline"
										paddingLeft="5%"
										style={{ fontWeight: hoveredItem === "products" ? 'bold' : 'normal' ,  transition: 'font-weight 0.15s', whiteSpace: "nowrap",}}>
								Products
							</Typography>
						</IconButton>
						<Menu
						id='products-menu'
						open={Boolean(openProducts)}
						anchorEl={openProducts}
						onClose={() => setOpenProducts(null)}
						disableAutoFocusItem
						slotProps={{
							paper: {
								style: {
									minWidth: '100px'
								}
							}
						}}
					>
						<MenuItem  component={Link} to="/saving">
							<Typography variant="h6" component='span' pl={2}>
								Savings
							</Typography>
						</MenuItem>
			
						<MenuItem>
							<Typography variant="h6" component='span' pl={2}>
								Loans
							</Typography>
						</MenuItem>

						<MenuItem>
							<Typography variant="h6" component='span' pl={2}>
								Insurances
							</Typography>
						</MenuItem>
					</Menu>
				</Box>
				{	role === "1" ?
					<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%"
				>
					<IconButton  component={Link} to="/configuration"
						onMouseEnter={() => setHoveredItem("configuration")}
						onMouseLeave={() => setHoveredItem(null)}
					>
						<SettingsIcon style={{ fill: 'white' }}/>
						<Typography variant='h6'
									color="white"
									display="inline"
									paddingLeft="5%"
									style={{ fontWeight: hoveredItem === "configuration" ? 'bold' : 'normal' ,  transition: 'font-weight 0.15s', whiteSpace: "nowrap",}}>
							Configuration
						</Typography>
					</IconButton>

					</Box>
				:null
				}
		</Box>

		<Box display="flex">
				<Box display="flex" alignItems="center">
					<IconButton
						aria-control='profile-menu'
						onClick={e => setOpenMenu(e.currentTarget)}
					>
						<PersonOutlinedIcon style={{ fill: 'white' }}/>
					</IconButton>
					<Menu
						id='profile-menu'
						open={Boolean(openMenu)}
						anchorEl={openMenu}
						onClose={() => setOpenMenu(null)}
						disableAutoFocusItem
						slotProps={{
							paper: {
								style: {
									minWidth: '200px'
								}
							}
						}}
					>
						<div>
							<Typography variant="h5" py={1} pl={2}>
                Welcome {username}
							</Typography>
						</div>
						<MenuItem>
							<AccountCircleOutlinedIcon />
							<Typography component='span' pl={2}>
								Profile
							</Typography>
						</MenuItem>
						<MenuItem>
							<SettingsIcon />
							<Typography component='span' pl={2}>
								Settings
							</Typography>
						</MenuItem>
            <MenuItem onClick={()=>{
												setOpenMenu(null);
												handleLogout();
						}}
							>
							<LogoutIcon/>
							<Typography component='span' pl={2}>
								Sign out
							</Typography>
            </MenuItem>
					</Menu>
				</Box>
		</Box>
		</Box>
  );
};

export default Topbar;
