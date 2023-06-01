import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ErrorCard = ({ value }) => {
    return (
        <Typography component="h4" variant="h4" align="center" color="error" gutterBottom>
            Error: {value}
        </Typography>
    );
};

ErrorCard.propTypes = {
    value: PropTypes.string
};

export default ErrorCard;
