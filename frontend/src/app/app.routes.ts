import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MusicianViewComponent } from './pages/musician-view/musician-view.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpaceViewComponent } from './pages/space-view/space-view.component';
import { GroupViewComponent } from './pages/musician-view/group-view/group-view.component';
import { CreateGroupFormComponent } from './pages/musician-view/create-group-form/create-group-form.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'musician', component: MusicianViewComponent },
    { path: 'venue', component: SpaceViewComponent },
    { path: 'create-group', component: CreateGroupFormComponent },
    { path: 'group', component: GroupViewComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }

];
