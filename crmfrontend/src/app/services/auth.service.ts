import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8091'; // My  backend URL is as a baseUrl in AuthService

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register` , data);
  }

  login(data: any) {
    return this.http.post( `${this.baseUrl}/login` , data);
  }
}