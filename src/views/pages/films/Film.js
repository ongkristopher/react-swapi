import { useEffect } from 'react';
// material-ui
import { useParams } from 'react-router-dom';
// project imports
import { Box, Container, Stack, Typography } from '@mui/material';
import { dateFormatToString } from 'lib/dateFormatToString';
import { getTranslation } from 'lib/getTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilm } from 'store/films/filmSlice';
import {
    BackToListButton,
    CharactersDetailsCard,
    PlanetsDetailsCard,
    SkeletonItemCard,
    SpeciesDetailsCard,
    StarshipsDetailsCard,
    VehiclesDetailsCard
} from 'ui-component';
// ==============================|| FILM DETAIL PAGE ||============================== //

const Film = () => {
    const film = useSelector((state) => state.filmSlice);
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const filmParam = useParams();
    const parentPage = '/films';

    useEffect(() => {
        dispatch(fetchFilm({ id: filmParam.id, isWookiee: customization.useWookiee }));
    }, [customization.useWookiee, dispatch, filmParam.id]);

    return (
        <>
            {film.loading ? (
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
                            {film.data[getTranslation('title', customization.useWookiee)]}
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="text.primary">
                            Released Date: {dateFormatToString(film.data[getTranslation('release_date', customization.useWookiee)])}
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="text.primary">
                            Directed by: {film.data[getTranslation('director', customization.useWookiee)]}
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="text.primary">
                            Produced by: {film.data[getTranslation('producer', customization.useWookiee)]}
                        </Typography>

                        <Typography sx={{ pt: 4 }} variant="h5" align="center" color="text.secondary" paragraph>
                            {film.data[getTranslation('opening_crawl', customization.useWookiee)]}
                        </Typography>
                    </Container>

                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('characters', customization.useWookiee)}
                        </Typography>
                        <CharactersDetailsCard entity={film} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('planets', customization.useWookiee)}
                        </Typography>
                        <PlanetsDetailsCard entity={film} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('starships', customization.useWookiee)}
                        </Typography>
                        <StarshipsDetailsCard entity={film} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('vehicles', customization.useWookiee)}
                        </Typography>
                        <VehiclesDetailsCard entity={film} isWookiee={customization.useWookiee} />
                    </Container>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="text.primary" gutterBottom>
                            {getTranslation('species', customization.useWookiee)}
                        </Typography>
                        <SpeciesDetailsCard entity={film} isWookiee={customization.useWookiee} />
                    </Container>
                </Box>
            )}
        </>
    );
};

export default Film;
