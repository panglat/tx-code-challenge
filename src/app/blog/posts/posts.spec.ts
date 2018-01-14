import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { PostsComponent } from './posts';
import { DebugElement } from '@angular/core';
import { BlogService } from '../../services/';
import { By } from '@angular/platform-browser';
import { MessageModalComponent } from '../../modals';
import { SortPostByDateNewestFirstPipe } from '../../pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComponent } from '../';
import { CommentComponent } from '../';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Post } from '../../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Routes } from '@angular/router';

describe('PostsComponent', () => {
    let component: PostsComponent;
    let fixture: ComponentFixture<PostsComponent>;
    let el: DebugElement;

    let routes: Routes = [
        {
            path: 'blog',
            children: [
                { path: '', component: PostsComponent },
                { path: 'post/:id', component: PostComponent },
            ]
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostsComponent, MessageModalComponent, SortPostByDateNewestFirstPipe, 
                PostComponent, CommentComponent],
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

    it('should display the loading message', () => {
        component.ngOnInit();
        fixture.detectChanges();
        el = fixture.debugElement.query(By.css('p'));
        expect(el.nativeElement.textContent.trim()).toBe('Getting the posts list... Please wait');
    });

    it('should display the empty post list message', fakeAsync(inject([BlogService], (blogService: BlogService) => {
        let spy = spyOn(blogService, 'getPosts').and.returnValue(Observable.of(new Array<Post>()));
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        el = fixture.debugElement.query(By.css('p'));
        expect(el.nativeElement.textContent.trim()).toBe('There is not posts');
        expect(spy).toHaveBeenCalled();
    })));

    it('should display two post', fakeAsync(inject([BlogService], (blogService: BlogService) => {
        const posts = new Array<Post>();
        let post: Post = <Post>{};
        post.id = 1;
        post.title = 'Blog post #1';
        post.author = 'Melissa Manges';
        post.publish_date = '2016-02-23';
        post.description = 'Utroque denique invenire et has';
        posts.push(post);

        post = <Post>{};
        post.id = 2;
        post.title = 'Blog post #2';
        post.author = 'Olene Ogan';
        post.publish_date = '2016-03-16"';
        post.description = 'Ex legere perpetua electram vim, per nisl inermis quaestio ea.';
        posts.push(post);

        let spy = spyOn(blogService, 'getPosts').and.returnValue(Observable.of(posts));
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        const trs = fixture.debugElement.queryAll(By.css('table tbody tr'));
        expect(trs.length).toBe(2);
        let td = trs[0].query(By.css('td'));
        expect(td.nativeElement.innerHTML).toContain('Blog post #2');
        td = trs[1].query(By.css('td'));
        expect(td.nativeElement.innerHTML).toContain('Blog post #1');
        expect(spy).toHaveBeenCalled();
    })));
});
