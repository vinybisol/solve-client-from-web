import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'register', loadComponent: () => import("./pages/register/register.component").then(m => m.RegisterComponent)
    },
    {
        path: '**', redirectTo: 'home'
    }
];
