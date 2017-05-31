import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Aliens } from '../models/aliens';

@Injectable()
export class AliensService {

  private ALIENS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
  constructor(private http: Http) { }

  getData() {
    return this.http.get(this.ALIENS_URL)
                    .map(this.extractAliens)
  }

  extractAliens(res: Response) {
    let aliens = res.json();
    return aliens;
  }

}
