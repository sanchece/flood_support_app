import {
    Alert,
    AlertTitle,
    CircularProgress,
    Container,
} from "@mui/material";

export const AlertComponent = (
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

export const LoadingComponent = (
    <Container maxWidth='lg' sx={{
        display: 'flex',
        mt: 15,
        p: { xs: 0, md: 'inherit' },
        justifyContent: 'center',

    }}>
        <CircularProgress thickness={4} sx={{ color: 'black' }} size={80} />
    </Container >
)
