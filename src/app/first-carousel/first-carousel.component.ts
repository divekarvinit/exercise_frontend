import { Component, OnInit } from '@angular/core';
import {CarouselService} from '../services/carousel.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Images} from '../mock-carousel';
import {Input} from '@angular/core';
import { Image } from "src/app/models/image";
@Component({
  selector: 'app-first-carousel',
  templateUrl: '../shared/carousel.html',
  styleUrls: ['./first-carousel.component.css'],
  providers: [NgbCarouselConfig] 
})
export class FirstCarouselComponent implements OnInit {

  carousel2Id : string;
  images : Image[];
  constructor(private config : NgbCarouselConfig, private carouselService : CarouselService) { 
    // Set rotation interval at 5sec
    config.interval = 5000;
  }


  ngOnInit() {
    this.getImages();
    this.carouselService.currentMessage.subscribe(message => this.carousel2Id = message); 
  }

  getImages() : void {
    this.carouselService.getImages()
    .subscribe(images => {
      this.images = images;
    });
  }
  
  onSlide(event, caro){
    const imageIndex = parseInt(event.current.replace("slideId_", ""), 10);
    let imageId = this.images[imageIndex].id;
    if(this.carousel2Id == imageId){
      caro.prev();
    }
    this.carouselService.change1(imageId);
  }
}
