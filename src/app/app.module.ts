/// <reference path='../../declarations.d.ts'/>

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BaseService, BlogService } from './services/index';

import { AppComponent } from './app.component';
import { NavigationComponent } from './Navigation';
import AboutComponent from './about';
import HomeComponent from './home';
import { PostsComponent, PostComponent, CommentComponent } from './blog';

const routing = RouterModule.forRoot([
  {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'blog',
    children: [
        { path: '', component: PostsComponent},
        { path: 'post/:id', component: PostComponent },
    ]
  }, {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
]);

@NgModule({
  imports: [
    BrowserModule,
    routing,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    CommentComponent
  ],
  providers: [
      BaseService,
      BlogService
 ], 
  bootstrap: [AppComponent]
})
export class AppModule {}
