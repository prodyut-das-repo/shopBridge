import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { UserService } from '../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
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
  inventory: any[];
  routeParam: number;

  constructor(private user: UserService, private route: ActivatedRoute, private service: RouteParamsService, private cd: ChangeDetectorRef,
    private router: Router) {
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
    this.user.getInventoryDetails().subscribe((inventory) => {
      this.inventory = inventory;
    });
  }
  getinventoryItemsById(id: string) {
    this.user.getinventoryItemsById(id).subscribe(inventoryItems => {
      this.details = inventoryItems;
      this.numId = Number(this.details.id);
      this.router.navigate(['/details', this.numId]);
      this.cd.markForCheck();
    }, error => {
      if (error) {
        swal("Oops!", "Something went wrong! Item not found", "error");
      }
    })
  }
  next(id: string) {
    let numId = Number(id);
    numId = numId + 1;
    for (let i = numId; i < (numId + this.inventory.length); i++) {
      let found = this.inventory.some(el => el.id === i.toString());
      if (found) {
        this.routeParam = i;
        this.getinventoryItemsById(i.toString());
        this.cd.markForCheck();
        break;
      }
    }
  }
  @HostListener('window:popstate', ['$event'])
  onBrowserBackBtnClose(event: Event) {
    console.log('back button pressed');
    event.preventDefault();
    this.router.navigate([''], { replaceUrl: true });
  }
}
