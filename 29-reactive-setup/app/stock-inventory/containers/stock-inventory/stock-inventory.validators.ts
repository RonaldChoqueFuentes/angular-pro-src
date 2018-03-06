import { AbstractControl } from "@angular/forms";

export class StockValidators{
    static checkBranch(control:AbstractControl){
        const regexp = /^[a-z]\d{3}$/i;
        const valid = regexp.test(control.value);
        return valid?null:{invalidBranch:true};
    }

    static checkStockExist(control:AbstractControl){

        const stockItem = control.get('stock');
        const selector = control.get('selector');

        if(!(stockItem && selector)) return null;

        const exist = stockItem.value.some( (stock) => {
            return stock.product_id === parseInt(selector.value.product_id, 10);
        });
        
        return exist? {StockExist:true} : null;
        
    }
}