import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { UrgentNeeds } from '../UrgentNeeds'
import { ResourcesPieChart } from '../PieChart'
import { MainPage, Data } from '../../globalConstants'
import { urgentNeeds } from '../../data';
import { dataProperties } from '../../globalConstants'



export function Main({ content, isSpanish }: { content: MainPage, isSpanish: boolean }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const data: Data[] = urgentNeeds;
    const formattedData = isSpanish
        ? data.map(row => {
            const english = row.itemCategory
            const spanish = dataProperties.spanish[english]
            return { ...row, itemCategory: spanish }
        })
        : data;
    ;
    useEffect(() => {
        setSelectedCategory(null);
      }, [isSpanish]);
    return (
        <Container maxWidth='lg' sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'flex-end',
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
                <ResourcesPieChart setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} data={formattedData} />
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
                <UrgentNeeds tableHeaders={content.Table1} selectedCategory={selectedCategory} data={formattedData} />
            </Box>

        </Container>
    );
}

export default Main;
