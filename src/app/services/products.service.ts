import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product, PaginationParams } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(params: PaginationParams): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/clothes`, { params });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/clothes`, product);
  }

  editProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/clothes/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clothes/${id}`);
  }
}
