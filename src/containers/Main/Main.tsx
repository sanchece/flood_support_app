import { Alert, AlertTitle, Box, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from 'react';

import { MainPage } from '../../globalConstants'
import { ResourcesPieChart } from '../PieChart'
import { UrgentNeeds } from '../UrgentNeeds'
import { fetchData } from '../../api'

export function Main({ content, isSpanish }: { content: MainPage, isSpanish: boolean }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [completeData, setCompleteData] = useState({ es: [], en: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // console.log('mounting...')
        fetchData(setLoading, setCompleteData, setError);
    }, []);

    useEffect(() => {
        // console.log('changing language...')
        setSelectedCategory(null);
    }, [isSpanish]);

    const data = isSpanish ? completeData.es : completeData.en;

    const AlertComponent = (
            <Container maxWidth='lg' sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 6,
                p: { xs: 0, md: 'inherit' },
            }}>
                <Alert severity="warning" sx={{ display: 'flex', m: 5 }}>
                    <AlertTitle> Whoops :/</AlertTitle>
                    For some reason the data fetch failed. Please try again later.
                </Alert>
            </Container>
        )
    
    const LoadingComponent = (
            <Container maxWidth='lg' sx={{
                display: 'flex',
                // flexDirection: 'column',
                mt: 15,
                p: { xs: 0, md: 'inherit' },
                justifyContent: 'center',

            }}>
                <CircularProgress thickness={4} sx={{ color: 'black' }} size={80} />
            </Container >
        )

// Render based on state
  if (loading) return LoadingComponent;
  if (error || data.length <= 0) return AlertComponent;
  return (
    <Container maxWidth='lg' sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'flex-start',
        mt: 6,
        p: { xs: 0, md: 'inherit' }
    }}>
        <Box
            sx={{
                alignContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'flex-start',
                m: { xs: 0, md: 2 },
            }}>
            <Typography variant='h6' sx={{ m: 1, mt: 0, fontWeight: '600' }}> {content.Header1} </Typography>
            <ResourcesPieChart setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} data={data} />
        </Box>
        <Box
            sx={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                m: { xs: 1, md: 2 },
                pb: 4
            }}>
            <Typography variant='h6' sx={{ m: 1, mt: 0, fontWeight: '700', color: 'red' }}>{content.Header2}</Typography>
            <UrgentNeeds tableHeaders={content.Table1} selectedCategory={selectedCategory} data={data} />
        </Box>
    </Container>
  );
}

export default Main;
