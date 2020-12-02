import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Model/product-model';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  tempProduct: any;
  listCount: number;

  constructor(private productServiceObj: ProductServiceService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.colledService();
  }

  ngOnChanges(): void {
  }

  colledService(): void {
    this.productServiceObj.getProductList().subscribe(data => {
      this.productList = data;
      this.listCount = this.productList.length;
      console.log('data:' + this.productList);

    },
      (error) => {
        console.log('Error is fetching all ProductList: ' + error);
      }
    );
  }

  popupHandler(productId: number) {
    this.tempProduct = this.productList.filter(product => {
      product.productId = productId;
      return product;
    });
    debugger;
    console.log(this.tempProduct);
    this.productServiceObj.selectedProduct.next(this.tempProduct);
    this.routeTOProductMangement(productId);
  }
  routeTOProductMangement(productId: number) {
    this.route.navigate(['/product-management'], { queryParams: { id: productId } }).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      }
    });
  }

  AddProduct() {
    this.route.navigate(['/product-management']).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      }
    });
    console.log("Create the product");
  }

  deleteHandler(productId: number) {

  }
}
