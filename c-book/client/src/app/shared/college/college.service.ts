import { Injectable } from '@angular/core';
import {College} from './college.model';
import {HttpClient} from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  college:College;
  readonly baseUrl="http://localhost:3000/college/"
  constructor(private http:HttpClient) { }

  postCollege(clg:College){
    return this.http.post(this.baseUrl+'register',clg);
  }
  LoginStud(clg){
    return this.http.post(this.baseUrl+'login',clg);
  }
}
