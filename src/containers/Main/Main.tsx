import {
    Button,
    Box,
    Container,
    Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';

import { MainPage } from '../../globalConstants'
import { ResourceSelection } from '../ResourceSelection'
import { ResourcesTable } from '../ResourceTable'
import { fetchData } from '../../api'
import {
    headerButtonStyles,
    headerNoneButtonStyles,
    mainButtonStyling,
    mainContainerStyles,
    pieChartWrapperStyles,
    tableWrapperStyles,
} from './Main.styles';
import { AlertComponent, LoadingComponent } from './components'

import available from '../../assets/available.svg'
import need from '../../assets/need.svg'

export function Main({ content, isSpanish }: { content: MainPage, isSpanish: boolean }) {
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const [selectedSubCategory, setSelectedSubCategory] = useState(undefined);
    const [selectedState, setSelectedState] = useState(undefined);
    const [completeData, setCompleteData] = useState({ es: [], en: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData(setLoading, setCompleteData, setError);
    }, []);

    useEffect(() => {
        setSelectedCategory(undefined);
        setSelectedSubCategory(undefined);
    }, [isSpanish]);

    const data = isSpanish ? completeData.es : completeData.en;
    const isGiveSelected = selectedState === false ? true : false;

    const handleMainButtonClick = (state) => (event) => {
        setSelectedCategory(undefined)
        setSelectedState(state)
        setSelectedSubCategory(undefined)
    }

    // Render based on state
    if (loading) return LoadingComponent;
    if (error || data.length <= 0) return AlertComponent;
    return (
        <Container maxWidth='lg' sx={mainContainerStyles}>
            <Box sx={pieChartWrapperStyles}>
                <Typography align="center" variant='h5' sx={headerNoneButtonStyles}>{content.Header1} </Typography>
                <Button onClick={handleMainButtonClick(true)} sx={headerButtonStyles(selectedState)} >
                    <img src={available} alt={'Available Icon'} width={35} height={35} />
                    <Typography sx={mainButtonStyling} variant={'body1'}>{content.button1}</Typography>
                </Button>
                <Button onClick={handleMainButtonClick(false)} sx={{ ...headerButtonStyles(isGiveSelected), mt: 2 }}>
                    <img src={need} alt={'Need Icon'} width={35} height={35} />
                    <Typography sx={mainButtonStyling} variant={'body1'}>{content.button2}</Typography>
                </Button>
                {selectedState !== undefined ?
                    <Box sx={{ pieChartWrapperStyles }}>
                        <Typography align="center" variant='h5' sx={{ ...headerNoneButtonStyles, mt: 4 }}>{selectedState ? content.Header3 : content.Header2} </Typography>
                        <ResourceSelection
                            allData={data}
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            setSelectedCategory={setSelectedCategory}
                            setSelectedSubCategory={setSelectedSubCategory}
                            state={selectedState} />
                    </Box> : <></>
                }
            </Box>

            {selectedState !== undefined ?
                <Box
                    sx={tableWrapperStyles}>
                    <ResourcesTable
                        allData={data}
                        content={content}
                        selectedCategory={selectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        state={selectedState}
                    />
                </Box> : <></>
            }
        </Container >
    );
}

export default Main;
