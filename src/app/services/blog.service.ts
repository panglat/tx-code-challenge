import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Post } from '../models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlogService extends BaseService {
    protected POSTS = '/posts';

    constructor(private http: HttpClient) { 
        super();
    }

    public getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.BASE_URL}${this.POSTS}`, this.getOptions())
    }
}
