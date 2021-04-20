import { Component, OnInit } from '@angular/core';

import {CollegeService} from '../shared/college/college.service';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {AdminService} from '../shared/admin/admin.service'



@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})


export class CollegeComponent implements OnInit {

  constructor(public clgService:CollegeService,public router:Router,public toastr:ToastrService,public adServe:AdminService) { }
  clgServe={
    _id:'',
    Password:'',
    serverErrorMessages:''
  }
  name=[];code=[]

  ngOnInit(): void {
    localStorage.removeItem('token');
  }
  
  onLogin(form:NgForm){
    this.clgService.LoginStud(form.value).subscribe(
      res=>{
        if(res['status']==true)
        {
          this.toastr.success(res['msg']);
          localStorage.setItem('token',res['token']);
          this.router.navigate(['/home']);
        }else{
          this.toastr.error(res['msg']);
        }
    },
    err=>{
      this.clgServe.serverErrorMessages=err;

    })
  }
  getClg(){
    this.adServe.getClg().subscribe(res=>{
      this.name=res['Names'];
      this.code=res['collegeCodes'];
    })
  }
  
}
