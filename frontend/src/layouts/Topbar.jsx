import { Box, IconButton, Typography, Menu, MenuItem, useMediaQuery, ListItemIcon, Drawer, List, ListItem, ListItemText, Divider, Collapse, ListItemButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo_lab.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { getData, logout, verifyAccessToken, verifyRefreshToken } from "../api/auth";
import { ParamContext } from "../App";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Topbar ()  {
	const isMobile = useMediaQuery('(max-width:600px)');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const {setIsSignin, host} = useContext(ParamContext);
	const [hoveredItem, setHoveredItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
	const [openProducts, setOpenProducts] = useState(null);
	const navigate = useNavigate();
	const role = localStorage.getItem("role")
	const username = localStorage.getItem("username")
  const [dataType, setDataType] = useState([]);
	const url_list_type = `https://${host}/api/v1/banking_product/list/type`;
	const [openProductsList, setOpenProductsList] = useState(false);

	const handleLogout = async ()=>{
		if(!await verifyAccessToken()){
			if(!await verifyRefreshToken()){
				alert("Log out failed !!!")
				return;
			} else{
				let check = await logout();
				if(check){
					setIsSignin(false);
					navigate("/login");
					localStorage.clear();
					return;
				}
			}
		} else{
			let check = await logout();
				if(check){
					setIsSignin(false);
					navigate("/login");
					localStorage.clear();
					return;
				}
		}
	}

	useEffect(()=>{
		getData(url_list_type, setDataType, navigate);
	},[])
  return (
    <Box display="flex"
				justifyContent="space-between"
				paddingRight={2}
				paddingLeft={2}
				backgroundColor="black"
		>
		<Box display="flex">
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				width={isMobile ? 60 : 100}
				height={50}
			>
				<img
					alt="Lab Logo"
					src={logo}
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
						objectFit: 'contain'
					}}
				/>
</Box>
			{	isMobile ? <>
				<IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "white", ml: 1 }}>
          <MenuIcon />
        </IconButton>
				<Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<Box width={250} role="presentation" onKeyDown={() => setDrawerOpen(false)}>
						<List>
							<ListItem button component={Link} to="/home">
								<ListItemIcon><HomeIcon /></ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem>

							<ListItemButton onClick={() => setOpenProductsList(!openProductsList)}>
								<ListItemIcon><ShoppingCartIcon /></ListItemIcon>
								<ListItemText primary="Products" />
								{openProductsList ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>

							<Collapse in={openProductsList} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{dataType.map((type) => (
										<ListItemButton
											key={type.id}
											sx={{ pl: 4 }}
											component={Link}
											to="/product/landing"
											state={{ typeName: type.name }}
											onClick={()=> setDrawerOpen(false)}
										>
											<ListItemIcon><ShoppingCartIcon fontSize="small" /></ListItemIcon>
											<ListItemText primary={type.name} />
										</ListItemButton>
									))}
								</List>
							</Collapse>

							{(role === "ADMIN" || role === "ASSISTANT") && (
								<ListItem button component={Link} to="/configuration/page">
									<ListItemIcon><SettingsIcon /></ListItemIcon>
									<ListItemText primary="Configuration" />
								</ListItem>
							)}
						</List>
						<Divider/>
					</Box>
        </Drawer>
			</>
				:
					<>
						<Box display="flex"
							justifyContent="center"
							alignItems="center"
							paddingLeft={role === "ADMIN"||role ==="ASSISTANT" ? "1%" : "10%"}>
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
									aria-label="Products"
									aria-controls='products-menu'
									aria-haspopup="true"
									aria-expanded={Boolean(openMenu)}
									onClick={e => setOpenProducts(e.currentTarget)}
									onMouseEnter={() => setHoveredItem("products")}
									onMouseLeave={() => setHoveredItem(null)}
								>
									<ShoppingCartIcon style={{ fill: 'white' }}/>
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
							{
								dataType.map((type) => (
								<MenuItem onClick={()=>setOpenProducts(null)} key={type.id} component={Link}  to={"/product/landing"} state={{typeName:type.name}}>
									<ShoppingCartIcon fontSize="small"/>
									<Typography variant="h6" component='span' pl={2}>
										{type.name}
									</Typography>
								</MenuItem>
								))
							}
							</Menu>
						</Box>
						{	role === "ADMIN" || role === "ASSISTANT" ?
						<Box display="flex"
							justifyContent="center"
							alignItems="center"
							paddingLeft="5%"
						>
							<IconButton
								component={Link} to="/configuration/page"
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
					</>
			}
		</Box>
		<Box display="flex">
				<Box display="flex" alignItems="center">
					<IconButton
						aria-controls='profile-menu'
						aria-label="Open profile menu"
						aria-haspopup="true"
						aria-expanded={Boolean(openMenu)}
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
