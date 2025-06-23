import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'repair-orders',
    loadChildren: () => import('./modules/repair-orders/repair-orders.module').then(m => m.RepairOrdersModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
