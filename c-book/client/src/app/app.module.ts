import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { from } from 'rxjs';
import { CollegeComponent } from './college/college.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { StaffComponent } from './staff/staff.component';
import { ClgRegisterComponent } from './college/clg-register/clg-register.component';
import { StaffRegisterComponent } from './staff/staff-register/staff-register.component';
import { StudRegisterComponent } from './student/stud-register/stud-register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {OwlModule} from 'ngx-owl-carousel';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    CollegeComponent,
    DefaultComponent,
    HeaderComponent,
    StaffComponent,
    ClgRegisterComponent,
    StaffRegisterComponent,
    StudRegisterComponent,
    HomePageComponent,
    LoginHeaderComponent,
    AdminLoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OwlModule,
    BrowserAnimationsModule,
	ToastrModule.forRoot({positionClass: 'toast-top-right',})
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
