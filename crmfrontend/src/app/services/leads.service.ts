import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private baseUrl = 'http://localhost:8091';

  constructor(private http: HttpClient) {}

  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leads`);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers`);
  }

  getSalespersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/salespersons`);
  }

  getUnassignedCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers/unassigned`);
  }

  getUnassignedSalespersons(): Observable<any[]> {
    console.log(`${this.baseUrl}/salespersons/unassigned`)
    return this.http.get<any[]>(`${this.baseUrl}/salespersons/unassigned`);
    
  }

  // createLead(lead: any): Observable<any> {
  //   console.log(lead);
  //   return this.http.post<any>(`${this.baseUrl}/leads`, lead);
  // }

  // new createleAD METHOD CHANGING THE REQUEST PAYLOAD
  createLead(lead: any): Observable<any> {
    // Extract the required fields from the lead object
    const leadRequest = {
      customerId: lead.customerId,
      salespersonId: lead.salespersonId,
      status: lead.status,
      pipelineStage: lead.pipelineStage,
    };
  
    console.log(leadRequest); // LOGGING the final request object for debugging
  
    return this.http.post<any>(`${this.baseUrl}/leads`, leadRequest);
  }
  

  deleteLead(leadId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/leads/${leadId}`);
  }
}