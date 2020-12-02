import { Component, DebugNode, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../Model/product-model';
import { NotificationServicesService } from '../notification-services.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnChanges {
  isEditEnabled: boolean;
  selectedProductId: number;
  productModel: Product = {};
  selectedImage: any;
  ProductSaveJson: {};
  constructor(private route: ActivatedRoute,
    private productServiceobj: ProductServiceService,
    private routes: Router,
    private notifyUser: NotificationServicesService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.id) {
      this.isEditEnabled = true;
      this.selectedProductId = parseInt(
        this.route.snapshot.queryParams.id,
        10
      );
      this.productServiceobj.getProductById(this.selectedProductId).subscribe((res) => {
        this.productModel = res[0];
        console.log(this.productModel);
      });
    }
  }
  ngOnChanges(): void {
  }
  saveHandler() {
    if (!this.productModel.productName) {
      this.notifyUser.forAlert('Alert', 'Product Name can\'t be empty');
      return false;
    }
    else if (!this.productModel.productDescription) {
      this.notifyUser.forAlert('Alert', 'Product Desc Name can\'t be empty');
      return false;
    }
    else if (!this.productModel.productPrice) {
      this.notifyUser.forAlert('Alert', 'please provide the price');
      return false;
    }
    else if (!this.productModel.productImg) {
      this.notifyUser.forAlert('Alert', 'Chosse an image');
      return false;
    } else if (isNaN(this.productModel.productPrice)) {
      this.notifyUser.onWarning('Alert', 'Price Should be number');
      this.productModel.productPrice = null;
      return false;

    }
    this.ProductSaveJson = {
      productName: this.productModel.productName,
      productDescription: this.productModel.productDescription,
      productPrice: this.productModel.productPrice,
      productImg: this.productModel.productImg,
    };
    // const formData = new FormData();
    // formData.append('productName',this.productModel.productName);
    // formData.append('productDescription',this.productModel.productDescription);
    // formData.append('productPrice', this.productModel.productPrice.toString());
    // formData.append('productImg', this.productModel.productImg);
    // formData.append('ProductFile', this.selectedImage);
    if (this.isEditEnabled) {
      this.ProductSaveJson = {
        ...this.ProductSaveJson,
        productId: this.selectedProductId,
      };
      this.UpdateProduct(this.ProductSaveJson);
    }
    else {
      this.saveProduct(this.ProductSaveJson);
    }
  }


  inFileSelect(event) {
    console.log(event);
    this.selectedImage = event.target.files[0];

  }
  saveProduct(productModalData: any) {
    this.productServiceobj.saveProduct(productModalData).subscribe(res => {
      console.log(res + 'in UpdateProduct ');
      if (res === 'success') {

        this.routes.navigate(['/product-list']);
        this.notifyUser.onSuccess('Success', 'Created SuccessFully');
      }
    }, (error) => {
      this.routes.navigate(['/product-list']);
      this.notifyUser.onError('Fail', 'Try again');
    });
  }
  UpdateProduct(productModalData: any) {
    this.productServiceobj.UpdatePrduct(productModalData).subscribe(data => {
      console.log(data + 'in UpdateProduct ');
      if (data === 'success') {
        this.routes.navigate(['/product-list']).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          }
        });
        this.notifyUser.onSuccess('Success', 'Product Updated');
      }
    }, (error) => {
      this.notifyUser.onError('Fail', 'Try Again');
    });
  }
  gotoHomePage() {
    this.routes.navigate(['/product-list']).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      }
    });
  }
}
