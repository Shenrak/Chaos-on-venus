import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getRobots() {
    return this.http.get(this.url + '/robot/');
  }

  setupRobot(number)  {
    return this.http.post(this.url + '/saverobot/',
    {
      'number': number
    });
  }

  updateRobot(number) {
    return this.http.put(this.url + '/updaterobot/' + number, number);
  }

  deleteRobot(id: number) {
     return this.http.delete(this.url + '/deleterobots/');
  }


}
