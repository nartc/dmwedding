import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Gallery, ImageItem } from '@ngx-gallery/core';
import { CategoryNode } from '../../../common/models/categoryNode';
import { Media } from '../../../common/models/media';

@Component({
  selector: 'app-gallery-category-group',
  template: `
    <h2>{{ categoryNode.name }}</h2>
    <ng-container *ngIf="!!mediasDict[categoryNode.name]">
      <div class="media-wrapper">
        <app-gallery-media
          *ngFor="let media of mediasDict[categoryNode.name]"
          [media]="media"
        >
        </app-gallery-media>
      </div>
    </ng-container>
    <ng-container *ngIf="!!categoryNode.children.length">
      <div
        class="category-child"
        *ngFor="let childNode of categoryNode.children"
      >
        <h3>{{ childNode.name }}</h3>
        <ng-container
          *ngIf="!!mediasDict[categoryNode.name + '-' + childNode.name]"
        >
          <div class="media-wrapper">
            <app-gallery-media
              *ngFor="
                let media of mediasDict[
                  categoryNode.name + '-' + childNode.name
                ];
                index as i
              "
              [media]="media"
              [lightbox]="i"
              [gallery]="categoryNode.name + '-' + childNode.name"
            ></app-gallery-media>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .media-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
        height: 100%;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCategoryGroupComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryNode: CategoryNode;

  @Input() set mediasByCategory(value: { [category: string]: Media[] }) {
    const categoryKeys = Object.keys(value);
    for (let i = 0, len = categoryKeys.length; i < len; i++) {
      const key = categoryKeys[i];
      if (!key.includes(this.categoryNode.name)) {
        continue;
      }

      this.medias.push(...value[key]);
      this.mediasDict[key] = value[key];
      this.galleryItems[key] = value[key].map(
        val => new ImageItem({ src: val.contentUrl, thumb: val.thumbnailLink }),
      );
    }
  }

  medias: Media[] = [];
  mediasDict: { [key: string]: Media[] } = {};
  galleryItems: { [key: string]: ImageItem[] } = {};

  constructor(private readonly gallery: Gallery) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.categoryNode.children.length) {
      this.categoryNode.children.forEach(child => {
        const id = this.categoryNode.name + '-' + child.name;
        this.gallery.ref(id).load(this.galleryItems[id]);
      });
    }
  }

  ngOnDestroy(): void {
    this.gallery.destroyAll();
  }
}
