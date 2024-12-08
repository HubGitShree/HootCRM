import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DemographychartComponent } from './demographychart/demographychart.component';
import { Statscard2Component } from './statscard2/statscard2.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, DemographychartComponent, Statscard2Component],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentTime: string = ''; // current time variable; interpolate it in the template
  private timerId: any; // reference to the interval

  ngOnInit(): void {
    //update time every second=1000ms
    this.timerId = setInterval(() => {
      const now = new Date(); //getting current date and time
      this.currentTime = now.toLocaleTimeString(); //format time (hh:mm:ss AM/PM)
    }, 1000);
  }
  ngOnDestroy(): void {
    // if I dont do this then the timer will keep running even after the component is destroyed
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}