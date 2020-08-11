import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Inventory } from '../model/model';

@Injectable({ providedIn: 'root' })

export class UserService {
    restItemsUrl = 'https://5f329d0fec8330001613776d.mockapi.io/shopbridge/users';
    constructor(private http: HttpClient) { }

    getInventoryDetails() {
        return this.http
            .get<any[]>(this.restItemsUrl)
            .pipe(map(data => data));
    }
    updateInventoryDetails(name: string, description: string) {
        const payload: Inventory = {
            "id": "1",
            "name": name,
            "description": description,
            "price": "price 1",
            "image": "string"
        }
        return this.http.put(`${this.restItemsUrl}/${payload.id}`, payload);
    }
    addInventoryDetails(name: string, description: string, url:string) {
        const payload = {
            "name": name,
            "description": description,
            "price": "price 1",
            "image": url
        }
        return this.http.post(`${this.restItemsUrl}`, payload);
    }
}