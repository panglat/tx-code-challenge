import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export enum LoadingServiceMessages {
    hide,
    show
}

@Injectable()
export class LoadingService {
    private loadingSource = new Subject<LoadingServiceMessages>();
    public loadingObservable$: Observable<LoadingServiceMessages> = this.loadingSource.asObservable();

    constructor() { }

    public show() {
        console.log('LoadingService::show')
        this.loadingSource.next(LoadingServiceMessages.show);
    }

    public hide() {
        console.log('LoadingService::hide')
        this.loadingSource.next(LoadingServiceMessages.hide);
    }
}
