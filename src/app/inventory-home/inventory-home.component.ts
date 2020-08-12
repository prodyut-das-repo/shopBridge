import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user-service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  id = '';
  constructor(private fb: FormBuilder, config: NgbModalConfig, private modalService: NgbModal, private user: UserService, private cd: ChangeDetectorRef) {
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
  open(content, item: any) {
    if (item) {
      this.id = item.id;
      this.url = item.image;
      this.inventoryForm.get('name').setValue(item.name);
      this.inventoryForm.get('description').setValue(item.description);
      this.inventoryForm.get('price').setValue(item.price);
    }
    this.modalReference = this.modalService.open(content, { centered: true });

  }
  clear() {
    this.url = '';
    this.inventoryForm.reset();
  }
  /**
   * Saves data
   * @param value 
   */
  saveData(value) {
    const updateInventoryDetails = this.user.addInventoryDetails(value.name, value.description, value.price, this.url);
    updateInventoryDetails.subscribe((data) => {
      this.getinventoryItems();
      if (data) {
        this.modalReference.close();
        this.inventoryForm.reset();
        this.url = '';
      }
      this.cd.markForCheck();
    }, error => {
      alert('Please select photo of desired size')
    });
    this.cd.markForCheck();
  }

  saveEdit(value) {
    const updateInventoryDetails = this.user.saveEdit(value.name, value.description, value.price, this.url, this.id);
    updateInventoryDetails.subscribe((data) => {
      this.getinventoryItems();
      if (data) {
        this.modalReference.close();
        this.inventoryForm.reset();
        this.url = '';
      }
      this.cd.markForCheck();
    }, error => {
      alert('Please select photo of desired size')
    });
    this.cd.markForCheck();
  }
  /**
   * Determines whether select file on
   * @param event 
   */
  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }
  // Read all REST Items
  getinventoryItems() {
    this.user.getInventoryDetails().subscribe(inventoryItems => {
      this.inventoryItems = inventoryItems;
    })
  }
}
