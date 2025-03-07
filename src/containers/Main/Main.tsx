import {
    Alert,
    Button,
    AlertTitle,
    Box,
    CircularProgress,
    Container,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useEffect, useState } from 'react';

import { MainPage } from '../../globalConstants'
import { ResourcesPieChart } from '../PieChart'
import { UrgentNeeds } from '../UrgentNeeds'
import { fetchData } from '../../api'
import {
    pieChartWrapperStyles,
    mainContainerStyles,
    headerWrapperStyles,
    headerNoneButtonStyles,
    headerButtonStyles,
    tableWrapperStyles,
} from "./Main.styles";

export function Main({ content, isSpanish }: { content: MainPage, isSpanish: boolean }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedState, setSelectedState] = useState(true);
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
        <Container maxWidth='lg' sx={mainContainerStyles}>
            <Box
                sx={pieChartWrapperStyles}>
                <Box sx={headerWrapperStyles}>
                    {isSpanish ? <Typography variant='h6' sx={headerNoneButtonStyles}>{content.Header1} </Typography> : ''}
                    <Button
                        onClick={() => {
                            setSelectedState(!selectedState)
                            setSelectedCategory(null)
                        }}
                        sx={headerButtonStyles}
                    >
                        <Typography variant='h6' sx={{ mx: 2, my: 0, fontWeight: '500' }}>{selectedState === true ? content.Header2 : content.Header3}</Typography>
                    </Button>
                    {isSpanish ? '' : <Typography variant='h6' sx={headerNoneButtonStyles}>{content.Header1} </Typography>}
                </Box>
                <ResourcesPieChart setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} data={data} state={selectedState} />
            </Box>
            <Box
                sx={tableWrapperStyles}>
                {/* <Typography variant='h6' sx={{ m: 1, mt: 0, fontWeight: '700', color: selectedState ? 'green' :  'red' }} >{content.Header2}</Typography> */}
                <UrgentNeeds content={content} selectedCategory={selectedCategory} data={data} state={selectedState} />
            </Box>
        </Container>
    );
}

export default Main;
