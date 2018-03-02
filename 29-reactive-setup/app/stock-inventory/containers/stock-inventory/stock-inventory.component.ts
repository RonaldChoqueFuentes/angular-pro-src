import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Product, Item } from '../../models/product.interface';
//import { createDeflateRaw } from 'zlib';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/Observable/forkJoin'

import {StockInventoryService} from '../../services/stock-inventory.service';


@Component({
  selector: 'stock-inventory',
  styles: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <stock-branch
          [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__buttons">
          <button 
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit{

  products: Product[];
  productMap: Map<number, Product>;
  

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),

    selector:this.createStock({}),
    
    stock: this.fb.array([])

  })

  constructor(
    private fb:FormBuilder,
    private stockservice:StockInventoryService
  ){}

  ngOnInit(){
    const cart = this.stockservice.getCartItems();
    const products = this.stockservice.getProducts();  
    
    Observable
    .forkJoin(cart,products)
    .subscribe( ([cart, products]:[Item[], Product[]]) => {
       const myMap = products
                    .map<[number, Product]>(product => [product.id, product]);
       
       this.productMap = new Map<number, Product>(myMap);
       this.products = products;

       cart.forEach( item => this.addStock(item));

    });
  }

  createStock(stock){
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  addStock(stock){
     const control = this.form.get('stock') as FormArray;
     control.push(this.createStock(stock));
  }

  removeStock({group, index }:{ group:FormGroup, index:number }) {
    const control = this.form.get('stock') as FormArray;
    
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}