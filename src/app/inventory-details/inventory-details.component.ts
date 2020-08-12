import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  numId: number;

  constructor(private user: UserService, private route: ActivatedRoute, private service: RouteParamsService, private cd: ChangeDetectorRef) {
    route.params
      .subscribe(params => service.id
        .next(params && params['id'] || undefined));
    service.id.subscribe(res => {
      this.id = res;
      this.cd.markForCheck();
    })

  }

  ngOnInit() {
    if (this.id) {
      this.getinventoryItemsById(this.id);
    }
  }
  getinventoryItemsById(id: string) {
    this.user.getinventoryItemsById(id).subscribe(inventoryItems => {
      this.details = inventoryItems;
      this.numId = Number(this.details.id);
    }, error=>{
      if(error){
        alert("list ended!")
      }
    })
  }
  next(id: string) {
    console.log(id);

    let numId = Number(id);
    numId = numId + 1;
    this.getinventoryItemsById(numId.toString());
    this.cd.markForCheck();
  }
}
