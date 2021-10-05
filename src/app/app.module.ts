import { AutoLogoutService } from './services/auto-logout.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BackButtonDisableModule } from 'angular-disable-browser-back-button'
import { DataTablesModule } from "angular-datatables";

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
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

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
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ErrorComponent } from './pages/error/error.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AgencyDetailsComponent } from './components/container/modals/agency-details/agency-details.component';
import { DeleteConfirmationComponent } from './components/shared/modals/delete-confirmation/delete-confirmation.component';
import { ErrorModalComponent } from './components/shared/modals/error-modal/error-modal.component';
import { AgencyAddComponent } from './components/container/modals/agency-add/agency-add.component';
import { UserAddComponent } from './components/container/user-add/user-add.component';
import { AgencySelectListComponent } from './components/container/agency-select-list/agency-select-list.component';
import { CompanySelectListComponent } from './components/container/company-select-list/company-select-list.component';
import { VehicleActionComponent } from './components/container/modals/vehicle-action/vehicle-action.component';
import { CompanyActionComponent } from './components/container/modals/company-action/company-action.component';
import { PricingComponent } from './pages/pricing/pricing.component';

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
    ReservationComponent,
    ErrorComponent,
    BookingComponent,
    AgencyDetailsComponent,
    DeleteConfirmationComponent,
    ErrorModalComponent,
    AgencyAddComponent,
    UserAddComponent,
    AgencySelectListComponent,
    CompanySelectListComponent,
    VehicleActionComponent,
    CompanyActionComponent,
    PricingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSlideToggleModule,
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
