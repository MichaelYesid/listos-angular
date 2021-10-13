import { ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyCustomFormControl } from '../classes/generic-form.classes';
import SignaturePad from 'signature_pad';
import { AbstractValueSetter } from './base/abstract-value-setter.helper';


@Component({
  selector: 'app-signature',
  templateUrl:'./base/signature.component.html',
  styles: [
  ],
})
export class SignatureComponent extends AbstractValueSetter {

  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted?:boolean;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

  canvasPreviewElement:any;
  dibujoCanvas:any;
  activeIndex:any;
  recording:boolean=false;


  signatureParamsTitle:string='';
  signatureParams:string[]=[]

  url:any=null!;

  cambiarPestana = ($event:any) => {
    // console.log($event)
  }

  setAsRecording = () => {
    this.recording = true;
  }

  ngOnInit() {
    let params = this.input.params
    this.signatureParamsTitle = params.shift()
    this.signatureParams = params
    this.signaturePad = new SignaturePad(this.canvasSignature.nativeElement);
    this.previewPad = new SignaturePad(this.canvasPreview.nativeElement);
    this.activeIndex=0
    this.setPreviousValue()
    this.currentFont=this.fontOptions[0].key
    this.canvasSignature.nativeElement.height = this.canvasSignature.nativeElement.width/4
    this.canvasPreview.nativeElement.height = this.canvasPreview.nativeElement.width/4
    this.dibujoCanvas = this.canvasSignature.nativeElement.getContext('2d');
    this.disableSignaturePad(this.previewPad)
    this.canvasPreviewElement = this.canvasPreview.nativeElement.getContext('2d');
    // this.textoFirmaActual = this.signatureParamsTitle
    this.canvasPreviewElement.fillStyle = 'black'; 
  }

  initComponent = () => {
    
  }

  file:File=null!;


  cambiarTab = ($event:any) => {
    const currentTab:number = $event.index
    if(currentTab!==this.activeIndex){
      this.activeIndex = currentTab
      this.previewTabData(currentTab)
    }
      
  }

  previewTabData = (currentTab:number)=> {
    // console.log("Preview",currentTab)
    this.clearCanvas(this.canvasPreviewElement)
    if(currentTab===0){
      this.CargarModeloTab1()
    }else if (currentTab===1){
      this.CargarModeloTab2()
    }else{
      this.CargarModeloTab3()
    }
  }

  imageData_processed_fromDraw:any=null!

  CargarModeloTab1 = () => {
    if(this.imageData_processed_fromText){
      this.setModel(this.imageData_processed_fromText)
    }else{
      this.setModel(null)
    }
    this.DrawScaledImageData(this.canvasPreviewElement,this.imageData_processed_fromText)
  }

  CargarModeloTab2 = () => {
    if(this.imageData_processed_fromDraw && this.toquesEnPadImagen){
      this.setModel(this.imageData_processed_fromDraw)
    }else{
      this.setModel(null)
    }
    this.imageData_processed_fromDraw = this.canvasSignature.nativeElement.toDataURL()
    this.DrawScaledImageData(this.canvasPreviewElement,this.imageData_processed_fromDraw);
  }

  CargarModeloTab3 = () => {
    if(this.imageData_processed_file){
      this.setModel(this.imageData_processed_file)
    }else{
      this.setModel(null)
    }
    this.DrawScaledImageData(this.canvasPreviewElement,this.imageData_processed_file)
  }




  

  dataURLtoBlob = (dataurl:any) => {
    // console.log("url to blob",dataurl)
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}



  setModel = (content:any) => {
    if(content){
      if(content instanceof File){
        (this.formcontrol as MyCustomFormControl).args = content
      }else{
        const content_blob:Blob = this.dataURLtoBlob(content);
        (this.formcontrol as MyCustomFormControl).args = content_blob
      }
    }else{
      (this.formcontrol as MyCustomFormControl).args = null
    }

  }

  toquesEnPadImagen:number = 0;

  imageData_processed_file:any = null!;

  OnLoadImage = (event: any) => {
      // console.log("ON LOAD",event)
      const raw_imageData =  event.target.result;
      this.ProcessAndDrawRawImage(this.canvasPreview,this.canvasPreviewElement,raw_imageData)
    };


  OnFailOnLoadImage = (event: any) => {
    // console.log("File could not be read: " + event.target.error.code);
  };

  actualizarSignaturePad = () => {
    if(this.recording === true){
      this.recording = false;
      this.toquesEnPadImagen++
      // console.log("signature pad actualizado")
      this.imageData_processed_fromDraw = this.canvasSignature.nativeElement.toDataURL()
      this.setModel(this.imageData_processed_fromDraw)
      this.DrawScaledImageData(this.canvasPreviewElement,this.imageData_processed_fromDraw);
    }

  }

  isEmail:boolean=false;
  signaturePlaceholder:string="Escribe tu nombre para generar automáticamente tu firma"

  onBlur = ($event:any) => {
    // console.log("vscvsev",this.onBlurFunction)
    if(this.onBlurFunction){
      if(typeof this.onBlurFunction==="function"){
        this.onBlurFunction($event,this)
      }
    }
  }

  tabData:any[] = []

  disableSignaturePad = (signaturePad:any) => {
    // console.log(signaturePad)
    signaturePad.off();
  }

  fontBase = '18px ';

  fontOptions:any[]=[
    {key:'Yellowtail',value:'Yellowtail'},
    {key:'Akaya Kanadaka',value:'Akaya Kanadaka'},
    {key:'Dancing Script',value:'Dancing Script'},
    {key:'Nova Mono',value:'Nova Mono'},
    {key:'Syne Mono',value:'Syne Mono'},
  ]

