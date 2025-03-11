import * as React from 'react';
import { Toolbar, Container } from '@mui/material';
import '@fontsource/montserrat';
import "@fontsource/montserrat/900.css"; // Specify weight
import "@fontsource/montserrat/600.css"; // Specify weight
import "@fontsource/open-sans/600.css"; // Specify weight
import '@fontsource/open-sans'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter, Routes, Route } from "react-router";
import {
  About,
  Impacted,
  Main,
  NavBar,
} from './containers';
import { appContent } from './globalConstants.js'
import { appWrapperStyles } from './App.styles';
import './index.css';

function App() {
  const [isSpanish, setSpanish] = React.useState(false);
  const content = isSpanish ? appContent.spanish : appContent.english
  const changeLanguage = () => setSpanish(!isSpanish);
  const THEME = createTheme({
    typography: {
      fontFamily: 'Montserrat, Open Sans',
      h5: {
        fontWeight: 600,
        fontSize: 16
      },
      body1: {
        fontSize: 12,
        fontFamily: 'Open Sans',

      },
      body2: {
        fontSize: 9,
        fontFamily: 'Open Sans',
      },
    }
  });

  return (
    <Container sx={appWrapperStyles}>
      <ThemeProvider theme={THEME}>
        <NavBar content={content} changeLanguage={changeLanguage} /> <Toolbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main isSpanish={isSpanish} content={content.mainPage} />} />
            <Route path="/impacted" element={<Impacted content={content.impactedPage} />} />
            <Route path="/about" element={<About content={content.aboutPage} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  )
}

export default App
