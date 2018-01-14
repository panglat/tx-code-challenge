import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PostsComponent } from './posts';
import { DebugElement } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { By } from '@angular/platform-browser';
import { MessageModalComponent } from '../../modals';
import { SortPostByDateNewestFirstPipe } from '../../pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutComponent } from '../../about/About';
import { HomeComponent } from '../../home/Home';
import { PostComponent } from '../index';
import { LoginComponent } from '../../login/login';
import { CommentComponent } from '../comment/comment';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PostsComponent', () => {
    let component: PostsComponent;
    let fixture: ComponentFixture<PostsComponent>;
    let el: DebugElement;
    
    let routes = [
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
      ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostsComponent, MessageModalComponent, SortPostByDateNewestFirstPipe, AboutComponent, 
                HomeComponent, PostComponent, LoginComponent, CommentComponent],
            providers: [BlogService],
            imports: [RouterTestingModule.withRoutes(routes), FormsModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Test loading message', inject([BlogService], (blogService: BlogService) => {
        component.ngOnInit();
        fixture.detectChanges();
        el = fixture.debugElement.query(By.css('p'));
        expect(el.nativeElement.textContent.trim()).toBe('Getting the posts list... Please wait');
    }));
});
