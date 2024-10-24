import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(routes, withComponentInputBinding()),
      provideAnimations(), 
      provideToastr(), 
    ],
  }).catch((err) => console.error(err));
  