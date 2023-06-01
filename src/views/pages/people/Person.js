import { useEffect } from 'react';
// material-ui
import { useParams } from 'react-router-dom';
// project imports
import { Box, Container, Stack, Typography } from '@mui/material';
import { getTranslation } from 'lib/getTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerson } from 'store/people/personSlice';
import {
    BackToListButton,
    DetailTable,
    FilmsDetailsCard,
    HomeworldDetailsCard,
    SkeletonItemCard,
    SpeciesDetailsCard,
    StarshipsDetailsCard,
    VehiclesDetailsCard
} from 'ui-component';
// ==============================|| PEOPLE DETAIL PAGE ||============================== //

const Person = () => {
    const person = useSelector((state) => state.personSlice);
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const personParam = useParams();
    const parentPage = `/people`;

    useEffect(() => {
        dispatch(fetchPerson({ id: personParam.id, isWookiee: customization.useWookiee }));
    }, [customization.useWookiee, dispatch, personParam.id]);

    return (
        <>
            {person.loading ? (
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
                            {person.data[getTranslation('name', customization.useWookiee)]}
                        </Typography>
                        <Container maxWidth="md">
                            <DetailTable details={person.data} isWookiee={customization.useWookiee} />
                        </Container>
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('homeworld', customization.useWookiee)}
                        </Typography>
                        <HomeworldDetailsCard entity={person} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('films', customization.useWookiee)}
                        </Typography>
                        <FilmsDetailsCard entity={person} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('species', customization.useWookiee)}
                        </Typography>
                        <SpeciesDetailsCard entity={person} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('vehicles', customization.useWookiee)}
                        </Typography>
                        <VehiclesDetailsCard entity={person} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('starships', customization.useWookiee)}
                        </Typography>
                        <StarshipsDetailsCard entity={person} isWookiee={customization.useWookiee} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default Person;
