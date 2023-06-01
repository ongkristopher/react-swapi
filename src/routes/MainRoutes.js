import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// page routing
const Films = Loadable(lazy(() => import('views/pages/films/Films')));
const Film = Loadable(lazy(() => import('views/pages/films/Film')));
const People = Loadable(lazy(() => import('views/pages/people/People')));
const Person = Loadable(lazy(() => import('views/pages/people/Person')));
const Planet = Loadable(lazy(() => import('views/pages/planets/Planet')));
const Planets = Loadable(lazy(() => import('views/pages/planets/Planets')));
const SpecificSpecies = Loadable(lazy(() => import('views/pages/species/SpecificSpecies')));
const Species = Loadable(lazy(() => import('views/pages/species/Species')));
const Starship = Loadable(lazy(() => import('views/pages/starships/Starship')));
const Starships = Loadable(lazy(() => import('views/pages/starships/Starships')));
const Vehicle = Loadable(lazy(() => import('views/pages/vehicles/Vehicle')));
const Vehicles = Loadable(lazy(() => import('views/pages/vehicles/Vehicles')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'films',
            element: <Films />
        },
        {
            path: 'films/:id',
            element: <Film />
        },
        {
            path: 'people',
            element: <People />
        },
        {
            path: 'people/:id',
            element: <Person />
        },
        {
            path: 'planets',
            element: <Planets />
        },
        {
            path: 'planets/:id',
            element: <Planet />
        },
        {
            path: 'species',
            element: <Species />
        },
        {
            path: 'species/:id',
            element: <SpecificSpecies />
        },
        {
            path: 'starships',
            element: <Starships />
        },
        {
            path: 'starships/:id',
            element: <Starship />
        },
        {
            path: 'vehicles',
            element: <Vehicles />
        },
        {
            path: 'vehicles/:id',
            element: <Vehicle />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        }
    ]
};

export default MainRoutes;
