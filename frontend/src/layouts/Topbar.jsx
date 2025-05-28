import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo_lab.png';
import LogoutIcon from '@mui/icons-material/Logout';

const Topbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

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
					style={{ maxWidth: '120%', maxHeight: '120%' }}
					src={logo}
					/>
				</Box>

				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%">
					<Link to="/landing">
						<IconButton
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<HomeIcon style={{ fill: 'white' }}/>
							<Typography variant="h6"
										color="white"
										display="inline"
										paddingLeft="5%"
										style={{fontWeight: isHovered ? 'bold' : 'normal' ,  transition: 'font-weight 0.15s', whiteSpace: "nowrap", }}>
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
      
					<Link to="/configuration">
						<IconButton
							onMouseEnter={() => setIsHovered2(true)}
							onMouseLeave={() => setIsHovered2(false)}
						>
							<SettingsIcon style={{ fill: 'white' }}/>
							<Typography variant='h6'
										color="white"
										display="inline"
										paddingLeft="5%"
										style={{ fontWeight: isHovered2 ? 'bold' : 'normal' ,  transition: 'font-weight 0.15s', whiteSpace: "nowrap",}}>
								Configuration
							</Typography>
						</IconButton>
					</Link>

				</Box>
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
                Welcome Tran Du
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
            <MenuItem>
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
