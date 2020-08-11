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
  inventoryItems: any;
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
    this.getinventoryItems();
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
      this.getinventoryItems();
      this.cd.markForCheck();
    });
    this.name = '';
    this.description = '';
    this.url = '';
    this.cd.markForCheck();
  }
  close() {
    this.name = '';
    this.description = '';
    this.url = '';
    this.cd.markForCheck();
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
  // Read all REST Items
  getinventoryItems() {
    this.user.getInventoryDetails().subscribe(inventoryItems => {
      this.inventoryItems = inventoryItems;
    })
  }
  sendDetails(id: string) {
    this.user.sendDetails(this.inventoryItems.filter(data => data.id === id))
  }
}
