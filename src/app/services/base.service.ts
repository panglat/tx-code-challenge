import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {
    protected BASE_URL = 'http://localhost:9001';

    getOptions() {
        const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
        headers.append('Pragma', 'no-cache');
        return { headers: headers };
    }
}
