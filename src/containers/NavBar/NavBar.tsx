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

import {
    LanguageContent,
    colors,
} from '../../globalConstants'

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
        <AppBar sx={{ bgcolor: colors.navBar, minHeight: "5rem", justifyContent: { xs: 'center', md: 'end' } }}>
            <Container>
                <Toolbar disableGutters>
                    {/* large screen components *************************************/}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            // flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: 27
                        }}
                    > {content.headerTitle}
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
                                <Typography variant={'body1'} sx={{ fontSize: 16 }}> {content?.[page].label}</Typography>
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
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    > {content.headerTitleMobile}
                    </Typography>
                    {/* ***************************************************************/}
                    <Button
                        onClick={changeLanguage}
                        sx={{
                            mx: 1, px: 1, py: 1, color: 'black'
                            , backgroundColor: colors.navButton
                            , display: 'block'
                            , '&:hover': {
                                backgroundColor: '#0e194d',
                                color: 'white',
                            },
                            textTransform: 'none',
                            fontSize: { xs: '12px', md: '16px' },
                            fontFamily: 'Open Sans'
                        }}
                    >
                        <Typography variant={'body1'} sx={{ fontSize: 16 }}> {content.languageButton}</Typography>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
