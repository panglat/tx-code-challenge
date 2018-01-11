import { Component } from '@angular/core';

import template from './navigation.html';
import { SharedMemoryService } from './services/index';

@Component({
  selector: 'navigation',
  template,
})
export class NavigationComponent {
    constructor(private sharedMemoryService: SharedMemoryService) { }

    ngOnInit() {
        this.sharedMemoryService.userName = '';
    }

    get userName(): string {
        return this.sharedMemoryService.userName;
    }
}
