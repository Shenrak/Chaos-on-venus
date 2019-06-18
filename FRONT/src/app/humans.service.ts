import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HumansService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getHumans() {
    return this.http.get(this.url + '/human/');
  }

  setupHuman(number)  {
    return this.http.post(this.url + '/savehuman/',
    {
      'number': number
    });
  }

  updateHuman(number) {
    return this.http.put(this.url + '/updatehuman/' + number, number);
  }

  deleteHuman(id: number) {
     return this.http.delete(this.url + '/deletehumans/');
  }
}
