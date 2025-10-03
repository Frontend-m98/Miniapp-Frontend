import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncateName',
    standalone: true,
})
export class TruncateNamePipe implements PipeTransform {
    transform(value: string, maxlength: number = 20, ellipsis: string = '...'): any {
        if (value.length > maxlength) {
            return value.slice(0, maxlength) + ellipsis;
        }
        return value;
    }
}
