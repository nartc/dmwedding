import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Media } from '../../../common/models/media';

@Component({
  selector: 'app-gallery-media',
  template: `
    <ng-container *ngIf="isVideo; else image">
      <iframe
        [src]="media.contentUrl"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </ng-container>
    <ng-template #image>
      <div>
        <img [appDeferImage]="media.thumbnailLink" src="" alt="" />
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: grid;
        place-items: center;
        outline: 0.25rem solid #fff;
        background-color: #000;
      }

      img,
      iframe {
        height: 100%;
        width: 100%;
      }

      img {
        object-fit: contain;
      }

      div {
        height: 100%;
        width: 100%;
      }

      div.loading {
        border: 0.75rem solid #f3f3f3;
        border-top: 0.75rem solid #ccc;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryMediaComponent {
  private _media: Media;

  get media(): Media {
    return this._media;
  }

  @Input() set media(value: Media) {
    this._media = value;
    this.isVideo = value.fileName.toLowerCase().endsWith('.mp4');
  }

  isVideo = false;
}
