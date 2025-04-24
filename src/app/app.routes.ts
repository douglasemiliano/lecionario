import { Routes } from '@angular/router';
import { LecionarioComponent } from './components/lecionario/lecionario.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroLecionarioComponent } from './components/cadastro-lecionario/cadastro-lecionario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ListarLecionarioComponent } from './components/listar-lecionario/listar-lecionario.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { animation: 'home' } },
    { path: 'lecionario', component: LecionarioComponent, data: { animation: 'lecionario' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "cadastro", component: CadastroLecionarioComponent, canActivate: [AuthGuard]},
    { path: "login", component: LoginComponent},
    { path: "listar-lecionario", component: ListarLecionarioComponent, canActivate: [AuthGuard]},
  ];