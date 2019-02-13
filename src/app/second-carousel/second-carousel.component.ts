import { Component, OnInit } from '@angular/core';
import {CarouselService} from '../services/carousel.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
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
    // Set carousel interval at 5 seconds
    config.interval = 5000;
  }

  ngOnInit() {
    //  Get images from REST API
    this.getImages();

    //  Subscribe to changes in the carousel 1 image.
    this.carouselService.currentMessage2.subscribe(message => this.carousel1Id = message);
  }

  getImages() : void {
    this.carouselService.getImages()
    .subscribe(images => {
      this.images = images.reverse();
    });
  }

  onSlide(event, caro){
    //  Get index of current image
    const imageIndex = parseInt(event.current.replace("slideId_", ""), 10);

    //  Get id of current image
    let carousel2Id = this.images[imageIndex].id;

    if(this.carousel1Id == carousel2Id){
      caro.prev();
    }

    //  Publish change of image to carousel 1.
    this.carouselService.publishToCarousel1(this.images[imageIndex].id);
  }

}
