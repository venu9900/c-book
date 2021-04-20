import { Component, OnInit } from '@angular/core';

import {StaffregisterService} from '../../shared/staff/staffregister.service';
import { NgForOfContext } from '@angular/common';
import {NgForm} from '@angular/forms';
import{Router} from '@angular/router';
import{Staffregister} from '../../shared/staff/staffregister.model';
import { from } from 'rxjs';
import {AdminService} from '../../shared/admin/admin.service'
import {ToastrService} from 'ngx-toastr'


var M:any;


@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.css'],
})
export class StaffRegisterComponent implements OnInit {
  
  constructor(public staffService:StaffregisterService,public router:Router,public adServe:AdminService,public toastr:ToastrService) { }
  FormData={
    clgName:"",
    Name:"",
    EmailId:"",
    Password:"",
    Phone:"",
    collegeCode:""
  }
  index
  msgs={
    serverErrorMessages:String,
    showMsg:false,
    showForm:true,
    showMsgAll:false,
  }
  names=[];
  code=[]

  ngOnInit(): void {
    this.getClg();
    localStorage.removeItem('token')
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.FormData = {
      clgName: "",
      Name: "",
      Phone: "",
      Password:"",
      EmailId:"",
      collegeCode:""
      
    }
  }

 

  onSubmit(form:NgForm){
    if(this.FormData.Name==""||this.FormData.Phone==""||this.FormData.clgName==""||this.FormData.Password==""||this.FormData.collegeCode==""){
      this.toastr.warning("Please Fill All The Fields")
    }else{
      this.index=this.names.indexOf(this.FormData.clgName);
      if(this.FormData.collegeCode==this.code[this.index]){
      this.staffService.postStaff(form.value).subscribe(res=>{
        this.msgs.serverErrorMessages=res['msg'];
        this.resetForm(form);
        this.msgs.showMsg=true;
        this.msgs.showForm=false;
        if(res['status']==true){
          this.msgs.showMsgAll=true;
        }    
    });
  }else{
    this.toastr.error("Wrong College Code.!Did You Mean "+this.code[this.index]+"?")
  }
}
  }
  getClg(){
    this.adServe.getClgs().subscribe(res=>{
      this.names=res['Names'];
      this.code=res['collegeCodes'];
    })
  }
}

