import { createMuiTheme } from '@material-ui/core/styles';

const appTheme = createMuiTheme({
    typography: {
        allVariants: {
            fontFamily: 'Montserrat, sans-serif'
        }
    },
    palette: {
        background: {
            default: '#FCFCFC',
            paper: '#FFFFFF'
        }
    }
});

export default appTheme;
