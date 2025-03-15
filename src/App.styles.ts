import { SxProps } from '@mui/material';
import { colors} from './globalConstants'
import { createTheme } from '@mui/material/styles';

export const appWrapperStyles: SxProps = {
  width: '100%',
  backgroundColor: colors.bodyBackground,
};

export const graftLivingStudiosTheme = createTheme({
  typography: {
    fontFamily:'Montserrat',
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 16
    },
    body1: {
      fontSize: 12,
      fontFamily: 'Open Sans',

    },
    body2: {
      fontSize: 10,
      fontFamily: 'Open Sans',
    },
  }
});
