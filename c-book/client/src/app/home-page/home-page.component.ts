import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {EventEmitter } from '@angular/core';    
import {HomePageService} from '../shared/home-page/home-page.service'
import {Staffregister} from '../shared/staff/staffregister.model'
import {Stdregister} from '../shared/student/stdregister.model'
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   homeSlider={items:1,dots:true,nav:false,mouseDrag:true,}
  constructor(public homeService:HomePageService,public router:Router,public toastr:ToastrService) { }
  messages={
    ErrorMessage:'',
    num:0
  }
  
  details={
    ProfileImage:'',
    Name:'',
    Email:'',
    Phone:'',
    category:'',
    collegeName:'',
    Usn:'',
    staff:false,
    student:false,
    college:false,
    collegeCode:'',
    Title:'',
    postImages:'',
    postPDF:'',
    Label:'',
    talent:'',
    search:false,
    searchText:"",
    str:"",
    show:false,
    viewProfile:false,
    filter:"None",
    selFilter:""
  }
  num;
  index;
  nam;
  profiles;
  view;
  enlarge=false;
  code;
  contact;
  princi;
  email;


  // Posts Array
  posts=[];title=[];date=[];time=[];cnts=[];id=[];names=[];profile=[];temp=[]

//Search Array

  // Student Posts array
  postStudent=[];titleStudent=[];dateStudent=[];timeStudent=[];cntsStudent=[];idStudent=[];namesStudent=[];profileStudent=[];
  progress;Filters=[];

  getDetails={}


  ngOnInit(): void {
    this.details.search=false
    this.getUserDetails();
    this.getPosts();
    this.getStudentPosts()
  }
  // Updating Images
  createFormData(event){
    const file=event.target.files[0];
    this.details.ProfileImage=file;
  }
  onUpdate(){
    const  formData=new FormData();
    if(this.details.student){
      formData.append('profileImage',this.details.ProfileImage);
      formData.append('Name',this.details.Name);
      formData.append('PhoneNumber',this.details.Phone);
      formData.append('collegeName',this.details.collegeName);
    }
    else if(this.details.staff){
      formData.append('profileImage',this.details.ProfileImage);
      formData.append('Name',this.details.Name);
      formData.append('PhoneNumber',this.details.Phone);
    }
    else if(this.details.college){
      formData.append('profileImage',this.details.ProfileImage);
      formData.append('collegeName',this.details.collegeName);
      formData.append('PhoneNumber',this.details.Phone);
    }
    this.homeService.update(formData).subscribe(res=>{
      if(res['status']==true){
        this.toastr.success(res['msg']);
        this.afterProfileUpdate();
      }
    })
  }

// Staff Posting
  createPostStaff(event){
    if (event.target.files.length > 0) {
      this.details.postPDF = event.target.files;
    }
  }
  onPostStaff(){
    const formData = new FormData();
    for(let img of this.details.postPDF){
      formData.append('postPDF', img);
    }
    formData.append('Label',this.details.Label);
    this.homeService.onPostStaff(formData).subscribe(res=>{
    this.toastr.success("Posted Successfully..")
      this.getPosts();
    }),
    err=>{
      this.messages.ErrorMessage='Not Done'
    }
  }

// Uploading Posts By College
  createPost(event){
    if (event.target.files.length > 0) {
      this.details.postImages = event.target.files;
    }
  }
  onPost(){
    const formData = new FormData();
    for(let img of this.details.postImages){
      formData.append('postImages', img);
    }
    formData.append('Title',this.details.Title);
    formData.append('Filter',this.details.filter);
    this.homeService.onPost(formData).subscribe(res=>{
      this.toastr.success("Posted Successfully..");
      this.router.navigateByUrl['home'];
    }),
    err=>{
      this.messages.ErrorMessage='Not Done';
    }
  }


// Talent Uploading By Student
  createPostStudent(event){
    if (event.target.files.length > 0) {
      this.details.talent = event.target.files;
    }
  }

  onPostStudent(){
    const formData = new FormData();
    for(let img of this.details.talent){
      formData.append('Talent', img);
    }
    formData.append('Label',this.details.Label);
    this.homeService.onPostStudent(formData).subscribe(res=>{
      this.toastr.success("Posted Successfully..");
      this.getPosts();
    }),
    err=>{
      this.messages.ErrorMessage='Not Done'
    }
  }
 
  
