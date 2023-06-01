import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import MainCard from './MainCard';
import SkeletonDashboardCard from './Skeleton/DashboardCard';

const CardWrapper = styled(MainCard)(({ theme, icon, entity }) => ({
    boxShadow: true,
    backgroundColor: theme.palette.entities[entity].main,
    width: '100%',
    color: theme.palette.entities[entity].text,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.entities[entity].bg,
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

// ===========================|| DASHBOARD DEFAULT - COUNT CARD ||=========================== //

const CountCard = ({ isLoading, label, value, icon, entity }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonDashboardCard />
            ) : (
                <CardWrapper border={false} content={false} icon={icon} entity={entity}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid
                            container
                            direction="column"
                            sx={{
                                'z-index': 1,
                                position: 'relative'
                            }}
                        >
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {value}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.entities[entity].subtext
                                    }}
                                >
                                    {label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

CountCard.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.number,
    icon: PropTypes.string,
    entity: PropTypes.string
};

export default CountCard;
