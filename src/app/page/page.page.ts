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

}
