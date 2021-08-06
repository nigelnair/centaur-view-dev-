import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { ProfileComponent } from './profile/profile.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth.guard';


const routes: Routes = [

	{
		path:'',
		component: LoginComponent
	},
	{
		path:'logout',
		component: LogoutComponent
	},
	{
		path:'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path:'services',
		component: ServicesComponent,
		canActivate: [AuthGuard]
	},
	{
		path:'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
