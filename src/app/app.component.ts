import { Component, OnInit, Output } from '@angular/core';
import { UserService } from './inventory-home/service/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  inventoryItems: any[];
  constructor(private user: UserService) { }
  ngOnInit() {
    this.getinventoryItems();
  }

  // Read all REST Items
  getinventoryItems() {
    this.user.getInventoryDetails().subscribe(inventoryItems => {
          this.inventoryItems = inventoryItems;
          console.log(this.inventoryItems);
        })
  }
}
