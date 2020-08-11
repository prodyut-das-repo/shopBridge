import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-inventory-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class InventoryHomeComponent implements OnInit {
  @Input() inventoryItems: any;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
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
}
