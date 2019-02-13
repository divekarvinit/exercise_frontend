import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FirstCarouselComponent } from './first-carousel/first-carousel.component';
import { SecondCarouselComponent } from './second-carousel/second-carousel.component';
import { CarouselService }from './services/carousel.service';

@NgModule({
  declarations: [
    AppComponent,
    FirstCarouselComponent,
    SecondCarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [CarouselService],
  bootstrap: [AppComponent]
})
export class AppModule { }
