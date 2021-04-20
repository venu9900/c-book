import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

import {StdregisterService} from '../shared/student/stdregister.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  constructor(private stdService:StdregisterService,private router:Router,public toastr:ToastrService) { }

  studServe={
    _id:'',
    Password:'',
    serverErrorMessages:''
  }

  
  ngOnInit(): void {  
    localStorage.removeItem('token')
  }

  onLogin(form:NgForm){
    this.stdService.LoginStud(form.value).subscribe(
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
      this.studServe.serverErrorMessages=err;

    })
  }

}
