import {
    Box,
    Container,
    Typography
} from "@mui/material";

import { AboutPage } from '../../globalConstants'

export function About({ content }: { content: AboutPage }) {

    return (
        <Container maxWidth='lg' sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            mt: 6,
            p: { xs: 0, md: 'inherit' },
        }}>
            <Typography sx={{ m: 1, fontWeight: '600' }} variant='h6'> {content.header} </Typography>
            <Box sx={{
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
                color: '#828282',
                height: '100%',
                m: { xs: 1, md: 0 },
                p: 2, 
            }}>
                <Typography variant="body1">
                    This resource-app was imagined, designed, & developed 100% with the power of local volunteers.
                    {/* Shout-out to: */}
                </Typography> <br />
                {/* <Typography sx={{ fontSize:13,px: 0, fontWeight: 700 }}> Anonymous volunteer 1</Typography>
                <Typography sx={{ px: 2 }}> &#9656;  Full stack software development</Typography>
                <Typography sx={{ px: 2 }}> &#9656;  South West Detroit Native</Typography>
                <Typography sx={{ px: 2 }}>
                    &#9656;  This creator and GLS found each other in pursuit of using technology and clear-communication as an aide to the SW Detroit flooding incident. This individual introduced passion, immense willpower, & genuine kindness in our process. Thank you for your insanely-quick software developments over late nights and for offering your forged talents to serve our community.
                </Typography><br/>

                <Typography sx={{ px: 0, fontWeight: 700 }}> Anonymous volunteer 2</Typography>
                <Typography sx={{ px: 2 }}> &#9656;  UX design, beta-developer & tester</Typography>
                <Typography sx={{ px: 2 }}> &#9656;  South West Detroit Resident</Typography>
                <Typography sx={{ px: 2 }}>
                    &#9656;  Our standing relationship with this local creator allowed us to flow right into a beautiful collaboration. Continually, we humbly receive the clarity & winning-attutude from this partnership, and this project has been no different. Demonstrated by your impact, it feels like any challenge can be overcome with clever solutions. We & the community are lucky to share time & space with you.
                </Typography><br/>

                <Typography sx={{ px: 0, fontWeight: 700 }}> Graft Living Studios Team</Typography>
                <Typography sx={{ px: 2 }}> &#9656;  Project coordination, database modeling & development</Typography>
                <Typography sx={{ px: 2, whiteSpace: 'pre-line' }}>
                    &#9656;  The GLS team was wonderfully inspired & challenged to pull from existing & new digital skills. This app aims to be a genuine & real-time data-storytelling tool that connects
                    1) impacted residents to
                    2) SW Detroit resources to
                    3) the public; then perhaps connecting broader communities to broader resources tomorrow.
                </Typography> */}
            </Box>
        </Container>
    );
}

export default About;

