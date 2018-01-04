/// <reference path='../../declarations.d.ts'/>

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './Navigation';
import AboutComponent from './about';
import HomeComponent from './home';
import BlogComponent from './blog';

const routing = RouterModule.forRoot([
  {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'blog',
    component: BlogComponent
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
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    BlogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
