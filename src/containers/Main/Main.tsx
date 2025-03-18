import {
    Button,
    Box,
    Container,
    Typography,
    SvgIcon,
} from "@mui/material";
import { useEffect, useState } from 'react';

import { fetchData } from '../../api'
import { MainPage, dataProperties } from '../../globalConstants'
import { ResourceSelection } from '../ResourceSelection'
import { CustomMap } from '../Map'
import { ResourcesTable } from '../ResourceTable'
import {
    headerButtonStyles,
    headerNoneButtonStyles,
    mainButtonStyling,
    mainContainerStyles,
    pieChartWrapperStyles,
    tableWrapperStyles,
    headerIconStyles,
} from './Main.styles';
import { AlertComponent, LoadingComponent } from './components'
import { AvailableIcon } from '../../assets/AvailableIcon'; // Path to your SVG file
import { NeedIcon } from '../../assets/NeedIcon'; // Path to your SVG file

export function Main({ content, isSpanish }: { content: MainPage, isSpanish: boolean }) {
    const [selectedMapPoint, setSelectedMapPoint] = useState(undefined);
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

    const data = isSpanish ? completeData.es : completeData.en; // filter data by language
    const isAnyThingSelected = selectedState !== undefined; // used to hide components if need/have not selected

    const selectedStatusOptions = selectedState ? dataProperties.availableStatus : dataProperties.unavailableStatus; // used to filter data 
    // selected table data - filtered by cat 1,cat2, state OR cat1, state OR just state
    const selectedTableData = selectedMapPoint !== undefined
        ? data.filter(row => selectedStatusOptions.includes(row.state) && row.who === selectedMapPoint.who)
        : selectedSubCategory
            ? data.filter(row => selectedStatusOptions.includes(row.state) && row.category1 === selectedCategory && row.category2 === selectedSubCategory)
            : selectedCategory
                ? data.filter(row => selectedStatusOptions.includes(row.state) && row.category1 === selectedCategory)
                : data.filter(row => selectedStatusOptions.includes(row.state));

    const handleMainButtonClick = (state) => (event) => {
        setSelectedCategory(undefined);
        setSelectedState(state);
        setSelectedSubCategory(undefined);
    }

    // Render based on state
    if (loading) return LoadingComponent;
    if (error || data.length <= 0) return AlertComponent;
    return (
        <Container disableGutters maxWidth='lg' sx={mainContainerStyles}>
            <Box sx={pieChartWrapperStyles}>
                <Typography align="center" variant='h5' sx={headerNoneButtonStyles}>{content.Header1} </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                       justifyContent: 'space-evenly',
                       width: '100%',

                }}>
                    <Button onClick={handleMainButtonClick(true)} sx={headerButtonStyles(selectedState)} >
                        <AvailableIcon sx={headerIconStyles(selectedState)} />
                        <Typography sx={mainButtonStyling(selectedState)} variant={'body1'}>{content.button1}</Typography>
                    </Button>
                    <Button onClick={handleMainButtonClick(false)}
                        sx={{ ...headerButtonStyles(selectedState === false) }}
                    >
                        <NeedIcon sx={headerIconStyles(selectedState === false)} />
                        <Typography sx={mainButtonStyling(selectedState === false)} variant={'body1'}>{content.button2}</Typography>
                    </Button>
                </Box>
                {isAnyThingSelected ?
                    <Box sx={{ pieChartWrapperStyles }}>
                        <Typography align="center" variant='h5' sx={{ ...headerNoneButtonStyles, mt: 2 }}>{selectedState ? content.Header3 : content.Header2} </Typography>
                        <ResourceSelection
                            allData={data}
                            selectedCategory={selectedCategory}
                            selectedStatusOptions={selectedStatusOptions}
                            selectedSubCategory={selectedSubCategory}
                            setSelectedCategory={setSelectedCategory}
                            setSelectedSubCategory={setSelectedSubCategory}
                            setSelectedMapPoint={setSelectedMapPoint}
                        />
                    </Box> : <></>}
            </Box>
            {
                isAnyThingSelected ?
                    <Box sx={{
                        display: 'flex',
                        // flex: 4,
                        width: {sm:'100%', md:'60%'},
                        flexDirection: 'column',
                        m: { xs: 0, md: 2 },
                        alignItems: 'center',
                        pt:0,
                    }}>
                        <Box
                            sx={tableWrapperStyles}>
                            <ResourcesTable
                                content={content}
                                selectedCategory={selectedCategory}
                                selectedTableData={selectedTableData}
                                selectedSubCategory={selectedSubCategory}
                                state={selectedState}
                                selectedMapPoint={selectedMapPoint}
                            />
                        </Box>
                        <CustomMap
                            content={content}
                            selectedMapPoint={selectedMapPoint}
                            setSelectedMapPoint={setSelectedMapPoint}
                            selectedTableData={selectedTableData}
                            setSelectedSubCategory={setSelectedSubCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </Box>
                    : <></>
            }

        </Container >
    );
}

export default Main;
