

import { Component, VERSION, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-sales-pipeline',
  standalone: true,
  imports: [DragDropModule, CommonModule],
 
templateUrl: './sales-pipeline.component.html',
  styleUrl: './sales-pipeline.component.css'
})


export class SalesPipelineComponent implements OnInit {
  name = 'Angular Sales Pipeline Visualization';
   a : number = 5;

  public salesPipeline !: Board;

  constructor(private http : HttpClient) {}

  public ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8091/leads').subscribe((leads) => {

      // mapping backend leads to the kanban structure 
      const columns = [
        new Column('Contacted', '1', []),
        new Column('Negotiation', '2', []),
        new Column('Closed', '3', [])
      ]; 

      // leads.forEach( (lead) => {
      //   const task = {
      //     leadId: lead.leadId,
      //     customer: lead.customer.name,
      //     salesperson: lead.salesperson.name,
      //     pipelineStage: lead.pipelineStage
      //   };

      //   // add this task to the appropriate column
      //   // logic goes here
      //   const column = columns.find( (col) => col.name === lead.pipelineStage);
      //   if (column) {
      //     // task.pipelineStage = lead.pipelineStage;
      //     column.leads.push(task);
      //   }
      // });

      leads.forEach((lead, index) => {
        const randomColumnIndex = index % columns.length; // Assign cyclically or use Math.random()
        const task = {
          leadId: lead.leadId,
          customer: lead.customer.name,
          salesperson: lead.salesperson.name,
          // pipelineStage: lead.pipelineStage
        };
        columns[randomColumnIndex].leads.push(task);
      });



    // before salespipeline is rendered, lets bring in the leads details
    this.salesPipeline = new Board('Sales pipeline', columns)
    });

    
  }

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.salesPipeline.columns,
      event.previousIndex,
      event.currentIndex
    );
  }

  // public drop(event: CdkDragDrop<string[]>): void {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  public drop(event: CdkDragDrop<{ leadId: number; customer: string; salesperson: string  }[]>): void {
    if (event.previousContainer === event.container) {
      // Handle reordering within the same column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Handle moving between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

       // Update the pipelineStage of the moved task
    const movedTask = event.container.data[event.currentIndex];
    const newStage = this.salesPipeline.columns.find(
      (col) => col.id === event.container.id
    )?.name;

    



    }
  }
}
