import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { LoaderModule } from '../common/components/loader/loader.module';
import { DeferImageModule } from '../common/directives/defer-image/defer-image.module';
import { GalleryCategoryGroupComponent } from './gallery/gallery-category-group/gallery-category-group.component';
import { GalleryMediaComponent } from './gallery/gallery-media/gallery-media.component';
import { GalleryComponent } from './gallery/gallery.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    GalleryCategoryGroupComponent,
    GalleryMediaComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoaderModule,
    DeferImageModule,
    LightboxModule.withConfig({
      panelClass: 'fullscreen',
      hasBackdrop: true,
    }),
  ],
})
export class HomeModule {}
