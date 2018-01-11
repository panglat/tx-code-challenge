/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit } from '@angular/core';

import template from './login.html';
import { Router } from '@angular/router';
import { SharedMemoryService } from '../services';

@Component({
    selector: 'login',
    template,
})
export class LoginComponent implements OnInit {
    userName = '';

    constructor(private sharedMemoryService: SharedMemoryService, private router: Router) { }

    ngOnInit() {
        this.sharedMemoryService.userName = '';
    }

    loginButtonClicked() {
        if(this.userName.length > 0) {
            this.sharedMemoryService.userName = this.userName;
            const url = this.sharedMemoryService.refererUrl ? this.sharedMemoryService.refererUrl : 'blog';
            this.sharedMemoryService.refererUrl = null;
            this.router.navigate([url]);
        }
    }
}
