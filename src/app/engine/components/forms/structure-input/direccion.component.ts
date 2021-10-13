import { Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import { Subscription } from 'rxjs';
import { ModalDocumentosService } from 'src/app/components/dashboard-cv/services/modal-documentos.service';

@Component({
  selector: 'app-direccion',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <div class="row">
      <div class="col-12 col-lg-6" [ngClass]="input.inputFileClass">
        
      
      <!-- Label -->
      <label
        *ngIf=" input.controlType != 'inputCheckbox' && input.controlType != 'inputHr' && input.controlType != 'inputEmpty'  && input.type != 'checkbox' && input.type != 'radio' && input.type != 'checkbox'"
      [attr.for]="input.key">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
      <!-- Input -->
      <input autocomplete="off" [value]="model" [type]="input.type"
      class="form-control"
      [readonly]="true"
      (blur)="onBlurInput($event)"
      [ngClass]="obtenerClass()">
      </div>
      <div class="pt-4 pt-lg-0 col-12 col-lg-6 ng-star-inserted d-flex align-items-center flex-wrap" >

        <div class="col-12 px-0">
        &nbsp;
        </div>   
        <div class="col-12 px-0">
          <button (click)="onEditDireccion($event)" class="btn btn-sm px-0 d-inline-flex align-items-center justify-content-center">
            <i class="las la-lg la-edit btn-iconAction btn-iconAction_download"></i>
            <span>Clik para digitar dirección</span>
          </button>
        </div>

      </div>
    </div>

    <p-dialog class="modal-direccion_dane" [header]="input?.params?.tituloModal || 'Modificar Dirección'" *ngIf="formcontrol"
      [(visible)]="displayModal" 
      [modal]="true" 
      [closable]="true"
      [style]="{width: '75vw'}" 
      [baseZIndex]="10000"
      [draggable]="false" [resizable]="false">
      
      <div class="row d-flex align-items-center">
        <div class="col-12 col-sm-6 col-md-4 text-bold py-2 py-lg-0">
          DIRECCIÓN CON CODIFICACION
        </div>
        <div class="col-12 col-sm-6 col-md-6 py-2 py-lg-0" *ngIf="model?.length">
          {{model}}
        </div>
        <div class="col-6" *ngIf="!model?.length">
          ---
        </div>
        <div class="col mt-2 mt-lg-0">
          <button (click)="resetModel($event)" class="btn btn-primary">Limpiar</button>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <app-form-direccion (onCambioDireccion)="onCambioDireccion($event)" (onCancelEditForm)="onCancelEdit()"></app-form-direccion>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button class="btn btn-primary" (click)="saveModal($event)">Guardar y salir</button>
        </div>
      </div>

  </p-dialog>



  </div>`,
  styles: [
  ]
})
export class DireccionComponent implements  OnChanges,OnInit, OnDestroy {

  constructor(private modalDocumentosService:ModalDocumentosService){

  }

  touched:boolean=false;

  onBlurInput = ($event:any) => {
    this.touched = true
  }

  ngOnInit(): void {
    this.modalSubscription = this.modalDocumentosService.onModal(true)
    .subscribe(status => {
      // console.log('MOSTRAMOS COMPONENTE CON SUSCRIPCIÓN: ',status);
      this.displayModal=status;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("changes-file",changes)
    if('oldValue' in changes && this.oldValue)
    this.setPreviousValue()
    // Si se modifica esto, revisar direccion en datos basicos
  }

  onEditDireccion = ($event:any) => {
    $event.preventDefault()
    this.touched = true
    this.modalDocumentosService.toggleShow(true);
  }

  onCambioDireccion = ($event:any) => {
    this.modelEvent($event)
  }

  obtenerClass = () => {
    return {
      'is-valid': !!this.model,
      'is-invalid': (this.submitted && (this.formcontrol.errors || !this.model)) || (!this.model && (this.formcontrol.dirty || this.touched))}
  }

  model:string='';

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  customError:any;

  displayModal: boolean = false;
  modalSubscription: Subscription = new Subscription;

  setPreviousValue = () => {
    if(this.oldValue){
      this.modelEvent (this.oldValue)
    }
  }

  closeModal(){
    this.displayModal=false
  }

  saveModal($event:any){
    $event.preventDefault()
    this.closeModal()
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.modalSubscription.unsubscribe();
  }

  modelEvent = ($event:any) => {
    this.model = $event;
    (this.formcontrol as MyCustomFormControl).args = $event;
  }

  resetModel = ($event:any) => {
    $event.preventDefault()
    this.modelEvent ("")
  }


  onCancelEdit = () => {
    this.closeModal()
  } 

}
