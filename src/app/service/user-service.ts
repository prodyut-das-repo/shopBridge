import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Inventory } from '../model/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
    private inventoryDetails = new BehaviorSubject(1);
    restItemsUrl = 'https://5f329d0fec8330001613776d.mockapi.io/shopbridge/users';
    constructor(private http: HttpClient) { }
    /**
     * Gets inventory details
     * @returns  
     */
    getInventoryDetails() {
        return this.http
            .get<any[]>(this.restItemsUrl)
            .pipe(map(data => data));
    }
    /**
     * Updates inventory details
     * @param name 
     * @param description 
     * @returns  
     */
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
    /**
     * Adds inventory details
     * @param name 
     * @param description 
     * @param price 
     * @param url 
     * @returns  
     */
    addInventoryDetails(name: string, description: string, price: number, url: string) {
        const payload = {
            "name": name,
            "description": description,
            "price": price,
            "image": url
        }
        return this.http.post(`${this.restItemsUrl}`, payload);
    }
    /**
     * Getinventorys items by id
     * @param id 
     * @returns  
     */
    getinventoryItemsById(id: string) {
        return this.http
            .get<any[]>(this.restItemsUrl + `/${id}`)
            .pipe(map(data => data));
    }

    /**
     * Saves edit
     * @param name 
     * @param description 
     * @param price 
     * @param url 
     * @param id 
     * @returns  
     */
    saveEdit(name: string, description: string, price: string, url: string, id: string) {
        const payload = {
            "name": name,
            "description": description,
            "price": price,
            "image": url
        }
        return this.http.put(`${this.restItemsUrl}/${id}`, payload);
    }
    /**
     * Deletes item
     * @param id 
     * @returns  
     */
    deleteItem(id: string) {
        return this.http.delete(`${this.restItemsUrl}/${id}`);
    }

}