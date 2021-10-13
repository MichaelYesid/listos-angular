import { Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import {Component} from '@angular/core';
import { MyCustomFormControl } from '../../classes/generic-form.classes';

@Component({
  selector: 'app-validator-error',
  template: ` 
  <div [formGroup]="form">
    <div class="errorMessage text-danger mt-1 py-2 text-s"
      *ngIf="statusCustomError || ( submitted && formcontrol.errors ) || ( formcontrol.invalid && (formcontrol.dirty || formcontrol.touched ) )">
      El campo <strong>{{input.label}}</strong> {{ responseError }}
    </div>
  </div>`
})
export class ValidatorErrorComponent implements OnInit, OnChanges{
  
  @Input() submitted!:any;
  @Input() form!:FormGroup;
  @Input() customError:any;
  @Input() formcontrol:any=null!;
  @Input() input!:any;
  @Input() statusCustomError:boolean = false;

  responseError:any;

  ngOnInit(): void {
      // console.log('mostramos ng onInit: ', this.customError) 
  } 

  ngOnChanges(): void {
    // console.log('modificamos componente error: ',this.input.key);
    // console.log('mostramos en modificacion: ', this.form);
    this.responseError = this.GetErrorMessage(this.form.get(this.input.key));
  }

  GetErrorMessage(input:any){
    
    if(this.customError){
      // console.log('MOSTRAMOS ERROR CUSTOM', this.customError);
      return this.customError;
    }else{
      const errors:any = input.errors

      this.statusCustomError = false;

      // console.log('KEY: ', input , 'Err: ', errors)

      if(errors?.required){
        return "es requerido"
      }
      if(errors?.minlength){
        return "requiere mínimo "+errors.minlength.requiredLength+ " caractéres.";
      }
      if(errors?.maxlength){
        return "requiere máximo "+errors.maxlength.requiredLength+ " caractéres.";
      }
      if(errors?.pattern){
        if(errors.pattern.requiredPattern == '^[0-9]*$'){ //Numeros
          return "requiere solamente números";
        }else if(errors.pattern.requiredPattern == '^[A-Za-zÀ-ú ]+$'){ //Letras
          return "requiere solamente letras";
        }
      }
      if(errors?.email){
        return "no es un correo válido. Ejemplo: abcd@correo.com";
      }
      return "tiene errores"
    }
    
  }
  
}