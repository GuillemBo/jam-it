import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MusicianViewComponent } from './pages/musician-view/musician-view.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpaceViewComponent } from './pages/space-view/space-view.component';
import { GroupViewComponent } from './pages/musician-view/group-view/group-view.component';
import { CreateGroupFormComponent } from './pages/musician-view/create-group-form/create-group-form.component';
import { CreateVenueFormComponent } from './pages/space-view/create-venue-form/create-venue-form.component';
import { VenueViewComponent } from './pages/space-view/venue-view/venue-view.component';
import { CreateEventComponent } from './pages/space-view/create-event/create-event.component';
import { EventViewComponent } from './pages/space-view/event-view/event-view.component';
import { RoutesEnum } from './shared/models/routes.enum';

export const routes: Routes = [

    { path: RoutesEnum.HOME, component: HomeComponent },
    { path: RoutesEnum.MUSICIAN, component: MusicianViewComponent },
    { path: RoutesEnum.VENUE, component: SpaceViewComponent },
    { path: RoutesEnum.CREATEVENUE, component: CreateVenueFormComponent},
    { path: 'venues/edit/:id', component: CreateVenueFormComponent },
    { path: RoutesEnum.VENUEVIEW, component: VenueViewComponent},
    { path: RoutesEnum.CREATEGROUP, component: CreateGroupFormComponent },
    { path: RoutesEnum.CREATEVENT, component: CreateEventComponent },
    { path: RoutesEnum.EVENTVIEW, component: EventViewComponent },
    { path: RoutesEnum.GROUP, component: GroupViewComponent },
    { path: RoutesEnum.LOGIN, component: LoginComponent },
    { path: RoutesEnum.REGISTER, component: RegisterComponent }

];
