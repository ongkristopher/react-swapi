// material-ui
import { Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// ==============================|| DETAIL ERROR CARD ||============================== //

const DetailErrorCardWrapper = styled(MainCard)(({ theme, icon }) => ({
    backgroundColor: theme.palette.error.main,
    width: '100%',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.error.dark,
        borderRadius: '50%',
        backgroundImage: `url(${icon})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        top: -85,
        right: -100,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    }
}));

const DetailErrorCard = ({ iconSvg, error }) => {
    const theme = useTheme();

    return (
        <DetailErrorCardWrapper icon={iconSvg}>
            <Grid item>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, wordWrap: 'anywhere' }}>
                            {error.message}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        wordWrap: 'anywhere',
                        color: theme.palette.grey[200],
                        'z-index': 1,
                        position: 'relative'
                    }}
                >
                    {error.request_url}
                </Typography>
            </Grid>
        </DetailErrorCardWrapper>
    );
};

DetailErrorCard.propTypes = {
    iconSvg: PropTypes.string,
    error: PropTypes.object
};

export default DetailErrorCard;
