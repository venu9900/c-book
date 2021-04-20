import { Component, OnInit } from '@angular/core';

import {CollegeService} from '../../shared/college/college.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AdminService} from '../../shared/admin/admin.service'



@Component({
  selector: 'app-clg-register',
  templateUrl: './clg-register.component.html',
  styleUrls: ['./clg-register.component.css']
})
export class ClgRegisterComponent implements OnInit {

  constructor(public clgService:CollegeService,public toastr:ToastrService,public adServe:AdminService) { }
  names=[];
  code=[];
  index
  FormData={
    clgName:"",
    CollegeEmail:"",
    Password:"",
    Phone:"",
    PrincipleId:"",
    collegeCode:""
  }
  msgs={
    serverErrorMessages:String,
    showMsg:false,
    showForm:true,
    showMsgAll:false,
  }

  ngOnInit(): void {
    this.getClg();
    localStorage.removeItem('token')
    this.resetForm();

  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.FormData = {
      collegeCode: "",
      clgName: "",
      PrincipleId:"",
      Password:"",
      Phone:'',
      CollegeEmail:""
    }
  }

  onRegister(form:NgForm){
    if(this.FormData.PrincipleId==""||this.FormData.CollegeEmail==""||this.FormData.Phone==""||this.FormData.clgName==""||this.FormData.Password==""||this.FormData.collegeCode==""){
      this.toastr.warning("Please Fill All The Fields")
    }else{
      this.index=this.names.indexOf(this.FormData.clgName);
      if(this.FormData.collegeCode==this.code[this.index]){
      this.clgService.postCollege(form.value).subscribe(res=>{
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
  }//call the function written in service class to connect with backend
  }
}
getClg(){
    this.adServe.getClg().subscribe(res=>{
      this.names=res['Names'];
      this.code=res['collegeCodes'];
    })
  }
}
