import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const NoDataCard = ({ dataSlice }) => {
    return dataSlice ? (
        <Typography component="h4" variant="h4" align="center" color="error" gutterBottom>
            No Data found for query: &apos;{dataSlice.query}&apos;
        </Typography>
    ) : (
        <Typography component="h4" variant="h4" align="center" color="error" gutterBottom>
            No Data
        </Typography>
    );
};

NoDataCard.propTypes = {
    dataSlice: PropTypes.object
};

export default NoDataCard;
