import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-prac',
  templateUrl: './prac.component.html',
  styleUrls: ['./prac.component.css']
})
export class PracComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  items = [{value: "hi"}, {value: "hi"}, {value: "hi"}, {value: "hi"}]
  rows: number[] = [];

  isDisabled(index) {
    return this.rows[index] === -1;
  }

  enable(index) {
    this.rows[index] = 1;
  }

  toggle($event, index) {
    let selectElement = $event.target;
    let value = selectElement.options[selectElement.selectedIndex].value;
    if (value === "yes") {
      this.enable(index);
    } else {
      this.disable(index);
    }
  }

  disable(index) {
    this.rows[index] = -1;
  }
}
