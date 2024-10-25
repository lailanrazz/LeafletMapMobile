import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page'; // Import DashboardPage

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'dashboard',
    component: DashboardPage // Perbaiki 'Page' menjadi 'component'
  },
  {
    path: 'data', // Menambahkan rute untuk DataPage
    loadChildren: () => import('./data/data.module').then(m => m.DataPageModule)
  },
  {
    path: '',
    redirectTo: 'dashboard', // Redirect default route to dashboard
    pathMatch: 'full'
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
