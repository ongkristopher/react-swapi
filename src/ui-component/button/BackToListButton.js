import { IconButton } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BackToListButton = ({ parentPage }) => {
    return (
        <IconButton aria-label="go back to list" component={Link} to={parentPage}>
            <IconArrowLeft size={30} />
        </IconButton>
    );
};

BackToListButton.propTypes = {
    parentPage: PropTypes.string
};

export default BackToListButton;
