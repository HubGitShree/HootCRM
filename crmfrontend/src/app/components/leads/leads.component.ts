import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LeadService } from '../../services/leads.service'
import { CreateLeadDialogComponent } from './create-lead-dialog/create-lead-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [MatFormFieldModule,MatTableModule,MatPaginatorModule,MatSelectModule, CommonModule] ,
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})

export class LeadsComponent implements OnInit {
  displayedColumns: string[] = ['leadId', 'customer', 'salesperson', 'status', 'pipelineStage', 'actions'];
  dataSource = new MatTableDataSource<any>();
  stages: string[] = ['Contacted', 'Negotiation', 'Closed']; // filtering options 
  selectedStage = ''; // For filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private leadService: LeadService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchLeads();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // will fetch  bunch of leads from the db 
  fetchLeads(): void {
    this.leadService.getLeads().subscribe((data: any[]) => {
      this.dataSource.data = data;
    });
  } // end of fetch leads

  applyFilter(value : any): void {
     console.log(value); // log the value of the selected dropdown
    this.selectedStage = value; // get the selected value from the dropdown

    if ( this.selectedStage === 'All') {
      this.dataSource.filter = ''; // remove filter
    
    } else {
      this.dataSource.filter = this.selectedStage.trim().toLowerCase();  // mechanism to apply selected filter
    }

    
    // this.dataSource.filter = this.selectedStage.trim().toLowerCase();  // mechanism to apply selected filter

   
    }  // end of apply filter
  

  openCreateLeadDialog(): void {
    const dialogRef = this.dialog.open(CreateLeadDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchLeads(); // Refresh table after creating a new lead
      }
    });
  }

  deleteLead(leadId: number): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.leadService.deleteLead(leadId).subscribe({
        next: () => {
          // Remove the deleted lead from the data source
          this.dataSource.data = this.dataSource.data.filter((lead) => lead.leadId !== leadId);
          alert('Lead deleted successfully!');
        },
        error: (err : any) => {
          console.error('Error deleting lead:', err);
          alert('Failed to delete the lead. Please try again.');
        }
      });
    }
  }
  
}






// 