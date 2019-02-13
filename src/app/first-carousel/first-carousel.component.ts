import { Component, OnInit } from '@angular/core';
import {CarouselService} from '../services/carousel.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
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
    // Get images from the rest api
    this.getImages();

    // Subscribe to changes in the carousel 2 image
    this.carouselService.currentMessage.subscribe(message => this.carousel2Id = message); 
  }

  getImages() : void {
    this.carouselService.getImages()
    .subscribe(images => {
      this.images = images;
    });
  }
  
  onSlide(event, caro){

    // Get current index
    const imageIndex = parseInt(event.current.replace("slideId_", ""), 10);

    //Get current image id
    let imageId = this.images[imageIndex].id;

    //  If the current image's id matches with the current image id of second carousel, 
    //  show previous image
    if(this.carousel2Id == imageId){
      caro.prev();
    }

    //  Publish the change of ID to carousel 2.
    this.carouselService.publishToCarousel2(imageId);
  }
}
