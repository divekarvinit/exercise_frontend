import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Image} from '../models/image';
import { GlobalConstant } from "../global-constant";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  //  Initialise URL for REST API
  getImagesUrl : string = this.globalConstant.baseUrl +'/api/Exercise';
  
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  private messageSource2 = new BehaviorSubject(null);
  currentMessage2 = this.messageSource2.asObservable();

  constructor(private http : HttpClient, private globalConstant :GlobalConstant ) { }

  publishToCarousel1(imageId: string) {
    this.messageSource.next(imageId)
  }

  publishToCarousel2(imageId : string){
    this.messageSource2.next(imageId);
  }

  getImages() : Observable<any>{
    let httpOptions = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.get(this.getImagesUrl, {headers : httpOptions});
  }
}
