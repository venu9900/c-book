import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private router:Router) { }

  goToPage(pagename:string){
    this.router.navigate([`${pagename}`]);
  }

  ngOnInit(): void {
    localStorage.removeItem('token')
  }

}
