import { Component, OnInit,ViewChild } from '@angular/core';
import {AdminService} from '../../shared/admin/admin.service'
import {HomePageService} from '../../shared/home-page/home-page.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  names=[];email=[];codes=[];profiles=[];contacts=[];name=[];code:[]

  select={
    college:false,
    student:false,
    staff:false,
    showClg:true,
    addlst:false,
    confirm:false,
    home:true,
    login:false,
    msg:"",
    status:true
  }

  constructor(public adminService:AdminService,public homeService:HomePageService,public route:Router,public toastr: ToastrService) { }
  adServe={
    _id:"",
    Password:"",
    name:"",
    code:""
  }

  ngOnInit(): void {
    this.ShowClg();
    // this.toastr.overlayContainer = this.toastContainer;
    if(localStorage.getItem('token')){
      this.select.login=true;
    }
  }

  home(){
      this.select.college=false;
    this.select.student=false;
    this.select.staff=false;
    this.select.home=true;
  }

  college(){
    if(this.select.login==true){this.select.college=true;
    this.select.student=false;
    this.select.staff=false;
    this.select.home=false;}
  }
  student(){
    if(this.select.login==true){
      this.select.college=false;
      this.select.student=true;
      this.select.staff=false;
      this.select.home=false;
    }
  }
  staff(){
    if(this.select.login==true){
      this.select.college=false;
      this.select.student=false;
      this.select.staff=true;
      this.select.home=false;
    }
  }
  ShowClg(){
    this.adminService.getDetails().subscribe(res=>{
      this.names=res['Names'];
      this.codes=res['collegeCodes'];
      this.email=res['Emails'];
      this.profiles=res['profiles'];
      this.contacts=res['PhoneNumbers'];
    this.select.showClg=true;
    this.select.addlst=false;
    this.select.confirm=false;
    })
 }

 ShowConfirm(){
  this.adminService.getDetail().subscribe(res=>{
    this.names=res['Names'];
    this.codes=res['collegeCodes'];
    this.email=res['Emails'];
    this.profiles=res['profiles'];
    this.contacts=res['PhoneNumbers'];

  })
}
 ConfirmClg(){
  this.ShowConfirm();
  this.select.showClg=false;
  this.select.addlst=false;
  this.select.confirm=true;
 }
 AddList(){
  this.getClg();
  this.select.showClg=false;
  this.select.addlst=true;
  this.select.confirm=false;
  this.select.home=false;
 }

 onLogin(form:NgForm){
  this.homeService.doLogin(form.value).subscribe(res=>{
    if(res['status']==true){
      this.select.msg=res['msg']
      localStorage.setItem('token',res['token']);
      this.select.login=true;
      this.toastr.success(res['msg'])
    }else{
      this.toastr.error(res['msg'])
    }
  },
  err=>{
    this.select.msg="error";
  })
 }
 logOut(){
  localStorage.removeItem('token');
  this.select.login=false;
  this.resetForm();   
 }
 resetForm(){
   this.adServe._id=" ",
   this.adServe.Password=""
 }
 delete(i){
   var dlt=confirm("Are you sure..?");
   if(dlt==true){
    
     this.adminService.delete(this.email[i]).subscribe(res=>{
      this.toastr.success("Deleted successfully..");
      this.afterDelete(i);
     },err=>{
       this.toastr.error(err)
     })
   }
   else{
     this.toastr.success("operation cancelled");
   }
 }
 afterDelete(i){
  this.adminService.afterdelete(this.email[i]).subscribe(res=>{
    this.toastr.success("Deleted successfully..");
    this.ShowClg();
   })
  }

  confirm(i){
    this.adminService.confirm(this.email[i]).subscribe(res=>{
      this.ConfirmClg();
      this.toastr.success(res['msg']);
    },err=>{
      this.toastr.error('Not Confirmed');
    })
  }
  view(i){

  }

  onAdd(form:NgForm){
   for(var i=0;i<this.name.length;i++){
     if(this.code[i]==this.adServe.code || this.name[i]==this.adServe.code){
       this.select.status=false;
       this.toastr.warning(this.code[i]+" Already In The List");
     }
   }
   if(this.select.status==true){
    this.adminService.addClg(form.value).subscribe(res=>{
      this.toastr.success(res['msg']);
      this.adServe.name="";
      this.adServe.code=""
      this.getClg();
    },err=>{
      this.toastr.error('Failed to add')
    });
   }  
  }
  getClg(){
    this.adminService.getClg().subscribe(res=>{
      this.name=res['Names'];
      this.code=res['collegeCodes'];
    })
  }
}
