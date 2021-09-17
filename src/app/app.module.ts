import { AutoLogoutService } from './services/auto-logout.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BackButtonDisableModule } from 'angular-disable-browser-back-button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeadBarComponent } from './components/shared/head-bar/head-bar.component';
import { SideMenuComponent } from './components/shared/side-menu/side-menu.component';
import { CoreComponent } from './components/container/core/core.component';
import { CityComponent } from './pages/city/city.component';
import { AgencyComponent } from './pages/agency/agency.component';
import { CompanyComponent } from './pages/company/company.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { ReservationComponent } from './pages/reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideMenuComponent,
    HeadBarComponent,
    CoreComponent,
    CityComponent,
    AgencyComponent,
    CompanyComponent,
    ItineraryComponent,
    VehicleComponent,
    AssignmentComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    BackButtonDisableModule.forRoot({ preserveScrollPosition: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: AutoLogoutService) => function () { return service.reset() },
      deps: [AutoLogoutService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
