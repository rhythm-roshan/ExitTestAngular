import {Component, OnInit} from '@angular/core';
import {RouletteService} from "../roulette.service";
import {Router} from "@angular/router";

interface User {
  UserID: number,
  UserName: string,
  DOB: any,
  Contact: number,
  Email: string,
  AccountBalance: number,
  BlockedAmount: number,
  UniqueUserId: string,
  image: any
}

@Component({
  selector: 'app-roulette-login',
  templateUrl: './roulette-login.component.html',
  styleUrls: ['./roulette-login.component.css']
})
export class RouletteLoginComponent implements OnInit {

  model: any = {};

  constructor(private request: RouletteService, private router: Router) {
  }
load = true;
  items: User[] = [];
  error;

  ngOnInit() {
    this.error = 1;
    sessionStorage.clear();
  }

  getUser(val) {
    this.request.loadData(val)
      .subscribe((data) => {
        this.items = data;
        console.log(this.items);
        if (data.UserID > 0) {
          sessionStorage.setItem("currentuser", JSON.stringify(data));
          this.error = 1;
          this.load =false;
          this.router.navigate(["/game"]);

        }
        else {

          this.error = 0;

        }


      })
  }

  login() {
    console.log(this.model.uniqueId);
    var val = {
      UserId: 1,
      UniqueId: this.model.uniqueId
    }

    this.getUser(val);


  }

}
