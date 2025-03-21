
import { colors } from '../../globalConstants'

export const mainCatIcons = (selectedCategory) => {
    return {
        border: selectedCategory ? 3 : 0,
        borderColor: selectedCategory ? colors.selectedIconBorder : '',
        borderRadius: 3,
        height: '4.8rem',
        p: 3,
        textTransform: 'none',
        mx: .2,
        width: '4.8rem',
        color: 'black',
        backgroundColor: selectedCategory ? colors.selectedIcon : colors.defaultIcon,
        display: 'flex',
        flexDirection: 'column'
    }
}

export const mainCatIconsContainer =
{
    display: 'flex',
    flexDirection: 'row',
    width: { xs:'90%', sm: 'auto'},
    mb:1,
}

export const resourceSelectionContainer =
{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
}

export const subCatIconsContainer =
{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
}

export const subCatSelection = (selectedSubCategory) => {
    return {
        px: 1,
        py: .5,
        textTransform: 'none',
        mx: .2,
        my: .2,
        color: 'black',
        backgroundColor: selectedSubCategory ? colors.selectedIconBorder : colors.selectedIcon,
        display: 'flex',
        borderRadius: 3,
    }
}
