import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';

@Component({
  selector: 'app-file',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <div class="row">
      <div class="col-12 col-lg-6" [ngClass]="input.inputFileClass">
        <!-- Label -->
        <label
        *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
        [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
        <!-- Input -->
        <div class="custom-file">

          <input class="custom-file-input" 
            [formControlName]="input.key" 
            [id]="input.key" type="file"
            (change)="fileEvent($event)">
          
          <!-- Message error -->
          <app-validator-error *ngIf="input && form" [input]="input" [statusCustomError]="statusCustomError" [customError]="customError" [submitted]="submitted" [formcontrol]="formcontrol" [form]="form" class="message-error"></app-validator-error>

          <label class="custom-file-label" [attr.for]="input.key" data-browse="Seleccionar archivo">{{file?.name || "Seleccionar archivo"}}</label>
      
        </div>
      </div>
      <div class="list-file-added pt-4 pt-lg-0 col-12 col-lg-6 ng-star-inserted d-flex align-items-center flex-wrap" *ngIf="oldValue">
        <!-- BTN VER -->
        <div class="col-12 px-0">
          <h5 class="text-gris_1 text-lightFont text-sm w-100">Existe un archivo cargado previamente.</h5>
        </div>   
        <div class="col-12 px-0">
          <a [href]="oldValue" target="_blank" class="btn btn-sm px-0 d-inline-flex align-items-center justify-content-center">
            <i class="las la-lg la-download btn-iconAction btn-iconAction_download"></i>
            <span>Ver archivo</span>
          </a>
        </div>
      </div>
    </div>
  </div>`,
  styles: [
  ]
})
export class FileComponent implements  OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changes-file",changes)
    if('oldValue' in changes && this.oldValue)
    this.setPreviousValue()
  }



  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  file!:File;

  oldFileName:string=""

  customError:any;
  statusCustomError:boolean = false;

  setPreviousValue = () => {
    if(this.oldValue){
      if(typeof this.oldValue!=="string")
        this.oldValue=this.oldValue.FILE

      //console.log(this.oldValue)
      this.oldFileName = this.oldValue.split("/").pop()
    }
  }

  Validate = (myFile:File):boolean => {

    this.customError= '';

    const maxSize = 8388608
    const allowedTypes:string[] = ["doc","docx","png","pdf","jpg","jpeg","bmp"]

    const filetype = myFile?.name.split('.').pop()??''
    const size = myFile?.size??0

    // console.log("filetype",filetype,"size",size)

    if(size>maxSize){
      this.statusCustomError = true;
      this.customError="Tamaño de archivo excedido. Máximo: "+(maxSize/(1024*1024))+ " MBs"
      return false
    }
    //console.log("filetype in allowedTypes",filetype in allowedTypes)
    if(allowedTypes.indexOf(filetype.toLowerCase())=== -1){
      // console.log('ENTRAMOS AQUI');
      this.statusCustomError = true;
      this.customError="Tipo de archivo incorrecto, solo se permiten: "+allowedTypes.join(', ')
      return false
    }
    return true
  }


  fileEvent = ($event:any) => {
    
    this.customError = ''; 
    this.statusCustomError = false;

    const myFile:File = $event.target.files[0];
    
    if(this.Validate(myFile)){
      this.file = myFile;
      (this.formcontrol as MyCustomFormControl).args = this.file;
    }
    //console.log("myFile=>",myFile,"   this.customError=>",this.customError)

    
    // console.log(this.formcontrol);
  }

}
