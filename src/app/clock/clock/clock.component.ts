import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { ClockServiceService } from 'src/app/clock-service.service';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  digits: number[]=[1,2,3,4,5,6,7,8,9,10,11,12];
  setTime: Date = new Date();
  hourHandPosition = 0;
  minuteHandPosition = 0;
  secondHandPosition = 0;
  timeObject = {
    day:'',
    month:'',
    year:'',
    hour: '',
    minute: '',
    second: '0'
  }

  conditionalStyleClass = '';


  numbersCounter(i: number) {
    return new Array(i);
  }
  
 time:Observable<any>[]=[];
  constructor(private clockService:ClockServiceService) { }

  ngOnInit(): void {
    this.hitClockService();
  }

  counter!: Subscription;
  setClock() : void{
      let second = this.setTime.getSeconds();
      let minute = this.setTime.getMinutes();
      let hour = this.setTime.getHours();
      let day = this.setTime.getDate();
      let month = this.setTime.getMonth()+1; //if returns 0 
      let year = this.setTime.getFullYear();
      
      this.timeObject.day = this.displayDoubleDigits(day);
      this.timeObject.month = this.displayDoubleDigits(month);
      this.timeObject.year = this.displayDoubleDigits(year);
      this.timeObject.hour = this.displayDoubleDigits(hour);
      this.timeObject.minute = this.displayDoubleDigits(minute);
      this.timeObject.second = this.displayDoubleDigits(second); 

      this.secondHandPosition = second*6;
      this.minuteHandPosition = minute*6;
      this.hourHandPosition = ((hour>11 ? hour-12 : hour )*30)+ Math.floor(minute/12)*6 ;


      if(second%2==0){
        this.conditionalStyleClass = "ry";
      }
      else{
        this.conditionalStyleClass = "rn";
      }
  }

  displayDoubleDigits(value: number): string{
    return('00'+ value).slice(-2);
  }

  hitClockService(): void{
    this.clockService.clockDate.subscribe((res: Date)=>{
      this.setTime = res;
      this.setClock();
    })
  }

}


