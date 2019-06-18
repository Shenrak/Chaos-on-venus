import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor() { }

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  ngOnInit() {
      this.myStyle = {
          'position': 'static',
          'width': '100%',
          'height': '400px',
          'z-index': -1,
          'top': 0,
          'left': 0,
          'right': 0,
          'bottom': 0,
          'background-image' : 'url(\'https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg\')'
      };
  this.myParams = {
          particles: {
              number: {
                  value: 200,
              },
              color: {
                  value: '#888888'
              },
              shape: {
                  type: 'circle'
              },
              speed: {
                 value: 'medium'
              },
              density: {
                value: 'high'
              }
      }
  };
  }

}
