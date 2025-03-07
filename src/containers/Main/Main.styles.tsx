
export const mainContainerStyles = {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'flex-start',
    mt: 5,
    p: { xs: 0, md: 'inherit' }
}

export const pieChartWrapperStyles =
{
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'flex-start',
    m: { xs: 0, md: 2 },
}

export const headerWrapperStyles =
{
    alignContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    ml: { xs: 2, lg: 0 },
}

export const headerNoneButtonStyles =
{
    p: 1,
    pl: 0,
    m: 0,
    mt: 0,
    fontWeight: '600'
}

export const headerButtonStyles = {
    '&:hover': {
        backgroundColor: '#36454F',
        color: 'white',
    },
    textTransform: 'none',
    justifyContent: 'center',
    p: 0,
    color: 'white',
    backgroundColor: 'black',
    height: '3rem',
    width: '9rem',

}

export const tableWrapperStyles =
{
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    m: { xs: 1, md: 2 },
    pb: 4, pt: 3,

}
