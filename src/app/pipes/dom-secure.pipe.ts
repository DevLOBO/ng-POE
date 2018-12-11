import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'domSecure'
})
export class DomSecurePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) { }
  transform(value: string, type: string): any {
    let url: string;

    if (type === 'img-fb') {
      if (value.includes('./assets')) {
        return value;
      } else if (value.includes('firebasestorage')) {
        url = 'https://firebasestorage.googleapis.com/';
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value.slice(39));
      }
    } else if (type === 'video') {
      url = 'https://www.youtube.com/embed/';
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value.slice(32));
    }
  }

}
