import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/Rx";
import {Observable} from 'rxjs';


import {Stdregister} from '../student/stdregister.model';
import {Staffregister} from '../staff/staffregister.model';
import { NgForm } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  students:Stdregister[];
  staffs:Staffregister[];
  readonly baseUrl='http://localhost:3000/home/'//url for that request


  constructor(private http:HttpClient) { }

  cnfStudent(code){
    return this.http.get(this.baseUrl+'cnfStudent/'+code);
  }

  cnfStaff(code){
    return this.http.get(this.baseUrl+'cnfStaff/'+code);
  }

  DoneStf(_id){
    return this.http.put(this.baseUrl+'DoneStaff/'+_id,_id);
  }
  DoneStud(_id){
    return this.http.put(this.baseUrl+'DoneStud/'+_id,_id);
  }
  download(pdf:String){
    var body={filename:pdf}
    return this.http.post(this.baseUrl+'download',body,{
      responseType:'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  LoadHeadr(){
    return this.http.get(this.baseUrl+'loadHead');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUserDetails(){
    return this.http.get(this.baseUrl+'getDetails');
  }
 
  update(formData){
    return this.http.put(this.baseUrl+'update',formData);
  }
  onPost(formData){
    return this.http.post(this.baseUrl+'post',formData);
  }
  getPost(){
    return this.http.get(this.baseUrl+'getPosts');
  }
  getPostStudent(){
    return this.http.get(this.baseUrl+'getPostStudent');
  }
  onPostStaff(formData){
    return this.http.post(this.baseUrl+'postStaff',formData);
  }
  onPostStudent(formData){
    return this.http.post(this.baseUrl+'postStudent',formData);
  }

  afterProfileUpdate(formData){
    return this.http.put(this.baseUrl+'afterProfileUpdate',formData)
  }

  getNotes(){
    return this.http.get(this.baseUrl+'getNotes')
  }
  
  doLogin(values){
    return this.http.post("http://localhost:3000/admin/"+'login',values);
  }
  search(form){
    return this.http.post(this.baseUrl+"search",form);

  }
  viewProfile(ids){
    return this.http.get(this.baseUrl+'viewProfile/'+ids)
  }
  viewPost1(ids){
    return this.http.get(this.baseUrl+'viewPost/'+ids)
  }
  viewPost2(ids){
    return this.http.get(this.baseUrl+'viewPostC/'+ids)
  }
  viewPost3(ids){
    return this.http.get(this.baseUrl+'viewPostS/'+ids)
  }
  viewPost4(ids){
    return this.http.get(this.baseUrl+'viewPostF/'+ids)
  }
  viewPost5(ids){
    return this.http.get(this.baseUrl+'viewPostP/'+ids)
  }

  filterPost(form){
    return this.http.post(this.baseUrl+'getPostByFilter',form);
  }
}

