import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map, shareReplay, withLatestFrom } from 'rxjs/operators';
import mediasJson from '../../../assets/medias.json';
import { CategoryNode } from '../models/categoryNode';
import { Media } from '../models/media';

function buildCategoryNode(
  medias: Media[],
): (category: string) => CategoryNode {
  return (category: string) => {
    const mediasByCategory = medias.filter(
      media => media.category === category,
    );
    let categoryNode: CategoryNode;

    for (let i = 0, length = mediasByCategory.length; i < length; i++) {
      const mediaByCategory = mediasByCategory[i];

      if (!categoryNode) {
        categoryNode = {
          name: mediaByCategory.category,
          order: mediaByCategory.order,
          children: [],
        };
      }

      if (!!mediaByCategory.subCategory) {
        if (
          categoryNode.children.length &&
          categoryNode.children.some(
            child => child.name === mediaByCategory.subCategory,
          )
        ) {
          continue;
        }

        categoryNode.children.push({
          name: mediaByCategory.subCategory,
          order: mediaByCategory.subOrder,
        });
      }
    }

    if (categoryNode && categoryNode.children.length) {
      categoryNode.children.sort((a, b) => a.order - b.order);
    }

    return categoryNode;
  };
}

function toCategoryNodes([categories, medias]: [
  string[],
  Media[],
]): CategoryNode[] {
  return categories.map(buildCategoryNode(medias));
}

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private cachedMedias$: Observable<Media[]>;
  private cachedCategoriesTree$: Observable<CategoryNode[]>;

  constructor(private readonly domSanitizer: DomSanitizer) {}

  get medias$(): Observable<Media[]> {
    if (!this.cachedMedias$) {
      this.cachedMedias$ = of(
        mediasJson.sort((a, b) => a.order - b.order),
      ).pipe(
        map(medias =>
          medias.map(media => {
            media.contentUrl = media.contentUrl.includes('youtube')
              ? (this.domSanitizer.bypassSecurityTrustResourceUrl(
                  media.contentUrl,
                ) as string)
              : media.contentUrl;
            return media;
          }),
        ),
        shareReplay(),
      );
    }

    return this.cachedMedias$;
  }

  get categories$(): Observable<string[]> {
    return this.medias$.pipe(
      map(medias => [...new Set(medias.map(media => media.category))]),
    );
  }

  get categoriesTrees$(): Observable<CategoryNode[]> {
    if (!this.cachedCategoriesTree$) {
      this.cachedCategoriesTree$ = this.categories$.pipe(
        withLatestFrom(this.medias$),
        map(toCategoryNodes),
      );
    }

    return this.cachedCategoriesTree$;
  }
}
