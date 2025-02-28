import * as React from 'react';
import { Box, Toolbar } from '@mui/material';

import { BrowserRouter, Routes, Route } from "react-router";
import {
  About,
  Impacted,
  Main,
  NavBar,
} from './containers';
import { appContent } from './globalConstants.js'
import { appWrapperStyles } from './App.styles';

function App() {
  const [isSpanish, setSpanish] = React.useState(false);
  const content = isSpanish ? appContent.spanish : appContent.english
  const changeLanguage = () => setSpanish(!isSpanish);

  return (
    <>
      <Box sx={appWrapperStyles}>
        <NavBar content={content} changeLanguage={changeLanguage} /> <Toolbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main isSpanish={isSpanish} content={content.mainPage} />} />
            <Route path="/impacted" element={<Impacted content={content.impactedPage} />} />
            <Route path="/about" element={<About content={content.aboutPage} />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  )
}

export default App
