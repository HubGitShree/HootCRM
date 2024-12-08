import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LeadService } from '../../../services/leads.service';

@Component({
  selector: 'app-create-lead-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-lead-dialog.component.html',
  styleUrls: ['./create-lead-dialog.component.css'],
})

//  reactive form -> form builder -> form group -> form control


export class CreateLeadDialogComponent {
  leadForm: FormGroup;
  customers: any[] = [];
  salespersons: any[] = [];

  // indie constructor , form ctrl ;  outside - FormGroup
  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    public dialogRef: MatDialogRef<CreateLeadDialogComponent>
  ) {
    this.leadForm = this.fb.group({                // the following r ur form contols
      customerId: ['', Validators.required],
      salespersonId: ['', Validators.required],
      status: ['', Validators.required],
      pipelineStage: ['', Validators.required],
    });

    // this.fetchCustomersAndSalespersons();  // caalling this in the constructor

    this.fetchCustomersAndUnassignedSalespersons(); // calling customers and unassigned salespersons in the constructor instead
  }

  // fetchCustomersAndSalespersons(): void {
  //   this.leadService.getCustomers().subscribe((data) => (this.customers = data));
  //   this.leadService.getSalespersons().subscribe((data) => (this.salespersons = data));
  // }

  fetchCustomersAndUnassignedSalespersons(): void {
    this.leadService
      .getUnassignedCustomers()
      .subscribe((data) => (this.customers = data));
    this.leadService
      .getUnassignedSalespersons()
      .subscribe((data) => (this.salespersons = data));
  }

  // PREVIOUS ONSUBMIT : THIS IS SENDING THE ENTIRE LEAD OBJCT ITH NULL VALUES FOR CUST AND SALESPRSN
  // onSubmit(): void {
  //   if (this.leadForm.valid) {
  //     this.leadService.createLead(this.leadForm.value).subscribe(() => {
  //       this.dialogRef.close(true); // close the dialog  .. this should work
  //     });
  //   }
  // }

  // NEW ONSUBMIT TO ALIGN WITH BACKEND
  onSubmit(): void {
    if (this.leadForm.valid) {
      const leadData = {
        customerId: this.leadForm.value.customerId, //  this.leadform.value is a Customer obj,,extact cust id from there
        salespersonId: this.leadForm.value.salespersonId,
        status: this.leadForm.value.status,
        pipelineStage: this.leadForm.value.pipelineStage,
      };

      this.leadService.createLead(leadData).subscribe(
        // send the leadData instead of the entire lead object
        (response) => {
          console.log('Lead created successfully:', response);
          this.dialogRef.close(true); // close the dialog after successful creation
        }, // angular material makes it so much easier ;')
        (error) => {
          // data returned to componnet that opened the dialog
          console.error('Error creating lead:', error);
        }
      );
    }
  } // end of onsubmit method
}
