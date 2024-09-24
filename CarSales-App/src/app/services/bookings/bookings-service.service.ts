import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsServiceService {

  private apiUrl = 'http://localhost:8082/api/v1/testDrive';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //fetch all booking forms
  getBookings(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }
  //fetch one products 
  getBooking(id: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //post a product
  postBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookingData, this.httpOptions);
  }
  //delete a product
  deleteBooking(bookingId: string){
    return this.http.delete<any>(`${this.apiUrl}/${bookingId}`);
  }
}
