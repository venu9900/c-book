import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import {HomePageService} from './home-page/home-page.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public injector:Injector) { }

  intercept(req,next){
    let homeService=this.injector.get(HomePageService)
    let tockenizedRequest=req.clone({
      headers:
        req.headers.set('Authorization', 'bearer ' + homeService.getToken())
      
    })
    return next.handle(tockenizedRequest);
  }
}
