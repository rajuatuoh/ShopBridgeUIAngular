import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './Model/product-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  selectedProduct = new Subject<Product>();
  private ProductUrl = 'http://localhost:50810/Api/Product/';
  constructor(private http: HttpClient) { }

  getProductList() {
    debugger;
    return this.http.get<Product[]>(this.ProductUrl + 'GetProduct');
  }

  getProductById(productId: number) {
    debugger;
    return this.http.get<Product>(this.ProductUrl + 'GetProduct?productId=' + productId);
  }

  saveProduct(productModalData: any) {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'multipart/form-data',
    //   }),
    // };
    return this.http.post<any>(this.ProductUrl + 'InsertProduct', productModalData);
  }

  UpdatePrduct(productModalData: any) {
    return this.http.put<any>(this.ProductUrl + 'UpdateProduct', productModalData);
  }

  DeleteProduct(ProductId: number) {
    return this.http.delete<any>(this.ProductUrl + 'deleteProduct?productId=' + ProductId)
  }
}
