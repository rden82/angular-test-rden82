import { Component, OnInit } from '@angular/core';

import { Element } from '../element.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'aim-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  
  constructor(
    public dataService: DataService
  ) {
    
  }

  ngOnInit(){    
    this.dataService.getElements();
  }

  public autocomplete(input) {
    console.log(input.value);
  }

  public searchReset() {
    console.log('reset');
  }
}