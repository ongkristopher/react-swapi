import { useEffect } from 'react';
// material-ui
import { useParams } from 'react-router-dom';
// project imports
import { Box, Container, Stack, Typography } from '@mui/material';
import { getTranslation } from 'lib/getTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificSpecies } from 'store/species/specificSpeciesSlice';
import { BackToListButton, DetailTable, FilmsDetailsCard, HomeworldDetailsCard, PeoplesDetailsCard, SkeletonItemCard } from 'ui-component';
// ==============================|| SPECIFIC SPECIES DETAIL PAGE ||============================== //

const SpecificSpecies = () => {
    const specificSpecies = useSelector((state) => state.specificSpeciesSlice);
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const specificSpeciesParam = useParams();
    const parentPage = '/species';

    useEffect(() => {
        dispatch(fetchSpecificSpecies({ id: specificSpeciesParam.id, isWookiee: customization.useWookiee }));
    }, [customization.useWookiee, dispatch, specificSpeciesParam.id]);

    return (
        <>
            {specificSpecies.loading ? (
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
                            {specificSpecies.data[getTranslation('name', customization.useWookiee)]}
                        </Typography>
                        <DetailTable details={specificSpecies.data} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('homeworld', customization.useWookiee)}
                        </Typography>
                        <HomeworldDetailsCard entity={specificSpecies} isWookiee={customization.useWookiee} />
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('people', customization.useWookiee)}
                        </Typography>
                        <PeoplesDetailsCard entity={specificSpecies} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('films', customization.useWookiee)}
                        </Typography>
                        <FilmsDetailsCard entity={specificSpecies} isWookiee={customization.useWookiee} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default SpecificSpecies;
