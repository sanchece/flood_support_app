
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
    width: '90%',
    height: '6rem'

}
export const resourceSelectionContainer =
{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
}
