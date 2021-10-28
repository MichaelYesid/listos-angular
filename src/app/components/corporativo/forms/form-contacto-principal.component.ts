import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
// 
import { BaseFormContext } from 'src/app/engine/components/forms/base-form.context';
import { GenericHTML, GenericInput, GenericSelect } from 'src/app/engine/components/forms/classes/generic-input.classes';
import { KeyValuePair } from 'src/app/engine/context/classes/form-options-bylist.classes';
import { SolicitudContactoListosFetchContext } from '../context/forms/form-fetches.context';
import { Empty_SelfMadeContext } from '../context/forms/form-options-bylist-selfmade.context';
import { SolicitudContactoListosPushContext } from '../context/forms/form-pushes.context';


@Component({
  selector: 'app-form-contacto-principal',
  templateUrl: '../../../engine/components/forms/templates/form-no-fetch-template.html',
})
export class FormContactoPrincipalComponent extends BaseFormContext implements OnChanges, OnDestroy {
  
  @Input() pageTitle:any = '';
  @Input() MotivosContacto:any;

  label_submit:any = 'Enviar';
  
  motivoOptions:any = new Empty_SelfMadeContext({});

  onFocusFunctions: any={
  };

  onChangeFunctions: any={
  };
  // VARIABLES OPTIONS

  protected PushDataProcessor = (data: any) => {
    
    let motivoObj = this.MotivosContacto.filter( (item:any)=> item.VP_CODIGO == data['MOTIVO'] );
    let cuerpoMensaje = `Nombre: ${data['NOMBRE']}, Teléfono: ${data['TELEFONO']}, Correo electrónico: ${data['CORREO_ELECTRONICO']}`;

    let transformData = {
      "correo": motivoObj[0].CORREO,
      "link": null,
      "asunto": motivoObj[0].TEXTO + ' - Formulario de Contacto Listos',
      "titulo": 'Hola, ',
      "cuerpoMensaje": cuerpoMensaje,
      "copia": data['CORREO_ELECTRONICO'],
      "adjunto": null
    }
    return transformData

  };

  protected inputs:any[] = []

  async ngOnChanges(): Promise<void> {
    this.loadInputs().then(()=>{
      this.onInit(new SolicitudContactoListosPushContext,new SolicitudContactoListosFetchContext, false, undefined)
    })
  }

  loadInputs = async () => {

    const optionsDictionary = this.keyValueMapper(this.MotivosContacto, 'VP_CODIGO', 'TEXTO');
    this.motivoOptions = new Empty_SelfMadeContext(this.SetOptionsMap(optionsDictionary));

    this.inputs = [
      new GenericSelect({
        key: 'MOTIVO',
        label: 'Motivo',
        type: 'text',
        value: '',
        required: true,
        classGrid: 'col-12',
        options:this.motivoOptions
      }),
      new GenericInput({
        key: 'NOMBRE',
        label: 'Nombre',
        type: 'text',
        value: '',
        required: true,
        classGrid: 'col-12'
      }),
      new GenericInput({
        key: 'TELEFONO',
        label: 'Teléfono',
        type: 'text',
        value: '',
        required: true,
        classGrid: 'col-12',
        validators:this.validadoresTelCelFun()
      }),
      new GenericInput({
        key: 'CORREO_ELECTRONICO',
        label: 'Correo electrónico',
        type: 'email',
        value: '',
        required: true,
        classGrid: 'col-12',
        validators:this.validadoresTipoEmailFun()
      }),
      new GenericHTML({
        label: '',
        type: 'html',
        classGrid: 'col-12 col-lg-12',
        value: '<h5 class="pt-2 text-sm text-gris_1 mb-0">Enviar el formulario, procede con la aceptación de nuestra <a href="/web/tratamiento-datos" class="btn-link" target="_blank">política de privacidad y tratamiento de datos personales,</a> según se detalla en nuestros <a href="/web/terminos-condiciones" class="btn-link" target="_blank">términos y condiciones.</a></h5>'
      })
    ]
  }

  responseHandlerFun = async (response:any):Promise<void> => {
    console.log('MOTRAMOS RESPUESTA SERVICIO', response);
  }
  
  ngOnDestroy(): void {
    // this.saveStore.unsubscribe();
  }

  keyValueMapper = (objectoRespuesta:any[], keyid:any , keyvalue:any ) => {
    return objectoRespuesta.map(item => { 
      return {
        key: item[keyid],
        value: item[keyvalue]
     }
   })
  }

  SetOptionsMap = (kvarr: KeyValuePair[]) => {
    // console.log("SETOPTIONS--->",kvarr)
    let res: any = {}
    kvarr.map((item: KeyValuePair) => {
      res[item.key] = item.value
    })
    return res
  }

}
