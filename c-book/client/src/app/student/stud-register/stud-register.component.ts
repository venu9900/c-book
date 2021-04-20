import { Component, OnInit } from '@angular/core';

import {StdregisterService} from '../../shared/student/stdregister.service';
import { NgForOfContext } from '@angular/common';
import { NgForm, FormGroup } from '@angular/forms';
import {AdminService} from '../../shared/admin/admin.service';
import  {ToastrService} from 'ngx-toastr'

declare var M:any;
@Component({
  selector: 'app-stud-register',
  templateUrl: './stud-register.component.html',
  styleUrls: ['./stud-register.component.css'],
})
export class StudRegisterComponent implements OnInit {
  names=[];
  code=[];
  
  constructor(public stdService:StdregisterService,public adServe:AdminService,public toastr:ToastrService) { }
  newForm:FormGroup
  msgs={
    serverErrorMessages:String,
    showMsg:false,
    showForm:true,
    showMsgAll:false,
  }

  FormData={
    clgName:"",
    Name:"",
    EmailId:"",
    Password:"",
    Phone:"",
    Usn:""
  }

  ngOnInit(){
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
      Usn:"",
      Phone: "",
      Password:"",
      EmailId:""
      
    }
  }
  showMsg: boolean = false;
  showForm: boolean = true;

  //registering students
  onSubmit(form:NgForm){
    if(this.FormData.Name==""||this.FormData.Usn==""||this.FormData.Phone==""||this.FormData.clgName==""||this.FormData.Password==""){
      this.toastr.warning("Please Fill All The Fields")
    }else{
      this.stdService.postStudent(form.value).subscribe(res=>{
        this.msgs.serverErrorMessages=res['msg'];
        this.resetForm(form);
        this.msgs.showMsg=true;
        this.msgs.showForm=false;
        if(res['status']==true){
          this.msgs.showMsgAll=true;
        } 
    
    });//call the function written in service class to connect with backend
  }
}

  getClg(){
    this.adServe.getClgs().subscribe(res=>{
      this.names=res['Names'];
      this.code=res['collegeCodes'];
    })
  }

}
