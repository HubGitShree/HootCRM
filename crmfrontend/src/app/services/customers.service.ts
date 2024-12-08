import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = 'http://localhost:8091/customers'; // the backend url is http://localhost:8091/customers

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  //nick
  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, customer);

  }

  getCustomersByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${category}`);
  }
}