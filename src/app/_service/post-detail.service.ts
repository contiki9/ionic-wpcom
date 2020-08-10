import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {

  constructor() { }


  public trimArticle() {
    Array.prototype.forEach.call(document.querySelectorAll('article iframe'), (node) => {
      node.setAttribute('width', '100%');
    });

    Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), (node) => {
      node.style.display = 'none';
    });

    Array.prototype.forEach.call(document.querySelectorAll('article a'), (node) => {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener');
    });

    Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), (node) => {
      node.style.width = '100%';
    });
  }
}
