import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './blog/list/list.component';
import { PreviewComponent } from './blog/preview/preview.component';

import { MarkdownModule } from 'ngx-markdown';
//import {MatIconModule} from '@angular/material/icon';
import { GalleryComponent } from './art/gallery/gallery.component';
import { ArtworkComponent } from './art/artwork/artwork.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    PreviewComponent,
    GalleryComponent,
    ArtworkComponent,  
  ],
  imports: [
    MarkdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    //MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
