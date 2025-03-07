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
            // flexDirection: 'column',
            mt: 15,
            p: { xs: 0, md: 'inherit' },
            justifyContent: 'center',

        }}>
            <CircularProgress thickness={4} sx={{ color: 'black' }} size={80} />
        </Container >
    )
    const headerOrder = isSpanish? 'row-reverse': 'row';

    // Render based on state
    if (loading) return LoadingComponent;
    if (error || data.length <= 0) return AlertComponent;
    return (
        <Container maxWidth='lg' sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'flex-start',
            mt: 4,
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
                <Box sx={{
                    alignContent: 'flex-start',
                    display: 'flex',
                    flexDirection: headerOrder,
                    ml: { xs: 2, lg: 0 },
                    mb: 3
                }}>
                    <Button
                        onClick={() => {
                            setSelectedState(!selectedState)
                            setSelectedCategory(null)
                        }}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'gray',
                                color: 'white',
                            },
                            textTransform: 'none',
                            justifyContent: 'center',
                            p: 0,
                            color: 'white',
                            backgroundColor: 'black',
                            height: '3rem'

                        }}
                    >
                        <Typography variant='h6' sx={{ mx: 2, mt: 0, fontWeight: '600' }}>{selectedState === true ? content.Header2 : content.Header3}</Typography>
                    </Button>
                    <Typography variant='h6' sx={{ p: 1, pl: 0, m: 0, mt: 0, fontWeight: '600' }}>{content.Header1} </Typography>
                    {/* <FormControl sx={{ width: '30%' }} >
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={'14'}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl> */}

                </Box>
                <ResourcesPieChart setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} data={data} state={selectedState} />
            </Box>
            <Box
                sx={{
                    flex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    m: { xs: 1, md: 2 },
                    pb: 4, pt: 4,

                }}>

                {/* <Typography variant='h6' sx={{ m: 1, mt: 0, fontWeight: '700', color: selectedState ? 'green' :  'red' }} >{content.Header2}</Typography> */}
                <UrgentNeeds content={content} selectedCategory={selectedCategory} data={data} state={selectedState} />
            </Box>
        </Container>
    );
}

export default Main;
