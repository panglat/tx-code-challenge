import { Injectable } from '@angular/core';

@Injectable()
export class SharedMemoryService {
    _userName: string;
    _refererUrl: string;

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get refererUrl(): string {
        return this._refererUrl;
    }

    set refererUrl(value: string) {
        this._refererUrl = value;
    }
}
