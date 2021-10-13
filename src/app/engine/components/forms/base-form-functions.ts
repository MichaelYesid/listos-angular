import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarStatusService } from "src/app/components/dashboard-cv/services/sidebar-status.service";
import { FormFetcherService } from "../../services/form-connection/form-fetcher.service";
import { FormPusherService } from "../../services/form-connection/form-pusher.service";
import { BaseFormContext } from "./base-form.context";
import { GenericFormComponent } from "./structure-form/structure-form.component";

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
