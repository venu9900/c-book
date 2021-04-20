import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {StaffregisterService} from '../shared/staff/staffregister.service';
import{Router} from '@angular/router';
import{Staffregister} from '../shared/staff/staffregister.model';//b/c to retreive data we need model
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private staffService:StaffregisterService,private router:Router,public toastr:ToastrService) { }

  staffServe={
    _id:'',
    Password:'',
  serverErrorMessages: '',
  }
  message;
  spinner:boolean=false;
  ngOnInit(): void {
    localStorage.removeItem('token')
  }

  onLogin(form:NgForm){
    this.staffService.loginStaff(form.value).subscribe(
      res=>{
        if(res['status']==true)
        {
          this.toastr.success(res['msg'])
          localStorage.setItem('token',res['token']);
          this.router.navigate(['/home']);
        }else{
          this.toastr.error(res['msg'])
        }
    },
    err=>{
      this.staffServe.serverErrorMessages = err;
    });

  }
  
}
