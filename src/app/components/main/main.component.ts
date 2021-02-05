import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimony } from 'src/app/interfaces/testimony';
import { TestimonialsService } from 'src/app/services/testimonials/testimonials.service';
import { trigger, style, transition, state, animate } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideTrigger', [
      state('inactive', style({ opacity: 0, transform: "translateX(-15px)", pointerEvents: 'none' })),
      state('active', style({ opacity: 1, transform: "translateX(0px)", pointerEvents: 'all' })),
      transition("inactive <=> active", animate("500ms"))
    ])
  ]
})
export class MainComponent implements OnInit {

  testimonies!: Array<Testimony>
  activeSlide: number = 0
  inverval: any;

  constructor(
    private testimonialsService: TestimonialsService
  ) { }

  ngOnInit(): void {
    this.getTestimonies();
  }

  initSlideInterval(){

    /* this.inverval = setInterval(() => {
      this.activeSlide++

      if(this.testimonies.length==this.activeSlide){
        this.activeSlide=0
      }

    }, 5000) */
  }

  getTestimonies(): void{
    this.testimonialsService.getTestimonials().subscribe(testimonies => {
      this.testimonies=testimonies
      this.initSlideInterval()
    });
  }

  changeSlide(action: "next" | "prev"): void{

    clearInterval(this.inverval);
    if(action=="next"){
      this.activeSlide++
      if(this.testimonies.length==this.activeSlide){
        this.activeSlide=0
      }
    }

    if(action=="prev"){

      this.activeSlide--
      if(this.activeSlide===-1){
        this.activeSlide=this.testimonies.length-1
      }
    }

    this.initSlideInterval()

  }

}
