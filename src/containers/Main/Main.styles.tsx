import { fontColor, colors } from "../../globalConstants"

export const mainContainerStyles = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'flex-start',
    mt: { xs: 4, md: 2 },
    p: { xs: 0, md: 'inherit' },
}

export const pieChartWrapperStyles =
{
    display: 'flex',
    flexDirection: 'column',
    width: {sm:'100%', md:'40%'},
    alignItems: 'center',
    m: { xs: 0, md: 2 },
    p:0
}

export const pheaderWrapperStyles =
{
    display: 'flex',
    flexDirection: 'row',
    ml: { xs: 2, lg: 0 },
}

export const headerNoneButtonStyles =
{
    mx: 4,
    my: 1,
    color: fontColor.bodyHeaders,
}

export const headerIconStyles = (selectedState) => {
    return {
        fontSize: 35,
        color: selectedState ? colors.mainButtonIconSelected : colors.mainButtonIcon,
    }
}

export const headerButtonStyles = (selectedState) => {
    return {
        '&:hover': {
            backgroundColor: colors.bodyButton1,
            color: 'black',
        },
        textTransform: 'none',
        py: 0,
        backgroundColor: selectedState ? colors.bodyButton1 : colors.bodyButton2,
        border: selectedState ? 3 : 1,
        borderColor: selectedState ? colors.bodyButton1Border : colors.bodyButton2Border,
        color: fontColor.buttons,
        height: '6.5rem',
        width: {xs:'6.5rem', md: '15rem'},
        display: 'flex',
        borderRadius: 6,
        flexDirection: 'column',
        mx:2, 
    }
}

export const tableWrapperStyles =
{
    display: 'flex',
    m: 0,
    width: '100%',
    height: {xs:350, md:300},
    border: 3,
    color: colors.bodyBackground,
}

export const mainButtonStyling = (selectedState) => {
    return {
        opacity: 0.65,
        p:1,
        fontWeight: selectedState ? 700 : 400
    }
}
