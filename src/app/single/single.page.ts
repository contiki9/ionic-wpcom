import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { IAuthor, ICategory, IPost, IStragePost, ITag } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

import { PostDetailService} from '../_service/post-detail.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['../../theme/_post-detail.scss','./single.page.scss'],
})
export class SinglePage implements OnInit {

  public title: string;
  public article: IPost;
  public pastData: Promise<IPost>;
  public url: string = window.location.href;
  public noImageURL: string = environment.noImageURL;
  public bookmarked = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    public storage: Storage,
    public wp: WordpressProvider,
    public toastCtrl: ToastController,
    public postDetail: PostDetailService,
  ) {
  }

  public ngOnInit() {
    this.pastData = new Promise((resolve)=>{
      this.wp.getPostArticle(Number(this.route.snapshot.paramMap.get('postID'))).subscribe((data) => {
       this.title = !this.title ? data.title : this.title;
       this.article = data;
       setTimeout(() => {
         this.postDetail.trimArticle();
       }, 100);
       this.checkBookmarked();
       resolve(data);
       });
   });
  }

  public ionViewWillEnter() {

  }

  public viewAuthor(author: IAuthor): void {
    // this.navCtrl.setRoot('Author', { title: author.name, key: author.ID });
    // this.navCtrl.navigateRoot('Author', { title: author.name, key: author.ID });
  }

  public viewCategory(category: ICategory): void {
    // this.navCtrl.setRoot('Category', { title: category.name, key: category.slug });
    // this.navCtrl.navigateRoot('Category', { title: category.name, key: category.slug });
  }

  public viewTag(tag: ITag): void {
    // this.navCtrl.setRoot('Tag', { title: tag.name, key: tag.slug });
    // this.navCtrl.navigateRoot('Tag', { title: tag.name, key: tag.slug });
  }



  private checkBookmarked() {
    this.storage.get('bookmarks').then((data) => {
      if (data) {
        const bookmarks: Array<IStragePost> = JSON.parse(data);
        Array.prototype.forEach.call(bookmarks, (node) => {
          if (node.domain === environment.wordpressURL && node.postID === this.route.snapshot.paramMap.get('postID')) {
            this.bookmarked = true;
          }
        });
      }
    });
  }

  public async changeBookmark(): Promise<void>  {
    if (!this.article) {
      return;
    }

    if (this.bookmarked) {
      this.deleteLocalStrage('bookmarks').then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'この記事をお気に入りから削除しました。',
          duration: 2000,
          position: 'bottom',
        });
        await toast.present();
      });
    } else {
      this.saveLocalStrage('bookmarks').then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'この記事をお気に入りに追加しました。サイドメニューから確認できます',
          duration: 2000,
          position: 'bottom',
        });
        await toast.present();
      });
    }
  }

  public async hidden(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '非表示にしますか？',
      message: 'この記事を非表示にしますか？？',
      buttons: [
        {
          text: '閉じる',
          role: 'cancel',
        },
        {
          text: '非表示にする',
          handler: () => {
            this.saveLocalStrage('hidden').then(async () => {
              const toast = await this.toastCtrl.create({
                message: 'この記事を非表示にしました',
                duration: 2000,
                position: 'bottom',
              });
              await toast.present();
              await this.navCtrl.pop();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private deleteLocalStrage(key: string) {
    return new Promise((resolve) => {
      let registerBookmarks: Array<IStragePost> = [];
      this.storage.get(key).then((data) => {
        if (data) {
          registerBookmarks = JSON.parse(data);
        } else {
          registerBookmarks = [];
        }

        const createBookmarks = registerBookmarks.filter((e) => {
          console.log([e.domain, environment.wordpressURL, String(e.postID), String(this.route.snapshot.paramMap.get('postID'))]);
          console.log(
            e.domain === environment.wordpressURL && String(e.postID) !== String(this.route.snapshot.paramMap.get('postID')),
          );
          return e.domain === environment.wordpressURL && String(e.postID) !== String(this.route.snapshot.paramMap.get('postID'));
        });

        this.bookmarked = false;
        this.storage.set(key, JSON.stringify(createBookmarks));

        return resolve();
      });
      return resolve();
    });
  }

  private saveLocalStrage(key: string) {
    return new Promise((resolve) => {
      const now = new Date();
      const bookmark: Array<IStragePost> = [
        {
          domain: environment.wordpressURL,
          postID: Number(this.route.snapshot.paramMap.get('postID')),
          article: this.article,
          created: now.getFullYear() + '-' + now.getMonth() + 1 + '-' + now.getDate(),
        },
      ];

      let registerBookmarks: Array<IStragePost> = [];

      this.storage.get(key).then((data) => {
        if (data) {
          registerBookmarks = JSON.parse(data);
        } else {
          registerBookmarks = [];
        }

        const createBookmarks = bookmark.concat(registerBookmarks);
        console.log(createBookmarks);

        this.bookmarked = true;
        this.storage.set(key, JSON.stringify(createBookmarks));

        return resolve();
      });
    });
  }
}
