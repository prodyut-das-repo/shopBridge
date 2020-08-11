import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user-service';
@Component({
  selector: 'app-inventory-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class InventoryHomeComponent implements OnInit {
  @Input() inventoryItems: any;
  name: string;
  url: any;
  description: string;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private user: UserService, private cd: ChangeDetectorRef) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  /**
   * on init
   */
  ngOnInit() {
  }
  /**
   * Opens inventory home component
   * @param content 
   */
  open(content) {
    this.modalService.open(content, { centered: true });
  }
  saveData(name, description) {
    const updateInventoryDetails = this.user.addInventoryDetails(name, description, this.url);
    updateInventoryDetails.subscribe((data) => {
      this.user.getInventoryDetails().subscribe((inventoryItems) => {
        this.inventoryItems = inventoryItems;
        this.cd.markForCheck();
      });
    });

  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
}
