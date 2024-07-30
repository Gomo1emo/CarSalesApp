import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3000/cars';
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
  postProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData, this.httpOptions);
  }
  //delete a product
  deleteProduct(productId: string){
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }
}