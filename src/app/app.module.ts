/// <reference path='../../declarations.d.ts'/>

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BaseService, BlogService, SharedMemoryService } from './services/index';

import { AppComponent } from './app.component';
import { NavigationComponent } from './Navigation';
import AboutComponent from './about';
import HomeComponent from './home';
import LoginComponent from './login';
import { PostsComponent, PostComponent, CommentComponent } from './blog';
import { SortPostByDateNewestFirstPipe } from './pipes';

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
    path: 'login',
    component: LoginComponent
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
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    CommentComponent,
    SortPostByDateNewestFirstPipe,
    LoginComponent
  ],
  providers: [
      BaseService,
      BlogService,
      SharedMemoryService
 ], 
  bootstrap: [AppComponent]
})
export class AppModule {}
