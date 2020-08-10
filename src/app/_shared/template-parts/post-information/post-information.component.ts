import { Component, OnInit,Input } from '@angular/core';
import { IAuthor, ICategory, IPost, ITag } from '../../../../interfaces/wordpress';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-information',
  templateUrl: './post-information.component.html',
  styleUrls: ['./post-information.component.scss'],
})
export class PostInformationComponent implements OnInit {
  @Input() pastData:Promise<IPost> ;
  article:IPost;
  constructor(
    private navCtrl:NavController,
  ) { }

  ngOnInit() {
    this.pastData.then((data)=>{
      this.article = data;
    });
  }


  public viewAuthor(author: IAuthor): void {
    this.navCtrl.navigateRoot(`author/${author.ID}`);
    // this.navCtrl.setRoot('Author', { title: author.name, key: author.ID });
    // this.navCtrl.navigateRoot('Author', { title: author.name, key: author.ID });
  }

  public viewCategory(category: ICategory): void {
    this.navCtrl.navigateRoot(`category/${category.slug}`);
  }

  public viewTag(tag: ITag): void {
    this.navCtrl.navigateRoot(`author/${tag.slug}`);
    // this.navCtrl.setRoot('Tag', { title: tag.name, key: tag.slug });
    // this.navCtrl.navigateRoot('Tag', { title: tag.name, key: tag.slug });
  }
}
