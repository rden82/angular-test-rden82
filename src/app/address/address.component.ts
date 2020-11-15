import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";

@Component({
  selector: "aim-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit {
  public selectedArray = [];

  constructor(public dataService: DataService) {}

  ngOnInit() {}

  public autocomplete(input) {
    console.log(input.value);
    this.dataService.query$$.next(input.value);
  }

  public searchReset() {
    console.log("reset");
    this.dataService.query$$.next("");
  }

  public deleteItem(item): void {
    console.log(item);
  }
}
