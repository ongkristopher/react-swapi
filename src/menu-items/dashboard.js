// assets
import { IconHome2 } from '@tabler/icons';

// constant
const icons = { IconHome2 };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconHome2,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
