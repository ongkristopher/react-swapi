// assets
import { IconCar, IconCell, IconMovie, IconPlanet, IconUfo, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconMovie,
    IconUsers,
    IconPlanet,
    IconCell,
    IconUfo,
    IconCar
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    children: [
        {
            id: 'pages-films',
            title: 'Films',
            type: 'item',
            url: '/films',
            icon: icons.IconMovie,
            breadcrumbs: false
        },
        {
            id: 'pages-people',
            title: 'People',
            type: 'item',
            url: '/people',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'pages-planet',
            title: 'Planets',
            type: 'item',
            url: '/planets',
            icon: icons.IconPlanet,
            breadcrumbs: false
        },
        {
            id: 'pages-species',
            title: 'Species',
            type: 'item',
            icon: icons.IconCell,
            url: '/species',
            breadcrumbs: false
        },
        {
            id: 'pages-starships',
            title: 'Starships',
            type: 'item',
            icon: icons.IconUfo,
            url: '/starships',
            breadcrumbs: false
        },
        {
            id: 'pages-vehicles',
            title: 'Vehicles',
            type: 'item',
            icon: icons.IconCar,
            url: '/vehicles',
            breadcrumbs: false
        }
    ]
};

export default pages;
