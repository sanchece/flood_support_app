import {
    Box,
    Container,
    Typography
} from "@mui/material";

import { ImpactedPage } from '../../globalConstants'

export function Impacted({ content }: { content: ImpactedPage }) {


    return (
        <Container maxWidth='lg' sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            mt: 6,
            p: { xs: 2, md: 'inherit' }
        }}>
            <Typography sx={{ m: 2, fontWeight: '600' }} variant='h6'> {content.header} </Typography>
            <Box sx={{ borderRadius: '16px', backgroundColor: '#EFEFEF', height: '100%', m: { xs: 1, md: 0 }, p: 3 }}>
                <Typography sx={{ color: '#828282' }}>
                    To do: Add information about all resources available for those impacted. <br />
                    Potential content: Links, Guides, Visuals, etc <br /><br />

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor diam nec tortor dignissim mollis. Morbi sed nisl et turpis gravida convallis. Sed ullamcorper porta dapibus. Sed in erat ornare, tristique augue id, posuere lorem. Donec nunc sapien, elementum sed metus eget, ultricies fringilla velit. Praesent et purus mauris. Vivamus aliquam mi justo. Proin facilisis commodo mi vel rhoncus.
                    Sed aliquam nibh id ipsum congue, pellentesque suscipit metus laoreet. In mollis feugiat viverra. Quisque sollicitudin facilisis nisi, sed finibus mauris feugiat ac. Sed euismod laoreet viverra. Integer sollicitudin sit amet lacus nec accumsan. Morbi euismod dapibus tempus. Proin elit tellus, dignissim sodales dignissim sit amet, tincidunt ac dolor. Aliquam accumsan neque sit amet viverra tempor. Sed ut leo est. Donec tristique finibus dolor at porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;Ut rutrum augue maximus, posuere turpis id, efficitur ipsum. Aliquam et metus nisl. Quisque lacinia diam vel enim dapibus, id interdum magna lobortis. In felis tortor, lacinia at convallis et, lobortis id turpis. Nulla facilisi. Etiam accumsan tincidunt vehicula. Donec at quam a libero placerat ultricies.
                </Typography>
            </Box>
        </Container>
    );
}

export default Impacted;
