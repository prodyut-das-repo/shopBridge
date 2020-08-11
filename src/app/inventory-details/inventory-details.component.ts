import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service';
import { ActivatedRoute } from '@angular/router';
import { RouteParamsService } from '../service/router-param-service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit {
  details: any;
  id: string;

  constructor(private user: UserService, private route: ActivatedRoute, private service: RouteParamsService) {
    route.params
      .subscribe(params => service.id
        .next(params && params['id'] || undefined));
    service.id.subscribe(res => {
      this.id = res;
    })

  }

  ngOnInit() {
    this.user.getDetails().subscribe((details: any) => {
      this.details = details;
    });
    window.onload = () => {
      this.getinventoryItemsById();
    }
  }
  getinventoryItemsById() {
    this.user.getinventoryItemsById(this.id).subscribe(inventoryItems => {
      this.details = inventoryItems;
    })
  }
}
