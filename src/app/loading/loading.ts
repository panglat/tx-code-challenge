import { Component, OnDestroy, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import template from './loading.html';
import style from './loading.scss';

import { LoadingService, LoadingServiceMessages } from '../services';
import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';


@Component({
    selector: 'loading',
    template,
    styles: [style]
})
export class LoadingComponent implements AfterViewInit, OnDestroy {
    @ViewChild('loadingModal') loadingModalElementRef: ElementRef;
    private isShown = false; // true if the Loading Modal is shown or closing
    private loadingSubscription: Subscription;

    constructor(private loadingService: LoadingService) {
        // Subscribe to LoadingService message in order to show / hide the loading spinner
        this.loadingSubscription = this.loadingService.loadingObservable$.subscribe(
            (message: LoadingServiceMessages) => {
                message === LoadingServiceMessages.show ? this.show() : this.hide();
            }
        );
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }

    public show() {
        if (!this.isShown) {
            this.isShown = true;
            console.log('Call LoadingComponent::show');
            $(this.loadingModalElementRef.nativeElement).modal('show');
        }
    }

    public hide() {
        console.log('Call LoadingComponent::hide');
        $(this.loadingModalElementRef.nativeElement).modal('hide');
    }
}
