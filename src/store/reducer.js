import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import filmsCountSlice from './films/filmsCountSlice';
import filmSlice from './films/filmSlice';
import filmsSlice from './films/filmsSlice';
import searchFilmSlice from './films/searchFilmsSlice';
import peopleCountSlice from './people/peopleCountSlice';
import peopleSlice from './people/peopleSlice';
import personSlice from './people/personSlice';
import searchPeopleSlice from './people/searchPeopleSlice';
import planetsCountSlice from './planets/planetsCountSlice';
import planetSlice from './planets/planetSlice';
import planetsSlice from './planets/planetsSlice';
import searchPlanetsSlice from './planets/searchPlanetsSlice';
import searchSpeciesSlice from './species/searchSpeciesSlice';
import speciesCountSlice from './species/speciesCountSlice';
import speciesSlice from './species/speciesSlice';
import specificSpeciesSlice from './species/specificSpeciesSlice';
import searchStarshipsSlice from './starships/searchStarshipsSlice';
import starshipsCountSlice from './starships/starshipsCountSlice';
import starshipSlice from './starships/starshipSlice';
import starshipsSlice from './starships/starshipsSlice';
import searchVehiclesSlice from './vehicles/searchVehiclesSlice';
import vehiclesCountSlice from './vehicles/vehiclesCountSlice';
import vehicleSlice from './vehicles/vehicleSlice';
import vehiclesSlice from './vehicles/vehiclesSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    filmsSlice: filmsSlice.reducer,
    filmSlice: filmSlice.reducer,
    peopleSlice: peopleSlice.reducer,
    personSlice: personSlice.reducer,
    planetsSlice: planetsSlice.reducer,
    planetSlice: planetSlice.reducer,
    specificSpeciesSlice: specificSpeciesSlice.reducer,
    speciesSlice: speciesSlice.reducer,
    starshipSlice: starshipSlice.reducer,
    starshipsSlice: starshipsSlice.reducer,
    vehicleSlice: vehicleSlice.reducer,
    vehiclesSlice: vehiclesSlice.reducer,
    searchFilmSlice,
    searchPeopleSlice,
    searchPlanetsSlice,
    searchSpeciesSlice,
    searchStarshipsSlice,
    searchVehiclesSlice,
    filmsCountSlice: filmsCountSlice.reducer,
    peopleCountSlice: peopleCountSlice.reducer,
    planetsCountSlice: planetsCountSlice.reducer,
    speciesCountSlice: speciesCountSlice.reducer,
    starshipsCountSlice: starshipsCountSlice.reducer,
    vehiclesCountSlice: vehiclesCountSlice.reducer
});

export default reducer;
