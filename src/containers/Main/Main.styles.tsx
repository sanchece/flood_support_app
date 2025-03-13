import { fontColor, colors } from "../../globalConstants"

export const mainContainerStyles = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'flex-start',
    mt: 5,
    p: { xs: 0, md: 'inherit' },
}

export const pieChartWrapperStyles =
{
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    alignItems: 'center',
    m: { xs: 0, md: 2 },
}

export const headerWrapperStyles =
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

export const headerButtonStyles = (selectedState) => {
    return {
        '&:hover': {
            backgroundColor: '#36454F',
            color: 'white',
        },
        textTransform: 'none',
        justifyContent: 'flex-start',
        py: 0,
        px: 4,
        backgroundColor: selectedState ? colors.bodyButton1 : colors.bodyButton2,
        border: selectedState ? 3 : 1,
        borderColor: selectedState ? colors.bodyButton1Border : colors.bodyButton2Border,
        color: fontColor.buttons,
        height: '6rem',
        width: '90%',
        display: 'flex',
        borderRadius: 6,
    }
}

export const tableWrapperStyles =
{
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    m: { xs: 0, md: 2 },
    pb: 4, pt: 3,
}

export const mainButtonStyling = (selectedState) => {
    return {
        opacity: 0.65,
        ml: 4,
        fontWeight: selectedState ? 600 : 400
    }
}
