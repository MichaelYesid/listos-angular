import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html'
})
export class OwlCarouselComponent implements OnInit {

  @Input() customOptions?: OwlOptions = undefined;
  @Input() slidesStore?:any;
  @Input() customTemplateSlide?: TemplateRef<any>;

  constructor() { }
  
  ngOnInit(): void {
    // console.log(this.customOptions, this.slidesStore);
  }

}
