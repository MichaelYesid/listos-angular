import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-structure-form-row',
  templateUrl: './structure-form-row.component.html',
  styles: [
  ]
})
export class StructureFormRowComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    // console.error("form-row")
  }

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;
  @Input() input:any;
  @Input() title:any;
  @Input() submitted:any;
  @Input() submitting:any;
  @Input() form:any = new FormGroup({});
  @Input() oldValue:any;
  @Input() paramns:any;
  @Input() options:any;

}
