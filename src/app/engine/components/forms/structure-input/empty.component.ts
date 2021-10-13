import { Input, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';
@Component({
  selector: 'app-empty',
  template: `
  <div  [class]="input.classGrid" ></div>
  `,
  styles: [
  ]
})
export class EmptyComponent implements OnChanges {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  ngOnChanges(): void {
  }

}
