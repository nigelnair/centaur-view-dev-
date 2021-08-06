import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCarouselModule } from 'ngx-carousel';
// import { DatePipe } from '@angular/common';
// import { SmartTableModule } from 'smart-table-ng';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from './authentication/auth.guard';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { LayoutComponent } from './layout/layout.component';
import { ServicesComponent } from './services/services.component';
import { ProfileComponent } from './profile/profile.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    SidebarComponent,
    // LayoutComponent,
    ServicesComponent,
    ProfileComponent
    // SmartTable  

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTooltipModule,
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot({
        progressBar:true, 
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
    }),
    NgxCarouselModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    // SmartTableModule
    Ng2SmartTableModule

  ],
  providers: [AuthGuard,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
