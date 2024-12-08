import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule]
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  category = 'All';
  dataSource = new MatTableDataSource<any>(this.customers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.customersService.getAllCustomers().subscribe({
      next: (data: any) => {
        this.customers = data;
        this.dataSource.data = this.customers;
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  filterByCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.category = target.value;
    if (this.category === 'All') {
      this.dataSource.data = this.customers;
    } else {
      this.dataSource.data = this.customers.filter(
        (customer) => customer.category === this.category
      );
    }
  }
}