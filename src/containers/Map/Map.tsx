import {
    Button,
    Box,
    Container,
    Typography,
    Link,
} from "@mui/material";
import { Map, Marker } from "pigeon-maps"
import { fontColor } from '../../globalConstants'

import { createGoogleMapLink, filterData } from '../../globalHelpers'


export const CustomMap = ({
    content,
    selectedMapPoint,
    setSelectedMapPoint,
    selectedTableData,
    setSelectedSubCategory,
    setSelectedCategory
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
    const selectedTableDataOrgs = filterData(selectedTableData, 'who')
    return (
        <Container disableGutters sx={{ p: 0, mt: 6, width: '100%', position: 'relative' }}>
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
                {selectedMapPoint === undefined ? <Typography sx={{ fontWeight: 600 }} variant="body1"> {mapDefaultText} Double tap to zoom in.</Typography> :
                    <>
                        <Typography sx={{ fontWeight: 600 }} variant="body1"> {selectedMapPoint.who} </Typography>
                        <Link
                            color="inherit"
                            href={createGoogleMapLink(selectedMapPoint)}
                            target="_blank">
                            <Typography variant="body1"> {selectedMapPoint.address} </Typography>
                        </Link>
                        <Typography sx={{ pt:1 }} variant="body1">{content.mapZoom}
                        </Typography>

                    </>
                }
            </Box>
            <>
                <Map height={300} defaultCenter={[42.316477834989165, -83.1077980407536]} defaultZoom={12}>
                    {selectedTableDataOrgs.map((org) => {
                        if (org.coordinates !== 'Unknown') {
                            const coords = JSON.parse(org.coordinates)
                            return (<Marker color={"green"} key={org.who} width={45} anchor={coords} onClick={handleMarkerClick(org)} />)
                        }
                    })}
                </Map>
            </>
        </Container>
    )
}
