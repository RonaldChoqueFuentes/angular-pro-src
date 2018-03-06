import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Product} from '../../models/product.interface'
@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="parent">
       <div formGroupName = "selector">
       <select formControlName = "product_id">
        <option value= "">Select stock</option>
        <option 
          *ngFor="let product of products" 
           [value] = "product.id">
           {{product.name}}
        </option>
       </select>
       
       <stock-counter
       [step]="10"
       [min]="10"
       [max]="1000"
       formControlName = "quantity"
       >
       </stock-counter>
       
       <button 
         type="button"
         (click)="onAdd()"
         [disabled]="stockExist || notSelected" >
           Add Stock
        </button>
        <div 
        class = "stock-selector__error"
        *ngIf = "stockExist"
        >
        Item Alredy exist int the Stock
        </div>

       </div>
    </div>
  `
})
export class StockSelectorComponent {
  @Input()
  parent: FormGroup;

  @Input()
  products: Product[];
  
  @Output()
  added = new EventEmitter<any>();
  
  get notSelected(){      
    return ( !this.parent.get('selector.product_id').value);
  }
  get stockExist(){
   return (this.parent.hasError('StockExist') && 
          this.parent.get('selector.product_id').dirty
  );
  }

  onAdd(){
    this.added.emit(this.parent.get('selector').value);
    
    this.parent.get('selector').setValue({
      product_id:'',
      quantity:10
    });
    
    /*
    this.parent.get('selector').patchValue({
      product_id:''
    });*/
    /*
    this.parent.get('selector').reset({
      product_id:'',
      quantity:10
    });*/

  }

}