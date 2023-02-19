import { Routes } from '@angular/router';

export default [
    {
        loadChildren: () => import('./pages/home/home.routing'),
        path: '',
    },
    {
        loadChildren: () => import('./pages/admin/admin.routing'),
        path: 'admin',
    },
] as Routes;
