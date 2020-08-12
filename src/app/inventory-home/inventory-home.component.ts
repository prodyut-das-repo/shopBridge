import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-inventory-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class InventoryHomeComponent implements OnInit {
  inventoryItems: any;
  url: any;
  inventoryForm: FormGroup;
  modalReference: any;
  closeResult: string;
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
    this.inventoryForm = new FormGroup({
      name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)])),
      description: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)])),
      price: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(1)])),

    });
  }
  /**
   * Opens inventory home component
   * @param content 
   */
  open(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }
  saveData(value) {
    const updateInventoryDetails = this.user.addInventoryDetails(value.name, value.description, value.price, this.url);
    updateInventoryDetails.subscribe((data) => {
      this.getinventoryItems();
      if(data){
        this.modalReference.close();
        this.inventoryForm.reset();
      }
      this.cd.markForCheck();
    }, error => {
      alert('Please select photo of desired size')
    });
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
