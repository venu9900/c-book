import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly baseUrl="http://localhost:3000/admin/"

  constructor(private http:HttpClient) { }

  getDetails(){
    return this.http.get(this.baseUrl+'clgDetails');
  }
  getDetail(){
    return this.http.get(this.baseUrl+'clgDetail');
  }
  getClg(){
    return this.http.get(this.baseUrl+'getClg');
  }
  getClgs(){
    return this.http.get(this.baseUrl+'getClgs');
  }

  delete(id){
    return this.http.post(this.baseUrl+'delete/'+id,id);
  }
  afterdelete(id){
    return this.http.post(this.baseUrl+'delete/'+id,id);
  }
  confirm(id){
    return this.http.post(this.baseUrl+'confirm/'+id,id);
  }

  addClg(form){
    return this.http.post(this.baseUrl+'addClg',form);
  }
  
}
