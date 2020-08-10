import { Component, OnInit } from '@angular/core';
import { IPostParams } from '../../interfaces/wordpress';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  public search: IPostParams = {
    type: 'post',
  };
  public title = 'archive';
  constructor() { }

  public ngOnInit() {
  }

}
