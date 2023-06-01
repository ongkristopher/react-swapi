import PropTypes from 'prop-types';

// material-ui
import { Box, ButtonBase, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// project imports
import MainCard from './MainCard';

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

const ItemCard = ({ children, iconSvg, viewMore, entity }) => {
    return viewMore ? (
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <ButtonBase sx={{ width: '100%' }} disableRipple component={Link} to={viewMore}>
                <CardWrapper boxShadow={true} border={false} content={false} icon={iconSvg} entity={entity}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid
                            container
                            direction="column"
                            sx={{
                                'z-index': 1,
                                position: 'relative'
                            }}
                        >
                            {children}
                        </Grid>
                    </Box>
                </CardWrapper>
            </ButtonBase>
        </Grid>
    ) : (
        <Grid item lg={12} md={12} sm={12} xs={12}>
            <CardWrapper border={false} content={false} icon={iconSvg} entity={entity}>
                <Box sx={{ p: 2.25 }}>
                    <Grid
                        container
                        direction="column"
                        sx={{
                            'z-index': 1,
                            position: 'relative'
                        }}
                    >
                        {children}
                    </Grid>
                </Box>
            </CardWrapper>
        </Grid>
    );
};

ItemCard.propTypes = {
    children: PropTypes.node,
    iconSvg: PropTypes.string,
    viewMore: PropTypes.string,
    entity: PropTypes.string
};

export default ItemCard;
