import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Image} from '../models/image';
import {Images} from '../mock-carousel';
import { GlobalConstant } from "../global-constant";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  getImagesUrl : string = this.globalConstant.baseUrl +'/api/Exercise';
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  images = Images;
  private messageSource2 = new BehaviorSubject(null);
  currentMessage2 = this.messageSource2.asObservable();

  constructor(private http : HttpClient, private globalConstant :GlobalConstant ) { }

  change2(message: string) {
    this.messageSource.next(message)
  }

  change1(message : string){
    this.messageSource2.next(message);
  }

  getImages() : Observable<any>{
    let httpOptions = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.get(this.getImagesUrl, {headers : httpOptions});
  }
}
