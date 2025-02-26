import { Box, Container, Typography } from "@mui/material";
import { UrgentNeeds } from '../UrgentNeeds'
import { MainPage } from '../../globalConstants'


export function Main({ content }: { content: MainPage }) {
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
                    flex: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    m: { xs: 1, md: 2 },
                    pb:4
                }}>
                <Typography variant='h6' sx={{ m: 1, mt: 0, fontWeight: '700', color: 'red' }}>{content.Header2}</Typography>
                <UrgentNeeds tableHeaders={content.Table1} />
            </Box>
            <Box
                sx={{
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 2,
                    justifyContent: 'center',
                    m: { xs: 0, md: 2 }
                }}>
                <Typography variant='h6' sx={{ m: 1, mt: 0, fontWeight: '600' }}> {content.Header1} </Typography>

                <Box sx={{ borderRadius: '16px', backgroundColor: '#EFEFEF', height: '100%', m: {xs:1, md:0}, p: 3 }}>
                    <Typography sx={{ color: '#828282' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor diam nec tortor dignissim mollis. Morbi sed nisl et turpis gravida convallis. Sed ullamcorper porta dapibus. Sed in erat ornare, tristique augue id, posuere lorem. Donec nunc sapien, elementum sed metus eget, ultricies fringilla velit. Praesent et purus mauris. Vivamus aliquam mi justo. Proin facilisis commodo mi vel rhoncus.
                    </Typography>
                </Box>
            </Box>

        </Container>
    );
}

export default Main;
