import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Stdregister} from './stdregister.model';

@Injectable()

export class StdregisterService {
  selectedStudent:Stdregister;//used to design a form for insert update operation
  studetns:Stdregister[];//to save all collection to mongodb
  readonly baseUrl='http://localhost:3000/student/'//url for that request

  constructor(private http:HttpClient) { } //to make a request to backend file through http 

  postStudent( std : Stdregister ){//making an request to backend code in controllers/student/studregister
    return this.http.post( this.baseUrl+'register' , std );
  }

  LoginStud(stud){
    return this.http.post(this.baseUrl+'login',stud);
  }
}
