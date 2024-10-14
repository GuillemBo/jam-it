import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MusicianViewComponent } from './pages/musician-view/musician-view.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpaceViewComponent } from './pages/space-view/space-view.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'musician', component: MusicianViewComponent },
    { path: 'venue', component: SpaceViewComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }

];
