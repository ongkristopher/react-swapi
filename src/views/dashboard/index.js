import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

import car from 'assets/images/car.svg';
import cell from 'assets/images/cell.svg';
import movie from 'assets/images/movie.svg';
import planetIcon from 'assets/images/planet.svg';
import ufo from 'assets/images/ufo.svg';
import users from 'assets/images/users.svg';
import CountCard from 'ui-component/cards/CountCard';

import swapi_logo from 'assets/images/swapi_logo.png';
import { convertToTitleCase } from 'lib/convertToTitleCase';
import { getTranslation } from 'lib/getTranslation';
import { fetchFilmsCount } from 'store/films/filmsCountSlice';
import { fetchPeopleCount } from 'store/people/peopleCountSlice';
import { fetchPlanetsCount } from 'store/planets/planetsCountSlice';
import { fetchSpeciesCount } from 'store/species/speciesCountSlice';
import { fetchStarshipsCount } from 'store/starships/starshipsCountSlice';
import { fetchVehiclesCount } from 'store/vehicles/vehiclesCountSlice';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const dispatch = useDispatch();
    const filmsCount = useSelector((state) => state.filmsCountSlice);
    const peopleCount = useSelector((state) => state.peopleCountSlice);
    const planetsCount = useSelector((state) => state.planetsCountSlice);
    const speciesCount = useSelector((state) => state.speciesCountSlice);
    const starshipsCount = useSelector((state) => state.starshipsCountSlice);
    const vehiclesCount = useSelector((state) => state.vehiclesCountSlice);
    const customization = useSelector((state) => state.customization);
    useEffect(() => {
        dispatch(fetchFilmsCount());
        dispatch(fetchPeopleCount());
        dispatch(fetchPlanetsCount());
        dispatch(fetchSpeciesCount());
        dispatch(fetchStarshipsCount());
        dispatch(fetchVehiclesCount());
    }, [dispatch]);

    return (
        <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid container justifyContent="center" alignItems="center">
                        <img src={swapi_logo} alt="Star Wars Logo" width="30%"></img>
                        <Grid item container justifyContent="center" alignItems="center">
                            <Typography variant="h1" align="center">
                                by the numbers
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={6}>
                        <CountCard
                            isLoading={filmsCount.loading}
                            value={filmsCount.count}
                            label={convertToTitleCase(getTranslation('films', customization.useWookiee))}
                            icon={movie}
                            entity="films"
                        />
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={6}>
                        <CountCard
                            isLoading={peopleCount.loading}
                            value={peopleCount.count}
                            label={convertToTitleCase(getTranslation('people', customization.useWookiee))}
                            icon={users}
                            entity="people"
                        />
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={6}>
                        <CountCard
                            isLoading={planetsCount.loading}
                            value={planetsCount.count}
                            label={convertToTitleCase(getTranslation('planets', customization.useWookiee))}
                            icon={planetIcon}
                            entity="planets"
                        />
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={6}>
                        <CountCard
                            isLoading={speciesCount.loading}
                            value={speciesCount.count}
                            label={convertToTitleCase(getTranslation('species', customization.useWookiee))}
                            icon={cell}
                            entity="species"
                        />
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={6}>
                        <CountCard
                            isLoading={starshipsCount.loading}
                            value={starshipsCount.count}
                            label={convertToTitleCase(getTranslation('starships', customization.useWookiee))}
                            icon={ufo}
                            entity="starships"
                        />
                    </Grid>
                    <Grid item lg={2} md={6} sm={6} xs={6}>
                        <CountCard
                            isLoading={vehiclesCount.loading}
                            value={vehiclesCount.count}
                            label={convertToTitleCase(getTranslation('vehicles', customization.useWookiee))}
                            icon={car}
                            entity="vehicles"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
