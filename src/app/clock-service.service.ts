import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockServiceService {
  
  clockDate: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  constructor() {
    setInterval(() => {
     const dateToSet: Date = this.clockDate.value;
     dateToSet.setSeconds(dateToSet.getSeconds() + 1);
     this.clockDate.next(dateToSet);
    }, 1000);
  }
}

