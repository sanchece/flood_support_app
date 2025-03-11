
import { colors } from '../../globalConstants'

export const mainCatIcons = (selectedCategory) => {
    return {
        border: selectedCategory ? 3 : 0,
        borderColor: selectedCategory ? colors.selectedIconBorder : '',
        borderRadius: 3,
        height: '5rem',
        p: 3,
        textTransform: 'none',

        width: '5rem',
        color: 'black',
        backgroundColor: selectedCategory ? colors.selectedIcon : colors.defaultIcon,

    }
}