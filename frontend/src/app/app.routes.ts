import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MusicianViewComponent } from './pages/musician-view/musician-view.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'musician', component: MusicianViewComponent },

];
