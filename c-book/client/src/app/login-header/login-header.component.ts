import { Component, OnInit } from '@angular/core';
import {HomePageService} from '../shared/home-page/home-page.service';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import {Staffregister} from '../shared/staff/staffregister.model';
import {Stdregister} from '../shared/student/stdregister.model'
import { Router } from '@angular/router';
import {saveAs} from 'file-saver';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css'],
  providers:[HomePageService]
})
export class LoginHeaderComponent implements OnInit {

  constructor(public homeService:HomePageService,public router:Router,public toastr:ToastrService) { }
  pdfs=[];label=[];cnts=[];id=[];names=[];profile=[];
  docCnt=[];cntArray=[];temp=[];tempt=[];len=[]
  num=0;
  paths=""
  messages={
    serverErrorMessages:'',
    Name:'',
    show:'',
    profileImage:''
  }
  details={
    staff:false,
    student:false,
    college:false,
    code:""
  }

  ngOnInit(): void {
    this.LoadHeader();
    }

  getCnfStudent(code){
    this.homeService.cnfStudent(code).subscribe(res=>{
    this.homeService.students=res as Stdregister[];
    });
  }
  getCnfStaff(code){
    this.homeService.cnfStaff(code).subscribe(res=>{
    this.homeService.staffs=res as Staffregister[];
    });
  }

  DoneStaff(_id){
    this.homeService.DoneStf(_id).subscribe(res=>{
    this.getCnfStaff(this.details.code);
    this.toastr.success(res['msg'])
   })
  }
  CancelStaff(_id){
    
  }
  DoneStudent(_id){
    this.homeService.DoneStud(_id).subscribe(res=>{
      this.getCnfStudent(this.details.code);
      this.toastr.success(res['msg'])
    })
  }

  LoadHeader(){
    this.homeService.LoadHeadr().subscribe(res=>{
    if(res['Auth']!=false){
    if(res['category']=='staff'){
      this.messages.Name=res['Name'];
      this.messages.profileImage=res['ProfileImage']
      this.details.staff=true;
    }
    else if(res['category']=='student'){
      this.messages.Name=res['Name'];
      this.messages.profileImage=res['ProfileImage']
      this.details.student=true;
      this.getNotes()
    }
    else if(res['category']=='college'){
      this.messages.Name=res['Name'];  
      this.messages.profileImage=res['ProfileImage'];
      this.details.college=true;
      this.details.code=res['code'];
      this.getCnfStudent(this.details.code);
    this.getCnfStaff(this.details.code);
    }
    }
    else{
      this.router.navigate([''])
    }
  },err=>{
      this.messages.serverErrorMessages=err
    })
  }

  getNotes(){
    this.homeService.getNotes().subscribe(res=>{
      this.cntArray=[]
      this.pdfs=res['postArray'];
      this.label=res['titles'];
      this.names=res['name'];
      this.profile=res['Files'];
     this.num=res['TotalCount'];
      for(var i=0;i<this.num;i++){
        this.cnts[i]=i;
      }      
    })
  }
  downloads(pdf){
    this.homeService.download(pdf).subscribe(res=>{
      saveAs(res,pdf)
     },
     err=>{
       this.messages.serverErrorMessages="err"
     })
  }
}
