import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StudentComponent} from "./student/student.component";
import { DefaultComponent} from "./default/default.component";
import {CollegeComponent} from "./college/college.component";
import{StaffComponent} from "./staff/staff.component";
import{ClgRegisterComponent} from "./college/clg-register/clg-register.component";
import{StudRegisterComponent} from "./student/stud-register/stud-register.component";
import {StaffRegisterComponent} from "./staff/staff-register/staff-register.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AdminLoginComponent} from "./Admin/admin-login/admin-login.component";
import {DashboardComponent} from "./Admin/dashboard/dashboard.component";
// import {LoginHeaderComponent} from "./login-header/login-header.component";
import {StaffregisterService} from "./shared/staff/staffregister.service";
import {StdregisterService} from './shared/student/stdregister.service';

const routes: Routes = [
  //main login path
  {path:'',component: DefaultComponent},
  {path:'student',component:StudentComponent},
  {path:'college',component:CollegeComponent},
  {path:'staff',component:StaffComponent},
  
  // forgot password paths
  {path:'student/forgot',component:CollegeComponent},
  {path:'college/forgot',component:CollegeComponent},
  {path:'staff/forgot',component:CollegeComponent},

  //register paths
  {path:'college/register',component:ClgRegisterComponent},
  {path:'student/register',component:StudRegisterComponent},
  {path:'staff/register',component:StaffRegisterComponent},

  //Home page routes
  {path:'home',component:HomePageComponent},

  //Admin Page
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/dashboard',component:DashboardComponent}

];

@NgModule({
  providers:[StaffregisterService,StdregisterService],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
