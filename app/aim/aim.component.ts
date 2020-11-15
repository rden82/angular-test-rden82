import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Element } from '../element.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'aim',
  templateUrl: './aim.component.html',
  styleUrls: ['./aim.component.css']
})
export class AimComponent {
  @Input() name: string;
  public elements: BehaviorSubject<Element[]> = new BehaviorSubject([]);
 
  constructor(
    private dataService: DataService
  ) {
    // this.dataService.getElements();
    this.elements = this.dataService.elements;
  }
}
