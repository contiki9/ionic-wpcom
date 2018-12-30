import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { IPost, ICategory, ITag, IAuthor } from '../../interfaces/wordpress';

@IonicPage({
  segment: 'page/:postID',
})
@Component({
  selector: 'page',
  templateUrl: 'page.html',
  providers: [WordpressProvider],
})
export class Page {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public wp: WordpressProvider,
    public toastCtrl: ToastController,
  ) {}

  title: string;
  article: IPost;
  url: string = window.location.href;
  shareURL: {
    twitter: string;
  };

  ionViewDidLoad() {
    if (this.navParams.get('title')) {
      this.title = this.navParams.get('title');
    }

    this.wp.getPostArticle(this.navParams.get('postID')).subscribe(data => {
      this.title = !this.title ? data.title : this.title;
      this.article = data;
      this.shareURL = this.createShareURL(this.url, data);
      setTimeout(() => {
        this.trimArticle();
      }, 100);
    });
  }

  viewAuthor(author: IAuthor): void {
    this.navCtrl.setRoot('Author', { title: author.name, key: author.ID });
  }

  viewCategory(category: ICategory): void {
    this.navCtrl.setRoot('Category', { title: category.name, key: category.slug });
  }

  viewTag(tag: ITag): void {
    this.navCtrl.setRoot('Tag', { title: tag.name, key: tag.slug });
  }

  addClipboard(): void {
    const body = document.body;
    let text_area = document.createElement('textarea');
    text_area.value = this.url;
    body.appendChild(text_area);
    text_area.select();
    document.execCommand('copy');
    body.removeChild(text_area);

    let toast = this.toastCtrl.create({
      message: 'URLをクリップボードにコピーしました',
      duration: 2500,
    });
    toast.present();
  }

  private trimArticle() {
    Array.prototype.forEach.call(document.querySelectorAll('article iframe'), function(node) {
      node.setAttribute('width', '100%');
    });

    Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), function(node) {
      node.style.display = 'none';
    });

    Array.prototype.forEach.call(document.querySelectorAll('article a'), function(node) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener');
    });

    Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), function(node) {
      node.style.width = '100%';
    });
  }

  private createShareURL(url, params: IPost) {
    if (params.origin.excerpt && params.origin.excerpt.length > 0) {
      params.origin.excerpt = params.origin.excerpt.replace(/\s|&nbsp;/g, '');
    }

    return {
      twitter:
        'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(url) +
        '&text=' +
        encodeURIComponent(params.origin.title),
    };
  }
}
