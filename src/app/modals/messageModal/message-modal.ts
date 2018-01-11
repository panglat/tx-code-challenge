/**
 * @overview Home page.  Renders static content.
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import template from './message-modal.html';
import style from './message-modal.scss';
import * as $ from 'jquery';

@Component({
    selector: 'message-modal',
    template,
    styles: [style]
})

export class MessageModalComponent implements OnInit {
    @ViewChild('messageModal') messageModal: ElementRef;
    title: string;
    message: string;

    constructor() { }

    ngOnInit() {
    }

    public show(title:string, message:string) {
        this.title = title;
        this.message = message;
        $(this.messageModal.nativeElement).modal('show');
    }

    public hide() {
        $(this.messageModal.nativeElement).modal('hide');
    }
}
