import { Component, OnInit } from '@angular/core';
import {CarouselService} from '../services/carousel.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {Images} from '../mock-carousel';
import {Input} from '@angular/core';
import { Image } from "src/app/models/image";

@Component({
  selector: 'app-second-carousel',
  templateUrl: '../shared/carousel.html',
  styleUrls: ['./second-carousel.component.css'],
  providers: [NgbCarouselConfig] 
})
export class SecondCarouselComponent implements OnInit {

  carousel1Id : string;
  images : Image[];
  constructor(config: NgbCarouselConfig, private carouselService: CarouselService) { 
    config.interval = 5000;
  }

  ngOnInit() {
    this.getImages();
    this.carouselService.currentMessage2.subscribe(message => this.carousel1Id = message);
  }

  getImages() : void {
    this.carouselService.getImages()
    .subscribe(images => {
      this.images = images.reverse();
    });
  }

  onSlide(event, caro){
    const imageIndex = parseInt(event.current.replace("slideId_", ""), 10);
    let carousel2Id = this.images[imageIndex].id;
    this.carouselService.change2(this.images[imageIndex].id);
    if(this.carousel1Id == carousel2Id){
      caro.prev();
    }

    this.carouselService.change2(this.images[imageIndex].id);
  }

}