afterProfileUpdate(){
  const  formData=new FormData();
  formData.append('profileImage',this.details.ProfileImage);
  this.homeService.afterProfileUpdate(formData).subscribe(res=>{
    this.router.navigate(['/home']);
  })

}

  getUserDetails(){
    this.homeService.getUserDetails().subscribe(res=>{
      if(res['Auth']==false){
        this.router.navigate([''])
      }
      else{
        this.details.category=res['category'];
        if(res['category']=='staff'){
          this.details.staff=true;
          this.details.Name=res['Name'];
          this.details.Phone=res['Phone'];
          this.details.Email=res['Email'];
          this.details.ProfileImage=res['ProfileImage'];

        }
        else if(res['category']=='student'){
          this.details.student=true;
          this.details.Name=res['Name'];
          this.details.Phone=res['Phone'];
          this.details.Email=res['Email'];
          this.details.collegeName=res['collegeName'];
          this.details.Usn=res['Usn']
          this.details.ProfileImage=res['ProfileImage']

        }
        else if(res['category']=='college'){
          this.details.college=true;
          this.details.collegeName=res['Name'];
          this.details.collegeCode=res['collegeCode'];
          this.details.Phone=res['Phone'];
          this.details.Email=res['Email'];
          this.details.ProfileImage=res['ProfileImage'];
        }
      }
  },
    err=>{
      this.messages.ErrorMessage='Error In Loading Data';
    })
  }
  getPosts(){
    this.homeService.getPost().subscribe(res=>{
      this.posts=res['postArray'];
      this.title=res['titles'];
      this.date=res['dates'];
      this.time=res['times'];
      this.names=res['name'];
      this.profiles=res['profiles'];
      this.id=res['id'];
      this.details.selFilter="All"
     // this.getDetails=res['postArray'];
     this.num=res['TotalCount'];
      for(var i=0;i<this.num;i++){
        this.cnts[i]=i;
      }      
    },
    err=>{
      this.messages.ErrorMessage="Cannot get posts";
    })
  }

  getStudentPosts(){
    this.homeService.getPostStudent().subscribe(res=>{
      this.postStudent=res['postArray'];
      this.titleStudent=res['titles'];
      this.dateStudent=res['dates'];
      this.timeStudent=res['times'];
      this.idStudent=res['id'];
      this.namesStudent=res['name'];
      this.profileStudent=res['profiles'];
     // this.getDetails=res['postArray'];
     this.num=res['TotalCount'];
      for(var i=0;i<this.num;i++){
        this.cntsStudent[i]=i;
      }      
    },
    err=>{
      this.messages.ErrorMessage="Cannot get posts";
    })
  }

  logOut(){
    var logout=confirm("Are You sure..?")
    if(logout==true){
        localStorage.removeItem('token');
        this.router.navigate(["/"+this.details.category])
    }
    else{
      this.toastr.success("Operation cancelled")
    }
   }

   search(form:NgForm){
      this.homeService.search(form.value).subscribe(res=>{
        if(res['search']==true){
          this.id=[];
          this.posts=res['postArray'];
          this.title=res['titles'];
          this.date=res['dates'];
          this.time=res['times'];
          this.nam=res['names'];
          this.profile=res['profile'];
          this.cnts=res['cnts']
         // this.getDetails=res['postArray'];
         this.num=res['TotalCount'];
          for(var i=0;i<this.num;i++){
            for(var j=0;j<this.cnts[i];j++){
              this.temp[j]=j
            }
            this.id.push(this.temp);
            this.temp=[]
          }
          this.details.search=true
        }else{
          this.toastr.success(res['msg'])
        }
      },err=>{
        this.toastr.success('Posts not available.')
      });
      
   }

   clearSearch(){
     this.details.search=false;
     this.getPosts();
   }

   viewProfile(i){
     this.email=this.id[i];
      this.homeService.viewProfile(this.email).subscribe(res=>{
        this.nam=res['Name'];
        this.profile=res['Profile'];
        this.code=res['Code'];
        this.contact=res['Contact'];
        this.princi=res['Princi'];
        this.viewPostAll(this.email);
      },err=>{
        this.toastr.success('Error')
      })
   }
   viewPostAll(ids){
     this.homeService.viewPost1(ids).subscribe(res=>{
      this.postStudent=res['Posts'];
      this.viewPostCultural(ids);
     });
     this.details.viewProfile=true;
   }
   viewPostCultural(ids){
    this.homeService.viewPost2(ids).subscribe(res=>{
     this.postStudent.push(res['Posts']);
     this.viewPostSports(ids);
    });
    this.details.viewProfile=true;
  }
  viewPostSports(ids){
    this.homeService.viewPost3(ids).subscribe(res=>{
     this.postStudent.push(res['Posts']);
     this.viewPostFdp(ids);
    });
    this.details.viewProfile=true;
  }
  viewPostFdp(ids){
    this.homeService.viewPost4(ids).subscribe(res=>{
     this.postStudent.push(res['Posts']);
     this.viewPostPlacement(ids);
    });
    this.details.viewProfile=true;
  }
  viewPostPlacement(ids){
    this.homeService.viewPost5(ids).subscribe(res=>{
     this.postStudent.push(res['Posts']);
    });
    this.details.viewProfile=true;
  }

   myFunction(imgs) {
     this.details.show=true;
     this.view=imgs;
    this.enlarge=true;
  } 
  remove() {
    this.enlarge=false;
  }
  backToStudent(){
    this.details.viewProfile=false;
    this.getStudentPosts();
  }

  filter(form:NgForm){
    this.homeService.filterPost(form.value).subscribe(res=>{
      this.posts=res['postArray'];
      this.title=res['titles'];
      this.date=res['dates'];
      this.time=res['times'];
      this.names=res['name'];
      this.profiles=res['profiles'];
      this.id=res['id'];
      this.details.selFilter=this.details.filter
     // this.getDetails=res['postArray'];
     this.num=res['TotalCount'];
      for(var i=0;i<this.num;i++){
        this.cnts[i]=i;
      }
    },err=>{
      this.toastr.success(err);
    })
    
  }
}
