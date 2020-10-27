import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service'

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
//#region Interface Implements methods
  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      }, error: err => this._errorMessage = err
    });
  }
//#endregion Interface Implements methods

//#region Public Properties
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: IProduct[];

  get listFilter(): string {
    return this._listFilter;
  } set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products
  }

  products: IProduct[];
//#endregion Public Properties

//#region Private Properties
  private _listFilter: string;
  private _errorMessage: string;
//#endregion Private Properties

//#region CTor
  constructor(private _productService: ProductService) {}
//#endregion CTor

//#region Public Methods
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
//#endregion Public Methods
}
