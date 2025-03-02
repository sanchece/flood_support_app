import * as React from "react";

import MenuIcon from '@mui/icons-material/Menu';
import {
    Box,
    Container,
    Toolbar,
    Typography,
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";

import { LanguageContent } from '../../globalConstants'

const pages = ["headerPage1", "headerPage3"];

interface NavBarProps {
    content: LanguageContent;
    changeLanguage: () => void;
}

export function NavBar({ content, changeLanguage }: NavBarProps) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <AppBar sx={{ bgcolor: "black", minHeight: "6rem", justifyContent: { xs: 'center', md: 'end' } }}
            position="fixed"
        >
            <Container>
                <Toolbar disableGutters>
                    {/* large screen components *************************************/}
                    <Typography
                        variant="h4"
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        {content.headerTitle}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    px: 3, py: 1, color: 'white', display: 'block'
                                    , '&:hover': {
                                        backgroundColor: 'white',
                                        color: page == "impacted?" ? 'red' : 'black',
                                    },
                                    textTransform: 'none',
                                    fontSize: "16px"
                                }}
                                href={content?.[page].url}
                            >
                                {content?.[page].label}
                            </Button>
                        ))}
                    </Box>
                    {/* ***************************************************************/}

                    {/* mobile screen components *************************************/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} component="a" onClick={handleCloseNavMenu} href={content[page].url}>
                                    <Typography sx={{ textAlign: 'center' }}>{content[page].label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* <PriorityHighIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Inter',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    > {content.headerTitleMobile}
                    </Typography>
                    {/* ***************************************************************/}
                    <Button
                        onClick={changeLanguage}
                        sx={{
                            mx: 1, px: 1, py: 1, color: 'black', backgroundColor: 'white', display: 'block'
                            , '&:hover': {
                                backgroundColor: 'gray',
                                color: 'white',
                            },
                            textTransform: 'none',
                            fontSize: { xs: '12px', md: '16px' }

                        }}
                    >{content.languageButton}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
