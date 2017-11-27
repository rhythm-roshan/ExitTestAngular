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

interface betValue {
  first12: number,
  Second12: number,
  Third12: number,
  Zero: number,
  OnetoEighteen: number,
  NinteentoThirstySix: number,
  Even: number,
  Odd: number,
}

interface betValueBool {
  first12: boolean,
  Second12: boolean,
  Third12: boolean,
  Zero: boolean,
  OnetoEighteen: boolean,
  NinteentoThirstySix: boolean,
  Even: boolean,
  Odd: boolean,
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
  playAmount;
  bet: betValue;
  betBool: betValueBool;
  betAmount = 0;
  confirmBet;
  amount;

  model: any = {
    ex1: 0,
    ex2: 0,
    ex3: 0,
    ex4: 0,
    ex5: 0,
    ex6: 0,
    ex7: 0,
    ex8: 0,
  };

  Header = "Try Your Luck ";
  Body = " Are you sure you want to try your luck with your current selection ?";
  Option1 = "No";
  Option2 = "Sure!!";

  randomNumber;
  finalAmount = 0;

  constructor(private request: RouletteService, private router: Router) {
  }

  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('currentuser'));
    if (this.user.UserID == 0 || this.user.UserID == null) {
      alert("login first");
      this.router.navigate(["/login"]);

    }

  }


  UserUpdate(AccountBalance, BlockedAmount) {

    var currentUser = JSON.parse(sessionStorage.getItem('currentuser'));

    this.user = {
      UserID: currentUser.UserID,
      UserName: currentUser.UserName,
      DOB: currentUser.DOB,
      Contact: currentUser.Contact,
      Email: currentUser.Email,
      AccountBalance: AccountBalance,
      BlockedAmount: BlockedAmount,
      UniqueUserId: currentUser.UniqueUserId,
      image: currentUser.image
    }

    this.update(this.user);

  }

  update(user) {

    if (user.UserID != null) {
      this.request.updateData(user)
        .subscribe(data => {

          this.loadUser(this.user);
          sessionStorage.removeItem("currentuser");
          sessionStorage.setItem("currentuser", JSON.stringify(this.user));
          this.calculate();
        })
    }
  }

  loadUser(user) {
    if (user.UserID != null) {
      this.request.loadData(user).subscribe(data => {

        this.user = data;
        sessionStorage.removeItem("currentuser");
        sessionStorage.setItem("currentuser", JSON.stringify(this.user));
      })
    }
  }

  setValue(event, id) {


    for (var item in this.model) {

      if (item == id) {

        this.model[item] = event;


      }
      else {
        this.model[item] = 0;

      }
    }


  }

  setBetAmount() {
    this.mapBetwithValue();
    this.findBetAmount();
    if (this.betAmount > 0) {
      this.confirmBet = true;
    }
    else {
      this.confirmBet = false;
    }
  }

  onPlayAgain() {

    this.model = {
      ex1: 0,
      ex2: 0,
      ex3: 0,
      ex4: 0,
      ex5: 0,
      ex6: 0,
      ex7: 0,
      ex8: 0,
    };

  }


  play() {
    this.finalAmount = 0;
    this.amount =0;
    this.betAmount =0;
    this.mapBetwithValue();
    this.findBetAmount();

    if (this.betAmount > 0) {
      this.confirmBet = true;

      this.mapBetBoolwithValue();
      var currentUser = JSON.parse(sessionStorage.getItem('currentuser'));

      if (currentUser.AccountBalance < this.betAmount) {
        this.playAmount = false;
      }
      else {
        this.playAmount = true;
        this.UserUpdate(currentUser.AccountBalance - this.betAmount, this.betAmount)
      }
    }
    else {
      this.confirmBet = false;
    }


  }

  mapBetwithValue() {

    this.bet = {
      first12: this.model.ex1,
      Second12: this.model.ex2,
      Third12: this.model.ex3,
      Zero: this.model.ex4,
      OnetoEighteen: this.model.ex5,
      NinteentoThirstySix: this.model.ex6,
      Even: this.model.ex7,
      Odd: this.model.ex8,

    }

  }

  mapBetBoolwithValue() {
    this.randomNumber = this.random();

    this.betBool = {
      first12: false,
      Second12: false,
      Third12: false,
      Zero: false,
      OnetoEighteen: false,
      NinteentoThirstySix: false,
      Even: false,
      Odd: false,

    }


    if (this.randomNumber >= 1 && this.randomNumber <= 12 && this.bet.first12 > 0) {
      this.betBool['first12'] = true;

    }
    if (this.randomNumber >= 13 && this.randomNumber <= 24 && this.bet.Second12 > 0) {
      this.betBool['Second12'] = true;

    }
    if (this.randomNumber >= 25 && this.randomNumber <= 36 && this.bet.Third12 > 0) {
      this.betBool.Third12 = true;

    }
    if (this.randomNumber == 0 && this.bet.Zero) {
      this.betBool['Zero'] = true;

    }
    if (this.randomNumber >= 1 && this.randomNumber <= 18 && this.bet.OnetoEighteen > 0) {
      this.betBool['OnetoEighteen'] = true;

    }
    if (this.randomNumber >= 19 && this.randomNumber <= 36 && this.bet.NinteentoThirstySix > 0) {
      this.betBool['NinteentoThirstySix'] = true;

    }
    if (this.randomNumber % 2 == 0 && this.bet.Even > 0) {
      this.betBool['Even'] = true;

    }
    if (this.randomNumber % 2 != 0 && this.bet.Odd > 0) {
      this.betBool['Odd'] = true;

    }


  }


  random(): number {
    var b = [];
    var len = 20;
    var sumsArray = new Array(len);
    for (var i = 0; i < len; i++)
    {
      var c = [];
      var sum = [];
      var length = Math.floor((Math.random() * 10) + 1);
      var sumOdd = 0;
      var sumEven = 0;
      for (var j = 1; j <= length; j++)
      {
        var digit = Math.floor((Math.random() * 9));
        if (j % 2 == 0) {
          sumEven = sumEven + digit;
        } else {
          sumOdd = sumOdd + digit;
        }
        c.push(digit);
      }

      sumsArray[i]= new Array(2);
      sumsArray[i][0]=sumOdd;
      sumsArray[i][1]=sumEven;

      b.push(c);
    }
    var result =this.RecursiveFunction(sumsArray, sumsArray[0][0], sumsArray[0][1], 1);
    //console.log(result);
    result=result%37;
    return result;
  }

  RecursiveFunction(a, currentOddSum, currentEvenSum, index)
  {
    // console.log("index" + index);
    if (index == a.length-1) {
      return Math.abs(currentOddSum - currentEvenSum);
    }
    var temp1 = currentOddSum + a[index][0];
    var temp2 = currentEvenSum + a[index][1];
    var option1 = this.RecursiveFunction(a, temp1, temp2, index + 1);

    temp1 = currentOddSum + a[index][1];
    temp2 = currentEvenSum + a[index][0];
    var option2 = this.RecursiveFunction(a, temp1, temp2, index + 1);
    var val= Math.min(option1, option2);
    // console.log(val);
    return val;

  }


  findBetAmount() {
    if (this.bet.first12 > 0) {

      this.betAmount = this.bet.first12;
    }
    if (this.bet.Second12 > 0) {

      this.betAmount = this.bet.Second12;
    }
    if (this.bet.Third12 > 0) {

      this.betAmount = this.bet.Third12;
    }
    if (this.bet.Zero) {

      this.betAmount = this.bet.Zero;
    }
    if (this.bet.OnetoEighteen > 0) {

      this.betAmount = this.bet.OnetoEighteen;
    }
    if (this.bet.NinteentoThirstySix > 0) {

      this.betAmount = this.bet.NinteentoThirstySix;
    }
    if (this.bet.Even > 0) {

      this.betAmount = this.bet.Even;
    }
    if (this.bet.Odd > 0) {

      this.betAmount = this.bet.Odd;
    }

  }


  calculate() {
    console.log("RNo :" + this.randomNumber);


    if (this.betBool.first12) {
      this.finalAmount = this.bet.first12 + (this.bet.first12 * betting.first12);
      this.amount = this.finalAmount - this.bet.first12;
    }
    if (this.betBool.Second12) {

      this.finalAmount = this.bet.Second12 + this.bet.Second12 * betting.Second12;
      this.amount = this.finalAmount - this.bet.Second12;
    }
    if (this.betBool.Third12) {

      this.finalAmount = this.bet.Third12 + this.bet.Third12 * betting.Third12;
      this.amount = this.finalAmount - this.bet.Third12;
    }

    if (this.betBool.Zero) {

      this.finalAmount = this.bet.Zero + this.bet.Zero * betting.Zero;
      this.amount = this.finalAmount - this.bet.Zero;
    }
    if (this.betBool.OnetoEighteen) {

      this.finalAmount = this.bet.OnetoEighteen + this.bet.OnetoEighteen * betting.OnetoEighteen;
      this.amount = this.finalAmount - this.bet.OnetoEighteen;
    }
    if (this.betBool.NinteentoThirstySix) {

      this.finalAmount = this.bet.NinteentoThirstySix + this.bet.NinteentoThirstySix * betting.NinteentoThirstySix;
      this.amount = this.finalAmount - this.bet.NinteentoThirstySix;
    }
    if (this.betBool.Even) {

      this.finalAmount = this.bet.Even + this.bet.Even * betting.Even;
      this.amount = this.finalAmount - this.bet.Even;
    }
    if (this.betBool.Odd) {

      this.finalAmount = this.bet.Odd + this.bet.Odd * betting.Odd;
      this.amount = this.finalAmount - this.bet.Odd;
    }
    console.log(this.finalAmount);
    var currentUser = JSON.parse(sessionStorage.getItem('currentuser'));
    this.finalUpdate(currentUser.AccountBalance + this.finalAmount, 0)

  }

  finalUpdate(AccountBalance, BlockedAmount) {
    var currentUser = JSON.parse(sessionStorage.getItem('currentuser'));

    this.user = {
      UserID: currentUser.UserID,
      UserName: currentUser.UserName,
      DOB: currentUser.DOB,
      Contact: currentUser.Contact,
      Email: currentUser.Email,
      AccountBalance: AccountBalance,
      BlockedAmount: BlockedAmount,
      UniqueUserId: currentUser.UniqueUserId,
      image: currentUser.image
    }

    sessionStorage.removeItem("currentuser");
    sessionStorage.setItem("currentuser", JSON.stringify(this.user));

    this.request.updateData(this.user)
      .subscribe(data => {

      })


  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }

}
