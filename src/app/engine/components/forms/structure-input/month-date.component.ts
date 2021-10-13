import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { MyCustomFormControl } from '../classes/generic-form.classes';


@Component({
  selector: 'app-month-date',
  template: `
  <div [formGroup]="form"  [ngClass]="(input.visible)?'':'d-none'">
    <div class="p-inputMontDate p-field p-col-12">
      <label for="monthpicker">{{input.label}} <span class="text-xs" *ngIf="input.required">(Requerido)</span></label>
      <p-calendar 
        [formControlName]="input.key"
        (onSelect)="selectMonth($event)" 
        [(ngModel)]="date" 
        view="month" 
        dateFormat="yy-mm-dd" 
        [showSeconds]="false"
        [yearNavigator]="true" 
        yearRange="2000:2030" 
        [readonlyInput]="true" 
        [showTime]="false"></p-calendar>
    </div>
  </div>
  <input type="hidden" [id]="input.key" [value]="input.value" />
  `,
})
export class MonthDateComponent implements OnChanges{
  ngOnChanges(): void {
  //console.log("oldValue",this.oldValue)
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
    this.setPreviousValue();
  }

  
  @Input() title:any = '';
  @Input() input:any = [];
  @Input() form = new FormGroup({});
  @Input() submitted:boolean=null!;
  @Input() formControls:any;
  @Input() oldValue:any;

  @Input() onFocusFunction:any;
  @Input() onBlurFunction:any;
  @Input() formcontrol:MyCustomFormControl=null!;

 
  date!:any;
  dateSelected:any;
  
  invalidDates!: Array<Date>
  minDate!: Date;

  maxDate!: Date;

  private es = {
    firstDayOfWeek: 1,
    dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    dayNamesMin: [ "D","L","M","X","J","V","S" ],
    monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    today: 'Hoy',
    clear: 'Borrar'
  }

  selectMonth(event:any){
    // console.log(event);
    const finalDate = new Date(event.getTime() - (event.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
    this.dateSelected = finalDate; 
    // this.date=this.dateSelected
    this.formcontrol.setValue(this.dateSelected);
    // console.log(this.dateSelected);
  }

  setPreviousValue = () => {
    if(this.oldValue){
      const myDate = new Date(this.oldValue);
      let month = myDate.getMonth()+1;
      let year = myDate.getFullYear();
      this.date = new Date(year+"-"+month+"-01").toISOString().split("T")[0];
      this.dateSelected = this.date; 

      this.formcontrol.setValue(this.dateSelected);
      
    }     
  }
 
}