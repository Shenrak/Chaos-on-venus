import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  url = 'https://rjt2w6mr7f.execute-api.eu-west-3.amazonaws.com/Stage';

  constructor(private http: HttpClient) { }

  // getRessources() {
  //   return this.http.get(this.url + '/ressource');
  // }

  getDay() {
    return this.http.get(this.url + '/runDay');
  }

  getInfrastructures() {
    return this.http.get(this.url + '/api/infrastructures');
  }

}
