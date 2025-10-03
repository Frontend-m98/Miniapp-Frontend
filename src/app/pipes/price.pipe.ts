import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price',
    standalone: true,
})
export class PricePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return `${value}$`;
    }
}
