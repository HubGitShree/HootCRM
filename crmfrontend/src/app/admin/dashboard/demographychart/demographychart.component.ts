import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { DemographyService } from '../../../services/demography.service';

@Component({
  selector: 'app-demographychart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './demographychart.component.html',
  styleUrl: './demographychart.component.css',
})
export class DemographychartComponent implements OnInit {
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
        this.polarAreaChartData.labels = res.map(
          (item: any) => item.State || 'Unknown'
        ); // Map state names
        this.polarAreaChartData.datasets[0].data = res.map((item: any) => item.Count); // Map counts
        console.log(this.polarAreaChartData); // Log the chart data
      },
      (error) => {
        console.error('Error fetching demography data:', error); // Handle errors
      }
    );
  }

   // chart data object
   polarAreaChartData = {
    labels: [] as string[], // labels is an array of strings
    datasets: [
      {
        data: [], // data is an array of numbers
        label: 'Customer Demography', // label is a string
        backgroundColor: [
          // backgroundColor is an array of strings
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 99, 132, 0.4)'
        ],
      },
    ],
  };

  // chart options object
  polarAreaChartOption = {
    responsive: true,
    maintainAspectRatio: false,
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
