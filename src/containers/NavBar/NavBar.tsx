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

const pages = [ "headerPage3"];

interface NavBarProps {
    content: LanguageContent;
    changeLanguage: () => void;
};

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
                            color: 'inherit',
                            display: { xs: 'none', md: 'flex' },
                            fontSize: 27,
                            mr: 2,
                            textDecoration: 'none',
                        }}
                    > {content.headerTitle}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    fontSize: "16px",
                                    color: 'white', display: 'block', px: 3, py: 1, 
                                     '&:hover': {
                                        backgroundColor: 'white',
                                        color: page == "impacted?" ? 'red' : 'black',
                                    },
                                    textTransform: 'none',
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
                        > <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            id="menu-appbar"
                            keepMounted
                            onClose={handleCloseNavMenu}
                            open={Boolean(anchorElNav)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        > {pages.map((page) => (
                                <MenuItem key={page} component="a" onClick={handleCloseNavMenu} href={content[page].url}>
                                    <Typography sx={{ textAlign: 'center' }}>{content[page].label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        component="a"
                        href="/"
                        noWrap
                        variant="h5"
                        sx={{
                            color: 'inherit',
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            mr: 2,
                            textDecoration: 'none',
                        }}
                    > {content.headerTitleMobile}
                    </Typography>
                    {/* ***************************************************************/}
                    <Button
                        onClick={changeLanguage}
                        sx={{
                            mx: 1, px: 1, py: 1, color: 'black'
                            ,backgroundColor: colors.navButton
                            ,display: 'block'
                            ,'&:hover': {
                                backgroundColor: '#0e194d',
                                color: 'white',
                            },
                            textTransform: 'none',
                            fontFamily: 'Open Sans'
                        }}>
                        <Typography variant={'body1'} sx={{ fontSize: { xs: '12px', md: '16px' } }}> {content.languageButton}</Typography>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
