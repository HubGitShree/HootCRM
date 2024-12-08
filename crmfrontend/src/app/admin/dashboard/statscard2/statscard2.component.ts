import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { DemographyService } from '../../../services/demography.service';

@Component({
  selector: 'app-statscard2',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './statscard2.component.html',
  styleUrl: './statscard2.component.css'
})
export class Statscard2Component implements OnInit {
  isBrowser!: boolean; // isBrowser isa variable; its definitely assigned

 

  constructor(
    @Inject(PLATFORM_ID) private platfromId: any,
    private demographyService: DemographyService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platfromId);

    this.getCustomerDemography(); // call the function to get the data
  }

  // now lets define the function to get the data
  getCustomerDemography() {
    this.demographyService.getCustomerDemography().subscribe(
      (res: any) => {
        console.log(res)
        // Map backend response to chart data
        this.barChartData.labels = res.map(
          (item: any) => item.State || 'Unknown'
        ); // Map state names
        this.barChartData.datasets[0].data = res.map((item: any) => item.Count); // Map counts
        console.log(this.barChartData); // Log the chart data
      },
      (error) => {
        console.error('Error fetching demography data:', error); // Handle errors
      }
    );
  }

   // chart data object
  barChartData = {
   labels: [] as string[], // labels is an array of strings
   datasets: [
    {
      data: [], // data is an array of numbers
      label: 'Leads Converted', // label is a string
      backgroundColor: [
       // backgroundColor is an array of strings
       'rgba(139, 69, 19, 0.2)',
       'rgba(160, 82, 45, 0.2)',
       'rgba(210, 105, 30, 0.2)',
       'rgba(205, 133, 63, 0.2)',
       'rgba(244, 164, 96, 0.2)',
       'rgba(222, 184, 135, 0.2)',
       'rgba(139, 69, 19, 0.2)',
       'rgba(160, 82, 45, 0.2)',
       'rgba(210, 105, 30, 0.2)',
       'rgba(205, 133, 63, 0.2)',
       'rgba(244, 164, 96, 0.2)',
       'rgba(222, 184, 135, 0.2)',
       'rgba(139, 69, 19, 0.2)',
      ],
      hoverBackgroundColor: [
       'rgba(139, 69, 19, 0.4)',
       'rgba(160, 82, 45, 0.4)',
       'rgba(210, 105, 30, 0.4)',
       'rgba(205, 133, 63, 0.4)',
       'rgba(244, 164, 96, 0.4)',
       'rgba(222, 184, 135, 0.4)',
       'rgba(139, 69, 19, 0.4)',
       'rgba(160, 82, 45, 0.4)',
       'rgba(210, 105, 30, 0.4)',
       'rgba(205, 133, 63, 0.4)',
       'rgba(244, 164, 96, 0.4)',
       'rgba(222, 184, 135, 0.4)',
       'rgba(139, 69, 19, 0.4)'
      ],
    },
   ],
  };

  // chart options object
  barChartOption = {
    responsive: true,
    maintainAspectRatio: true,
    plugins : {
      legend :{
        display: false
      },
      // datalabels : {
      //   formatter: (value : any, ctx :any ) => {
      //         if ( ctx.chart.data.labels ) {
      //           return ctx.chart.data.labels[ctx.dataIndex];

      //         }
      //         return '';
      //   }
      // }
    }
  };
}
