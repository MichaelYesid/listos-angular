import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-slider-range',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    
    <!-- Input -->
    <div class="row">
      <div class="col-6 text-left">
        {{ valueMin | currency:'COP':'$': '1.0-0' }}
      </div>
      <div class="col-6 text-right">
        {{ valueMax | currency:'COP':'$': '1.0-0' }}
      </div>
    </div>
    <div class="p-3 w-100">
      <p-slider class="py-4" [formControlName]="input.key" (onSlideEnd)="onSlideEnd($event)" (onChange)="onChange($event)" [(ngModel)]="rangeValues" [min]="100000" [max]="10000000" [range]="true"></p-slider>
    </div>
    <!-- Message error -->
    <app-validator-error *ngIf="input && form" [input]="input" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>
  </div>
  <input type="hidden" [id]="input.key" [value]="input.value" />
  `,
  styles: [
  ]
})
export class SliderRangeComponent implements OnInit,OnChanges {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  @Input() optionMakers:any

  rangeValues: number[] = [];
  valueMin?: number;
  valueMax?:number;
  
  ngOnInit(): void {
    if(this.optionMakers){
      this.valueMin =  100000;
      this.valueMax =  10000000;
      this.rangeValues=[this.valueMin, this.valueMax];
    }
    // console.log(this.rangeValues);
  }

  ngOnChanges(): void {
    this.setPreviousValue()
  }

  
  setPreviousValue = () => {  
    if(this.oldValue){
      this.formcontrol.setValue(this.oldValue);
    }
  }

  onChange(event:any){
    // console.log('MOSTRAMOS CAMBIO DE SLIDE', event);
    this.valueMin =  Number(event.values[0]);
    this.valueMax =  Number(event.values[1]);
  }

  onSlideEnd(event:any){
    // console.log('MOSTRAMOS VALOR FINAL', event);
    this.formcontrol.setValue(event.values);
    if(this.onBlurFunction){
      if(typeof this.onBlurFunction==="function"){
        this.onBlurFunction(event,this)
      }
    } 
  }

}
