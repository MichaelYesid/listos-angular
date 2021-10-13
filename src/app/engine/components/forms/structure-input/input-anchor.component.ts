import { Input, OnChanges, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-input-anchor',
  template: ` 
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
<div class="w-100 m-0 m-0 p-0">
<input type="hidden" [formControlName]="input.key" [id]="input.key" class="form-control" [value]="input.value" />
<a *ngIf="input?.value?.href" [class]="input.value.class" [href]="input?.value?.href">
{{input.label}}
</a>
<a *ngIf="input?.value?.onClick" [class]="input.value.class" (click)="onClickFun($event)">
{{input.label}}
</a>
</div>
  </div>`,
  styles: [
  ]
})
export class InputAnchorComponent implements OnChanges {

  @Input() title:any = '';
  @Input() input:any;
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  onClickFun = ($event:any) => {
    $event.preventDefault()
    this.input?.value?.onClick(this.form.controls)
  }
  // private _input: any;
  // @Input() set input({ key, value, }) {

  //   this._input = value;
  //   //console.log(key);

  //   this.form.get(this._input['key'])?.patchValue(this._input['value']);
  //   this.form.get(this._input['key'])?.valueChanges;
  //   //console.log('SET INPUT: ', this.form.get(this.input['key']))
  // }

  // get input(): any {
  //   return this._input;
  // }

  ngOnChanges(): void {
    this.formcontrol.setValue(this.oldValue)
  }
  
}
