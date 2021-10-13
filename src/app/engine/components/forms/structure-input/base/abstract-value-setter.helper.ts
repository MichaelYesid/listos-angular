export abstract class AbstractValueSetter {

  abstract formcontrol:any;
  finalValue?:any;
  abstract input:any
  abstract form:any
  valueSet(event:any){
    // console.log(event.target.value);
    this.finalValue = event.target.value;
  }
  
  valueSetCustom(value:any){
    // console.log("guardando value",value)
    this.formcontrol.setValue(value)
    // console.log(event.target.value);
    this.finalValue = value
  }
}