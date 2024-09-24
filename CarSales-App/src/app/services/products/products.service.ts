import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:8082/api/v1/Cars';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //fetch all products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }
  //fetch one products 
  getProduct(id: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //post a product
  postProduct(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, this.httpOptions);
  }
  //delete a product
  deleteProduct(productId: string){
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }
}