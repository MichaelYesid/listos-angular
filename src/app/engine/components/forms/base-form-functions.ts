import { Component } from "@angular/core";
import { BaseFormContext } from "./base-form.context";

@Component({
  selector: 'app-base-form',
  template: ``,
})
export class BaseFormFunctions extends BaseFormContext {
  inputs: any[]=null!;
  title=""
  submitted:boolean=false;
  submitting:boolean=false;
  
  
  async obtenerData() {
    return await this.conectorFormulario.form.getRawValue()
    // const form:any = 
    // console.log(form)
    // await this.PushForm()
  }
  

}
