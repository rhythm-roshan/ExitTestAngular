import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map' ;

const BASE_URL = 'http://localhost:56636/api/game/';
const header = {headers: new Headers({'Content-Type': 'application/json'})}

@Injectable()
export class RouletteService {

  constructor(private http: Http) { }


  loadData(data) {
    return this.http.get(`${BASE_URL}${data.UserId}?UniqueID=${data.UniqueId}`).map(res => res.json());
  }

  updateData(data)
  {
    return this.http.put(`${BASE_URL}${data.UserID}`,data,header).map(res=> res.json());
  }

}
