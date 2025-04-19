import { Routes } from '@angular/router';
import { LecionarioComponent } from './components/lecionario/lecionario.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { animation: 'home' } },
    { path: 'lecionario', component: LecionarioComponent, data: { animation: 'lecionario' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];