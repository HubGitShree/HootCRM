import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemographyService {
  private baseUrl = 'http://localhost:8091/customers';

  constructor( private http : HttpClient) { }

  // fetch customer demography data
  // create a method for fetching customer demography data
  getCustomerDemography(): Observable<any> {
    console.log('Fetching customer demography data demog service');
    return this.http.get<any>(`${this.baseUrl}/demography`);
  }
  
}
