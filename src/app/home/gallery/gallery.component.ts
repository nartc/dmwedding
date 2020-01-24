import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeIn, fadeOut } from 'ng-animate';
import { combineLatest, Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { CategoryNode } from '../../common/models/categoryNode';
import { Media } from '../../common/models/media';
import { MediaService } from '../../common/services/media.service';

interface GalleryVm {
  medias: Media[];
  mediasByCategory: {
    [category: string]: Media[];
  };
  categoriesTree: CategoryNode[];
}

function toVm([medias, categoriesTree]: [Media[], CategoryNode[]]): GalleryVm {
  const mediasByCategory: GalleryVm['mediasByCategory'] = {};

  for (let i = 0, categoryLen = categoriesTree.length; i < categoryLen; i++) {
    const element = categoriesTree[i];
    if (element.children.length) {
      for (let j = 0, childLen = element.children.length; j < childLen; j++) {
        const childNode = element.children[j];
        mediasByCategory[`${element.name}-${childNode.name}`] = medias.filter(
          media => media.subCategory === childNode.name,
        );
      }
    } else {
      mediasByCategory[element.name] = medias.filter(
        media => media.category === element.name,
      );
    }
  }

  return { medias, categoriesTree, mediasByCategory };
}

@Component({
  selector: 'app-gallery',
  template: `
    <ng-container *ngIf="vm$ | async as vm; else loading">
      <div class="wrapper" @wrapper>
        <app-gallery-category-group
          *ngFor="let categoryNode of vm.categoriesTree"
          [categoryNode]="categoryNode"
          [mediasByCategory]="vm.mediasByCategory"
        ></app-gallery-category-group>
      </div>
    </ng-container>
    <ng-template #loading>
      <app-loader @loader></app-loader>
    </ng-template>
  `,
  styles: [
    `
      .wrapper {
        display: grid;
        grid-gap: 1rem;
        height: 100%;
        padding: 1rem 3rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('wrapper', [
      transition(':enter', useAnimation(fadeIn)),
      transition(':leave', useAnimation(fadeOut)),
    ]),
    trigger('loader', [
      transition(':enter', useAnimation(fadeIn, { params: { timing: 0.5 } })),
      transition(':leave', useAnimation(fadeOut, { params: { timing: 0.5 } })),
    ]),
  ],
})
export class GalleryComponent implements OnInit {
  vm$: Observable<GalleryVm>;

  constructor(
    private readonly mediaService: MediaService,
    private readonly domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.vm$ = combineLatest([
      this.mediaService.medias$,
      this.mediaService.categoriesTrees$,
    ]).pipe(delay(500), map(toVm), tap(console.log));
  }
}
