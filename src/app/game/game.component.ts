import {Component, OnInit} from '@angular/core';
import {RouletteService} from "../roulette.service";

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

enum betting {
  first12 = 1.5,
  Second12 = 1.5,
  Third12 = 1.5,
  Zero = 10,
  OnetoEighteen = 1.25,
  NinteentoThirstySix = 1.25,
  Even = 1.25,
  Odd = 1.25,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {

  user: User;

  constructor(private request: RouletteService) {
  }

  ngOnInit() {


  }

  login() {
    this.user = {
      UserID: 13,
      UserName: "Rajiv Sinha",
      DOB: "1965/01/01",
      Contact: 9811143933,
      Email: "rajivsinha65@gmail.com",
      AccountBalance: 500,
      BlockedAmount: 0,
      UniqueUserId: "QWERTY5Y",
      image: null
    }



    console.log(this.user);

    this.update(this.user)

  }

  update(user) {
    this.request.updateData(user)
      .subscribe(data => {
        console.log(data)
      })
  }


}
