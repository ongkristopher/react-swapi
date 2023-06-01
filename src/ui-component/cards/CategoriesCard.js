import PropTypes from 'prop-types';
// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project imports
import ItemCard from './ItemCard';

const CategoriesCard = ({ iconSvg, title, descLabel1, descValue1, descLabel2, descValue2, viewMore, entity }) => {
    const theme = useTheme();
    return (
        <ItemCard iconSvg={iconSvg} viewMore={viewMore} entity={entity}>
            <Grid item>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, wordWrap: 'anywhere' }}>
                            {title}
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
                        color: theme.palette.entities[entity].subtext
                    }}
                >
                    {descLabel1}: {descValue1}
                </Typography>
            </Grid>

            {descLabel2 && descValue2 && (
                <Grid item sx={{ mb: 1.25 }}>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            wordWrap: 'anywhere',
                            color: theme.palette.entities[entity].subtext
                        }}
                    >
                        {descLabel2}: {descValue2}
                    </Typography>
                </Grid>
            )}
        </ItemCard>
    );
};

CategoriesCard.propTypes = {
    title: PropTypes.string,
    descLabel1: PropTypes.string,
    descValue1: PropTypes.string,
    descLabel2: PropTypes.string,
    descValue2: PropTypes.string,
    iconSvg: PropTypes.string,
    viewMore: PropTypes.string,
    entity: PropTypes.string
};

export default CategoriesCard;
