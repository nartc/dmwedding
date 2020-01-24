import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from '@ngx-gallery/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GalleryModule.withConfig({
      loadingMode: 'indeterminate',
      loadingStrategy: 'lazy',
      gestures: true,
      thumb: true,
      imageSize: 'contain',
      slidingDirection: 'vertical',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
