import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {

  transform(value: string, len: number): any {
    if (value.length > len) {
      return value.slice(0, len - 1) + '...';
    }
    
    return value;
  }

}
