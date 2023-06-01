// material-ui
import MuiTypography from '@mui/material/Typography';
import swapi_logo from 'assets/images/swapi_logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    return (
        <>
            <img src={swapi_logo} alt="swapi" width="50" />
            <MuiTypography variant="h1">API</MuiTypography>
        </>
    );
};

export default Logo;
