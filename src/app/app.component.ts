import { Component, OnInit, Output } from '@angular/core';
import { UserService } from './service/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  inventoryItems: any[];
  constructor(private user: UserService) { }
  ngOnInit() {
  }
}
