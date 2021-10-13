import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { ConectorFormulario, ConectorInputForm, StructureInput } from '../classes/generic-input-base.classes';

@Component({
    selector: 'app-form-proccesor-never-used',
    template: ``
  })
export class FormProcessorComponent implements OnInit{
  constructor() {}
  ngOnInit(): void {
  }
  
  @Input() oldValues: any;

  ready = false;

  inputReady:any = {}
  
  @Input() conectorFormulario:any;

  @Input() title:any = '';

  @Input() requiereValoresPrevios:boolean=true;
  
  @Input() inputs:any = [];

  firstBoot = true;

  formCreated: Subject<boolean> = new Subject();

  conectoresInputForm = [];

}
