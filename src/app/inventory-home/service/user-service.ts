import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class UserService {
    restItemsUrl = 'https://5f329d0fec8330001613776d.mockapi.io/shopbridge/users';
    constructor(private http: HttpClient) { }

    getInventoryDetails() {
        return this.http
            .get<any[]>(this.restItemsUrl)
            .pipe(map(data => data));
    }
}