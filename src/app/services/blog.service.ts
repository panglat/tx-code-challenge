import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Post } from '../models/index';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../models/comment';

@Injectable()
export class BlogService extends BaseService {
    protected POSTS = '/posts';
    protected COMMENTS = '/comments';

    constructor(private http: HttpClient) { 
        super();
    }

    public getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.BASE_URL}${this.POSTS}`, this.getOptions())
    }

    public getPost(postId: number): Observable<Post> {
        return this.http.get<Post>(`${this.BASE_URL}${this.POSTS}/${postId}`, this.getOptions());
    }

    public getComments(postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.BASE_URL}${this.POSTS}/${postId}${this.COMMENTS}`, this.getOptions());
    }

    public addComment(postId: number, comment: string): Observable<Object> {
        return this.http.post(`${this.BASE_URL}${this.POSTS}/${postId}/${this.COMMENTS}`, comment, this.getOptions());
    }

    public updateComment(commentId: number, comment: string): Observable<Object> {
        return this.http.put(`${this.BASE_URL}${this.COMMENTS}/${commentId}`, comment, this.getOptions());
    }
}
