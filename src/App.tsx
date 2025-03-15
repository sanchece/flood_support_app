import * as React from 'react';
import { Toolbar, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';

import {
  About,
  Impacted,
  Main,
  NavBar,
} from './containers';
import { appContent } from './globalConstants.js'
import { appWrapperStyles, graftLivingStudiosTheme } from './App.styles';

function App() {
  const [isSpanish, setSpanish] = React.useState(false);
  const content = isSpanish ? appContent.spanish : appContent.english
  const changeLanguage = () => setSpanish(!isSpanish);

  return (
    <Container sx={appWrapperStyles}>
      <ThemeProvider theme={graftLivingStudiosTheme}>
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
