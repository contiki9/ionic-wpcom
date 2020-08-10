import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { IAuthor, ICategory, IPost, ITag } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

import { PostDetailService} from '../_service/post-detail.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['../../theme/_post-detail.scss','./page.page.scss'],
})
export class PagePage implements OnInit {
  public title: string;
  public article: IPost;
  public pastData: Promise<IPost>;
  public url: string = window.location.href;



  constructor(
    public navCtrl: NavController,
    // public navParams: NavParams,
    public wp: WordpressProvider,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    public postDetail: PostDetailService,
  ) { }

  public ngOnInit() {
    this.pastData = new Promise((resolve)=>{
      this.wp.getPostArticle(Number(this.route.snapshot.paramMap.get('postID'))).subscribe((data) => {
       this.title = !this.title ? data.title : this.title;
       this.article = data;
       setTimeout(() => {
        this.postDetail.trimArticle();
       }, 100);
       //this.checkBookmarked();
       resolve(data);
       });
   });
  }

  public ionViewWillEnter() {

  }

  public viewAuthor(author: IAuthor): void {
    // this.navCtrl.setRoot('Author', { title: author.name, key: author.ID });
  }

  public viewCategory(category: ICategory): void {
    // this.navCtrl.setRoot('Category', { title: category.name, key: category.slug });
  }

  public viewTag(tag: ITag): void {
    // this.navCtrl.setRoot('Tag', { title: tag.name, key: tag.slug });
  }



  // private trimArticle() {
  //   Array.prototype.forEach.call(document.querySelectorAll('article iframe'), function(node) {
  //     node.setAttribute('width', '100%');
  //   });
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('article iframe.wp-embedded-content'), function(node) {
  //     node.style.display = 'none';
  //   });
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('article a'), function(node) {
  //     node.setAttribute('target', '_blank');
  //     node.setAttribute('rel', 'noopener');
  //   });
  //
  //   Array.prototype.forEach.call(document.querySelectorAll('article div[data-shortcode=caption]'), function(node) {
  //     node.style.width = '100%';
  //   });
  // }

}
