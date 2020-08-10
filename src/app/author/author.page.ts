import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { IPostParams } from '../../interfaces/wordpress';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@Component({
  selector: 'app-author',
  templateUrl: './author.page.html',
  styleUrls: ['./author.page.scss'],
})
export class AuthorPage implements OnInit {
  public type: string = '執筆者';
  public title: string;
  public authorId:number;
  public search: IPostParams = {
    type: 'wait',
    authorID: this.authorId,
  };

  constructor(
    public navCtrl: NavController,
    public wp: WordpressProvider,
    public route:ActivatedRoute,
    ) {}

  ionViewWillEnter() {
    this.authorId = this.route.snapshot.params.authorID;
    const f = () =>
      new Promise((resolve) => {
        resolve(this.authorId);
      });
    f().then((ID: number) => {
     const tst = this.wp.getPostList(0, { authorID: ID }).subscribe(data => {
      console.log("AuthorPage -> ionViewWillEnter -> data", data)
        this.title = data[0].author.name;
      });
      console.log('tst',tst)
      this.search = {
        type: 'post',
        authorID: ID,
      };
    });
  }
}