  onChangeFont = ($event:any) => {
    this.currentFont = $event.target.value
    this.updateOutputTextCanvas()
  }

  currentFont:string=''

  obtenerClass = () => {
    return {
      'is-valid': this.formcontrol.valid && (this.formcontrol.dirty || this.formcontrol.touched), 
      'is-invalid': (this.submitted && this.formcontrol.errors) || ( this.formcontrol.invalid && (this.formcontrol.dirty || this.formcontrol.touched)) }
  }

  textoFirmaActual:string="";

  updateText = ($event:any) => {
    // console.log("updatetext",$event.target.value)
    this.textoFirmaActual = $event.target.value
    this.updateOutputTextCanvas()
  }

  clearCanvas = (canvas:any) => {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
  }


  getWholeImageData = (canvas:any) => {
    return canvas.getImageData(0, 0, canvas.canvas.width, canvas.canvas.height);
  }

  
  ProcessAndDrawRawImage = (canvas:any,ctx:any,imgSrcAsUrl:any) => {
    let img = new Image();
    img.src = imgSrcAsUrl;
    // console.log("imgSrcAsUrl",imgSrcAsUrl)
    const baseElem = this
    img.onload = function(){
      const iw = img.width;
      const ih = img.height;
 
 
      const canvasScale = ctx.canvas.height / ctx.canvas.width
      const imgScale =  iw/ih
      // console.log(iw,ih,ctx.canvas.height,ctx.canvas.width)
      let scale = null
      if(imgScale>canvasScale){
        scale=ctx.canvas.height/ih
       
      }else{
        scale=ctx.canvas.width/iw
      }
      // console.log("scale",scale)
      
 
         const iwScaled = iw * scale;
         
         const ihScaled = ih * scale;
      ctx.drawImage(img, 0, 0,iwScaled,ihScaled);

      baseElem.imageData_processed_file =canvas.nativeElement.toDataURL();
      baseElem.setModel(baseElem.imageData_processed_file)
    }
  }

  DrawScaledImageData = (canvas:any,imageData:any) => {
    if(imageData){
      let img = new Image();
      img.src = imageData;
      // console.log("imageData",imageData)
      img.onload = function(){
        canvas.drawImage(img, 0, 0)
      }
      
      
      
    }else{
      this.clearCanvas(canvas)
    }
  }

  imageData_processed_fromText:any=null!;
    
  updateOutputTextCanvas = () => {
    this.clearCanvas(this.canvasPreviewElement)
    this.canvasPreviewElement.textAlign = 'left';
    this.canvasPreviewElement.textBaseline = 'middle';
    this.canvasPreviewElement.font =this.fontBase+this.currentFont
    this.canvasPreviewElement.fillText(this.textoFirmaActual, this.canvasPreview.nativeElement.width/10, this.canvasPreview.nativeElement.height/2);
    this.imageData_processed_fromText = this.canvasPreview.nativeElement.toDataURL();
    this.setModel(this.imageData_processed_fromText)
  }

  ValidateFile = (myFile:File):boolean => {
    // console.log(myFile)
    this.customError=undefined
    const maxSize = 8388608
    const allowedTypes:string[] = ["png","jpg","jpeg","bmp"]

    const filetype = myFile?.name.split('.').pop()??''
    const size = myFile?.size??0

    //console.log("filetype",filetype,"size",size)

    if(size>maxSize){
      this.customError="Tamaño de archivo excedido. Máximo: "+(maxSize/(1024*1024))+ " MBs"
      // console.log(this.customError)
      return false
    }
    //console.log("filetype in allowedTypes",filetype in allowedTypes)
    if(allowedTypes.indexOf(filetype)=== -1){
      // console.log(this.customError)
      this.customError="Tipo de archivo incorrecto, solo se permiten: "+allowedTypes.join(', ')
      return false
    }
    return true
  }

  eraseCanvas = ($event:any) => {
    this.toquesEnPadImagen = 0;
    $event.preventDefault()
    this.clearCanvas(this.dibujoCanvas)
    this.clearCanvas(this.canvasPreviewElement)
    this.imageData_processed_fromDraw=null
    this.setModel(this.imageData_processed_fromDraw)
  }

  cargarImagenEnCanvas = () => {
    if(this.file){
      const reader = new FileReader();
      reader.readAsDataURL(this.file)
      reader.onload = this.OnLoadImage
      reader.onerror = this.OnFailOnLoadImage
    }

  }

  fileEvent = ($event:any) => {
    const myFile:File = $event.target.files[0];
    // console.log("PRUEBA2222")
    if(this.ValidateFile(myFile)){
      // console.log("validacon ok")
      this.file = myFile
      this.cargarImagenEnCanvas()
    }
    //console.log("myFile=>",myFile,"   this.customError=>",this.customError)
    // console.log(this.formcontrol);
  }

  myTabset:number=null!;

  constructor() {
    super()
   }
  

  public signaturePad: SignaturePad=null!;
  public previewPad: SignaturePad=null!;

  @ViewChild('canvasSignature', {static: true }) public canvasSignature: ElementRef=null!;
  @ViewChild('canvasPreview', {static: true }) public canvasPreview: ElementRef=null!;

  oldFileName:string=""

  customError:any;


  setPreviousValue = () => {
    if(this.oldValue){


      // this.formcontrol.setValue(this.oldValue);  //Si no fuera FILE

      if(typeof this.oldValue!=="string")
        this.oldValue=this.oldValue.FILE

      //console.log(this.oldValue)
      this.oldFileName = this.oldValue.split("/").pop()
    }
  }

}
