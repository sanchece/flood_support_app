import {
    Box,
    Button,
    Container,
    Typography,
    Link,
} from "@mui/material";
import { Map, Marker } from "pigeon-maps"
import { fontColor, colors } from '../../globalConstants'

import { createGoogleMapLink, filterData } from '../../globalHelpers'


export const CustomMap = ({
    content,
    selectedMapPoint,
    setSelectedMapPoint,
    setSelectedSubCategory,
    setSelectedCategory,
    mapPoints,
}) => {
    const { mapDefaultText } = content
    // Handle marker click to toggle tooltip visibility
    const handleMarkerClick = (pointInfo) => () => {
        if (selectedMapPoint !== undefined && selectedMapPoint.who === pointInfo.who) {
            setSelectedMapPoint(undefined)

        } else {
            setSelectedMapPoint(pointInfo)
            setSelectedCategory(undefined)
            setSelectedSubCategory(undefined)
        }
    };

    const isALocationSelected = selectedMapPoint !== undefined

    return (
        <Box sx={{ m: 0, p: 0, width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '90%',
                    mt: 2,
                }}
            >
                {mapPoints.map((mapPoint) => (
                    <Button
                        key={mapPoint.who}
                        sx={{
                            px: 1,
                            py: .5,
                            textTransform: 'none',
                            mx: .2,
                            my: .2,
                            color: 'black',
                            backgroundColor: isALocationSelected && mapPoint.who !== selectedMapPoint.who ? colors.defaultIcon : colors.secondaryIcons,
                            display: 'flex',
                            borderRadius: 3,
                        }}
                        onClick={handleMarkerClick(mapPoint)}
                    >
                        <Typography sx={{
                            fontWeight: isALocationSelected && mapPoint.who === selectedMapPoint.who ? 800 : 400
                        }} variant="body2">{mapPoint.who}</Typography>
                    </Button>
                )
                )}
            </Box>

            <Container disableGutters sx={{
                p: 0, mt: 0, width: '100%', position: 'relative',
                border: 4,
                borderColor: colors.defaultIcon,
            }}>
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor: fontColor.bodyHeaders,
                        color: 'white',
                        p: 1,
                        width: '30%',
                        borderRadius: 2,
                        left: { xs: 10, sm: 10 },
                        top: 10,
                        zIndex: 7,

                    }}
                >
                    {selectedMapPoint === undefined ? <Typography sx={{ fontWeight: 600,  whiteSpace: 'pre-line'}} variant="body1"> {mapDefaultText} </Typography> :
                        <>
                            <Typography sx={{ fontWeight: 600 }} variant="body1"> {selectedMapPoint.who} </Typography>
                            <Link
                                color="inherit"
                                href={createGoogleMapLink(selectedMapPoint.address)}
                                target="_blank">
                                <Typography variant="body1"> {selectedMapPoint.address} </Typography>
                            </Link>
                            <Typography sx={{ pt: 1 }} variant="body1">{content.mapZoom} </Typography>


                        </>
                    }
                </Box>
                <>
                    <Map height={290} defaultCenter={[42.316477834989165, -83.1077980407536]} defaultZoom={12}>
                        {mapPoints.map((org) => {
                            if (org.coordinates !== 'Unknown') {
                                const coords = JSON.parse(org.coordinates)
                                const color = isALocationSelected
                                    && org.who !== selectedMapPoint.who ? colors.defaultIcon : colors.secondaryIconsSelected
                                return (<Marker color={color} key={org.who} width={45} anchor={coords} onClick={handleMarkerClick(org)} />)
                            }
                        })}
                    </Map>
                </>
            </Container>
        </Box>
    )
}
