import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InterfacePost, InterfaceStragePost } from '../../../interface/wordpress'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'bookmark-posts',
    templateUrl: 'posts.html',
})
export class BookmarkPostsComponent {

    constructor(
        public nav:NavController,
        public sanitizer: DomSanitizer,
        public storage: Storage,
    ) {}

    page:number = 1;
    posts: Array<InterfacePost> = [];
    Loaded;

    ngOnInit(){
        this.getPostList().then(
            (data:Array<InterfacePost>) => {
                console.log(data);
                this.page++;
                this.posts = this.posts.concat(data);
            },
            error => {
                this.posts = [];
            }
        );
    }
    //
    // doInfinite(infiniteScroll) {
    //     this.getPostList().then(
    //         (data:Array<InterfacePost>) => {
    //             this.page++;
    //             this.posts = this.posts.concat(data);
    //             if(data.length > 0) {
    //                 infiniteScroll.complete();
    //             }else{
    //                 infiniteScroll.enable(false);
    //             }
    //         },
    //         error => {
    //             infiniteScroll.complete();
    //         }
    //     );
    // }

    viewSingle(post): void {
        this.nav.push('Single',
            { postID: post.ID ,title: post.title});
    }

    private getPostList() {
        return new Promise ((resolve, reject) => {
            this.storage.get('bookmarks').then((data)=>{
                if(data){
                    const bookmarks:Array<InterfaceStragePost> = JSON.parse(data);
                    let bookmarkArticles: Array<InterfacePost> = [];
                    console.log(bookmarks);

                    this.storage.get('domain').then((val) => {
                        Array.prototype.forEach.call(bookmarks, (node)=> {
                            if(node.article && node.domain == val){
                                node.article.title = this.sanitizer.bypassSecurityTrustHtml(node.article.origin.title);
                                node.article.excerpt = this.sanitizer.bypassSecurityTrustHtml(node.article.origin.excerpt);
                                bookmarkArticles.push(node.article);
                            }
                        });
                        this.Loaded = true;
                        resolve(bookmarkArticles);
                    })
                }else{
                    this.Loaded = true;
                    resolve([]);
                }
            });
        });
    }
}
