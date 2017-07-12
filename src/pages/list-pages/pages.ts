import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
import { InterfacePost } from '../../interface/wordpress'

@IonicPage()
@Component({
  selector: 'pages',
  templateUrl: 'pages.html',
  providers:[ WordpressProvider ]
})
export class ListPages {

  page:number = 1;
  posts: Array<InterfacePost> = [];

  constructor(
      public navCtrl: NavController,
      public wp: WordpressProvider
  ) {}

  ionViewDidLoad(){
    this.getPostList();
  }

  doInfinite(infiniteScroll) {
    this.getPostList().then(
        data => {
          infiniteScroll.complete();
        },
        error => {
          infiniteScroll.enable(false);
        }
    );
  }

  private getPostList() {
    return new Promise ((resolve, reject) => {
      this.wp.getPostList(this.page, 'page')
          .subscribe(
              data => {
                this.page++;
                this.posts = this.posts.concat(data);
                resolve(data)
              },
              error => {
                reject(error);
              }
          );
    });
  }
}
