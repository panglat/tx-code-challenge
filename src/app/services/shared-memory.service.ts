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

    public isUserNameValid(): boolean {
        return this._userName && this._userName.length > 0;
    }

    get refererUrl(): string {
        return this._refererUrl;
    }

    set refererUrl(value: string) {
        this._refererUrl = value;
    }

    public isRefererUrlValid(): boolean {
        return this._refererUrl && this._refererUrl.length > 0;
    }
}
