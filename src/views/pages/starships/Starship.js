import { useEffect } from 'react';
// material-ui
import { useParams } from 'react-router-dom';
// project imports
import { Box, Container, Stack, Typography } from '@mui/material';
import { getTranslation } from 'lib/getTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStarship } from 'store/starships/starshipSlice';
import { BackToListButton, DetailTable, FilmsDetailsCard, PilotsDetailsCard, SkeletonItemCard } from 'ui-component';
// ==============================|| SPECIFIC SPECIES DETAIL PAGE ||============================== //

const Starship = () => {
    const starship = useSelector((state) => state.starshipSlice);
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const starshipParam = useParams();
    const parentPage = '/starships';

    useEffect(() => {
        dispatch(fetchStarship({ id: starshipParam.id, isWookiee: customization.useWookiee }));
    }, [customization.useWookiee, dispatch, starshipParam.id]);

    return (
        <>
            {starship.loading ? (
                <SkeletonItemCard />
            ) : (
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 1,
                        pb: 6
                    }}
                >
                    <Stack sx={{ pt: 1, pl: 1 }} direction="row">
                        <BackToListButton parentPage={parentPage} />
                    </Stack>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h1" align="center" color="text.primary" gutterBottom>
                            {starship.data[getTranslation('name', customization.useWookiee)]}
                        </Typography>
                        <DetailTable details={starship.data} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('pilots', customization.useWookiee)}
                        </Typography>
                        <PilotsDetailsCard entity={starship} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('films', customization.useWookiee)}
                        </Typography>
                        <FilmsDetailsCard entity={starship} isWookiee={customization.useWookiee} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default Starship;
