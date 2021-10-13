import { Component, Input, Injectable, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Subject } from 'rxjs';
import { MyCustomFormControl } from '../classes/generic-form.classes';

import { ConectorFormulario, StructureInput } from '../classes/generic-input-base.classes';
import { GenericInput } from '../classes/generic-input.classes';
import { FormProcessorComponent } from './form-processor';


@Component({
  selector: 'app-structure-form',
  templateUrl: './structure-form.component.html',
  
})

export class GenericFormComponent  extends FormProcessorComponent{
  

  @Input() label_submit: any = 'Guardar';

  @Input() isUpdating:boolean=false;
  @Input() onlyRead = false;
  @Input() conectorFormulario:ConectorFormulario = null!

  @Input() hasSubmitButton:boolean=true;

  @Output() onCancelEdit = new EventEmitter<any>();
  @Output() payload = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  @Input() outputError:any=null!;

  @Input() customButtons:any=[]

  submitted = false;


  submitting = false;

  cancelEdit = () => {
    this.oldValues=null
      this.isUpdating=false
      this.onCancelEdit.emit()
  }

  onSubmit() {
    this.submitting=true
    // console.error("LLEGAMOS A SUBMIT, ESTE ES UPDATING:",this.isUpdating)
    // console.error("this.conectorFormulario.form",this.conectorFormulario.form)
    if(this.isUpdating===false){
      this.submitted = true;
      this.payload.emit(this.conectorFormulario.form);
    }else{
      this.submitted = true;
      this.update.emit(this.conectorFormulario.form);
    }
    setTimeout(()=>this.submitting=false,300)
  }
  

}