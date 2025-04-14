import { colors } from "../../globalConstants"

export const tableSortIconStyles =
{
    '& .MuiTableSortLabel-icon': {
        color: 'white',
        backgroundColor: colors.navBar, // Change this to your desired background color
        borderRadius: 3, // Optional: for rounded corners
        padding: '2px', // Optional: add some spacing around the arrow
    },
    '&.Mui-active .MuiTableSortLabel-icon': {
        color: 'white', // Color when active
    },
}

export const tableCellStyles = {
    p:0.2, px:2
}
