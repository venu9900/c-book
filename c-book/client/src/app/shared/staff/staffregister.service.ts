import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Staffregister} from './staffregister.model';

@Injectable({
  providedIn: 'root'
})
export class StaffregisterService {
  selectedStaff:Staffregister;
  staffs:Staffregister[];//used for display purpose
  readonly baseUrl="http://localhost:3000/staff/"


  constructor(private http:HttpClient) { }

  postStaff( staff : Staffregister ){//making an request to backend code in controllers/student/studregister
    return this.http.post( this.baseUrl+'register' , staff );
  }

  loginStaff(staff:Staffregister){
    return this.http.post(this.baseUrl+'login',staff);
  }
}