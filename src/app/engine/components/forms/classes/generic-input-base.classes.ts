import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MyCustomFormControl } from "./generic-form.classes";

export class StructureInput<T> {
  value: T;
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  classGrid: string;
  conditionalClass?:string;
  inputFileClass?:string;
  options: any;
  validators?: ValidatorFn[];
  visible: boolean=true;
  params: any;

  setVisible = (state:boolean) =>{
    this.visible = state
  }

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      placeholder?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      classGrid?: string;
      conditionalClass?:string;
      inputFileClass?:string;
      params?:any;
      options?: any;
      validators?: ValidatorFn[];
      visible?:boolean;
    } = {}) {
      this.myOptions=options
      if(options.visible!==undefined){
        this.visible= options.visible!
      }

    this.value = options.value!;
    this.params = options.params;
    this.conditionalClass = options.conditionalClass || '';
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.classGrid = options.classGrid || '';
    this.inputFileClass = options.inputFileClass || '';
    this.options = options.options || [];
    this.validators = options.validators;
  }

  myOptions:any

  getOptions = () => {return this.myOptions}
  getControlType = () => {return this.controlType}
}

export class ConectorInputForm {

  input:StructureInput<any>
  control:MyCustomFormControl=null!;
  onBlurFunction:any;
  onFocusFunction:any;

  constructor(structureInput:StructureInput<any>){
    this.input = structureInput
  }

  setFormControl(control:MyCustomFormControl){
    this.control = control
  }

  setonBlurFunction(onBlurFunction:() => void){
    this.onBlurFunction = onBlurFunction
  }

  setonFocusFunction(onFocusFunction:() => void){
    this.onFocusFunction = onFocusFunction
  }

}

export class ConectorFormulario {

  conectoresInputForm:ConectorInputForm[] = []

  form:FormGroup=null!;

  oldValuesCargados:boolean=false;
}
