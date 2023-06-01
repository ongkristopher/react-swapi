import { useEffect } from 'react';
// material-ui
import { useParams } from 'react-router-dom';
// project imports
import { Box, Container, Stack, Typography } from '@mui/material';
import { getTranslation } from 'lib/getTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanet } from 'store/planets/planetSlice';
import { BackToListButton, DetailTable, FilmsDetailsCard, ResidentsDetailsCard, SkeletonItemCard } from 'ui-component';
// ==============================|| PEOPLE DETAIL PAGE ||============================== //

const Planet = () => {
    const planet = useSelector((state) => state.planetSlice);
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const planetParam = useParams();
    const parentPage = '/planets';

    useEffect(() => {
        dispatch(fetchPlanet({ id: planetParam.id, isWookiee: customization.useWookiee }));
    }, [customization.useWookiee, dispatch, planetParam.id]);

    return (
        <>
            {planet.loading ? (
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
                            {planet.data[getTranslation('name', customization.useWookiee)]}
                        </Typography>
                        <DetailTable details={planet.data} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('residents', customization.useWookiee)}
                        </Typography>
                        <ResidentsDetailsCard entity={planet} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('films', customization.useWookiee)}
                        </Typography>
                        <FilmsDetailsCard entity={planet} isWookiee={customization.useWookiee} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default Planet;
