import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IPost, IStragePost } from '../../../../interfaces/wordpress';
import { environment } from '../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bookmark-posts',
  templateUrl: './bookmark-posts.component.html',
  styleUrls: ['../../../../theme/_posts.scss','./bookmark-posts.component.scss'],
})
export class BookmarkPostsComponent implements OnInit {
  page: number = 1;
  posts: Array<IPost> = [];
  Loaded:boolean;

  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public storage: Storage
    ) { }

    ngOnInit() {
      this.getPostList().then(
        (data: Array<IPost>) => {
          console.log(data);
          this.page++;
          this.posts = this.posts.concat(data);
        },
        error => {
          this.posts = [];
        },
      );
    }
    viewSingle(post): void {
      this.navCtrl.navigateRoot(`archive/single/${post.ID}`);
    }

    private getPostList() {
      return new Promise((resolve, reject) => {
        this.storage.get('bookmarks').then(data => {
          if (data) {
            const bookmarks: Array<IStragePost> = JSON.parse(data);
            const bookmarkArticles: Array<IPost> = [];
            //console.log(bookmarks);
            Array.prototype.forEach.call(bookmarks, node => {
              if (node.article && node.domain === environment.wordpressURL) {
                node.article.title = this.sanitizer.bypassSecurityTrustHtml(node.article.origin.title);
                node.article.excerpt = this.sanitizer.bypassSecurityTrustHtml(node.article.origin.excerpt);
                bookmarkArticles.push(node.article);
              }
            });
            this.Loaded = true;
            resolve(bookmarkArticles);
          } else {
            this.Loaded = true;
            resolve([]);
          }
        });
      });
    }
}
