import { RessourcesService } from './../ressources.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  // Variable défini pour le test du sample
  RESSOURCESDATA: Ressources[] = [];
  // Heure, qui représente une clé de notre JSON renvoyé par l'API
  HOUR: any;
  TABHOUR = [];
  // On stockera les logs dans ce tableau
  LOGS: string[] = [];
  // Valeur des rations
  RATION: number;
  // Tableau de l'évolution des rations
  TABRATION: number[] = [];
  // Tableau de l'évoltion de l'électricité
  TABELECTRICITY: number[] = [];
  // Valeur de l'électricité
  ELECTRICITY: number;
  // Valeur de l'intervalle
  interval;
  // Ici que sera stocké la data récupéré par l'API
  RETRIEVEDATA: any;
  // Ici que sera stocké la data récupéré de l'API Infrastructures
  INFRASTRUCTURESDATA: any;

  // Graphique
  chart;
  canvas;

  // Sample pour tester l'affichage en FRONT
  ALLDATA = {
    '0:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '1:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '2:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '3:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '4:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '5:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '6:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '7:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '8:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '9:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '10:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '11:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '12:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'ressourcesToConsume': [{
        'ressource': 'ration',
        'quantity': 5
      }, {
        'ressource': 'electricity',
        'quantity': 16.5
      }]
    },
    '13:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '14:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '15:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '16:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '17:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '18:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'workForcesToAdd': [{
        'infrastructureId': '7cdadf1f-9bb5-4c9f-a976-f1c3d55a0659',
        'workForce': 10
      }, {
        'infrastructureId': '15cacba1-9b79-4597-967e-9deba82a3d3e',
        'workForce': 6
      }],
      'ressourcesToRefill': [{
        'ressource': 'electricity',
        'quantity': 15
      }]
    },
    '19:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }],
      'ressourcesToConsume': [{
        'ressource': 'ration',
        'quantity': 5
      }, {
        'ressource': 'electricity',
        'quantity': 16.5
      }]
    },
    '20:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '21:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '22:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    },
    '23:00': {
      'ressource': [{
        'ressource': 'ration',
        'quantity': 78
      }, {
        'ressource': 'electricity',
        'quantity': 56
      }]
    }
  };

  constructor(public ressourcesServices: RessourcesService) { }

  ngOnInit() {

    // this.ressourcesServices.getRessources().subscribe(
    //   ((data: Ressources[]) => {
    //     this.RESSOURCESDATA = data;
    // }));

    // On récupère les data des infrastructures
    this.ressourcesServices.getInfrastructures().subscribe(
      ((data) => {
        this.INFRASTRUCTURESDATA = data;
      })
    );

    // On récupère les data de la routine
    this.ressourcesServices.getDay().subscribe(
      ((data) => {
        this.RETRIEVEDATA = data;
        console.log(this.RETRIEVEDATA);
        console.log(Object.keys(this.RETRIEVEDATA)[1]);

        let i = 0;
        // this.interval = setInterval(() => {
        //   if (i === 24) {
        //     clearInterval(this.interval);
        //   } else {
        //     this.runHour(Object.keys(this.RETRIEVEDATA)[i]);
        //     i++;
        //   }
        // }, 500);

        // On récupère la data
        for (i; i < 24; i++) {
          this.runHour(Object.keys(this.RETRIEVEDATA)[i]);
        }

        // On génère les graphs
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.TABHOUR,
            datasets: [
              {
                data: this.TABRATION,
                borderColor: '#2abbc7',
                backgroundColor: '#2abbc7',
                fill: false,
                label: 'Rations'
              },
              {
                data: this.TABELECTRICITY,
                borderColor: '#2d4154',
                backgroundColor: '#2d4154',
                fill: false,
                label: 'Electricité'
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });

      })
    );

    // Code sample
    // this.runDay();
    // let i = 0;
    // this.interval = setInterval(() => {
    //   if (i === 24) {
    //     clearInterval(this.interval);
    //   } else {
    //     this.runHour(Object.keys(this.ALLDATA)[i]);
    //     i++;
    //   }
    // }, 5000);

  }


  runHour(key) {
    this.HOUR = key;
    this.TABHOUR.push(this.HOUR);
    this.RATION = this.RETRIEVEDATA[key].ressource[0].quantity;
    this.TABRATION.push(this.RATION);
    this.ELECTRICITY = this.RETRIEVEDATA[key].ressource[1].quantity;
    this.TABELECTRICITY.push(this.ELECTRICITY);

    this.LOGS.push('[' + key + '] ' + this.RETRIEVEDATA[key].ressource[0].type + ': ' + this.RETRIEVEDATA[key].ressource[0].quantity
      + ', ' + this.RETRIEVEDATA[key].ressource[1].type + ': ' + this.RETRIEVEDATA[key].ressource[1].quantity);

    // Si la clé WorkForcesToAdd est présente, on rentre dans le IF
    if (this.RETRIEVEDATA[key].hasOwnProperty('workForcesToAdd')) {
      for (let i = 0; i < this.RETRIEVEDATA[key].workForcesToAdd.length; i++) {
        this.LOGS.push('[' + key + '] INFRASTRUCTURE : ' + this.RETRIEVEDATA[key].workForcesToAdd[i].infrastructureId +
          ', WORKFORCE TO ADD : ' + this.RETRIEVEDATA[key].workForcesToAdd[i].workForce);
      }
    }

    // Si la clé ressourcesToRefill est présente, on rentre dans le IF
    if (this.RETRIEVEDATA[key].hasOwnProperty('ressourcesToRefill')) {
      for (let i = 0; i < this.RETRIEVEDATA[key].ressourcesToRefill.length; i++) {
        this.LOGS.push('[' + key + '] RESSOURCE TO REFILL - ' + this.RETRIEVEDATA[key].ressourcesToRefill[i].ressource +
          ' : ' + this.RETRIEVEDATA[key].ressourcesToRefill[i].quantity);
      }
    }

    // Si la clé ressourcesToConsume est présente, on rentre dans le IF
    if (this.RETRIEVEDATA[key].hasOwnProperty('ressourcesToConsume')) {
      for (let i = 0; i < this.RETRIEVEDATA[key].ressourcesToConsume.length; i++) {
        this.LOGS.push('[' + key + '] RESSOURCE TO CONSUME - ' + this.RETRIEVEDATA[key].ressourcesToConsume[i].ressource + ' : '
          + this.RETRIEVEDATA[key].ressourcesToConsume[i].quantity);
      }
    }

    // Si la clé plagueLog est présente, on rentre dans le IF
    if (this.RETRIEVEDATA[key].hasOwnProperty('plagueLog')) {
      this.LOGS.push('[' + key + '] EPIDEMEDIE DETECTEE - IMPACT SUR LES HUMAINS');
    }

  }

  // Code sample
  // runHour(key) {
  //   this.HOUR = key;
  //   this.RATION = this.ALLDATA[key].ressource[0].quantity;
  //   this.ELECTRICITY = this.ALLDATA[key].ressource[1].quantity;

  //   this.LOGS.push('[' + key + '] ' + this.ALLDATA[key].ressource[0].ressource + ': ' + this.ALLDATA[key].ressource[0].quantity
  //     + ', ' + this.ALLDATA[key].ressource[1].ressource + ': ' + this.ALLDATA[key].ressource[1].quantity);

  //   // Si la clé WorkForcesToAdd est présente, on rentre dans le IF
  //   if (this.ALLDATA[key].hasOwnProperty('workForcesToAdd')) {
  //     for (let i = 0; i < this.ALLDATA[key].workForcesToAdd.length; i++) {
  //       this.LOGS.push('[' + key + '] INFRASTRUCTURE : ' + this.ALLDATA[key].workForcesToAdd[i].infrastructureId +
  //         ', WORKFORCE TO ADD : ' + this.ALLDATA[key].workForcesToAdd[i].workForce);
  //     }
  //   }

  //   // Si la clé ressourcesToRefill est présente, on rentre dans le IF
  //   if (this.ALLDATA[key].hasOwnProperty('ressourcesToRefill')) {
  //     for (let i = 0; i < this.ALLDATA[key].ressourcesToRefill.length; i++) {
  //       this.LOGS.push('[' + key + '] RESSOURCE TO REFILL - ' + this.ALLDATA[key].ressourcesToRefill[i].ressource +
  //         ' : ' + this.ALLDATA[key].ressourcesToRefill[i].quantity);
  //     }
  //   }

  //   // Si la clé ressourcesToConsume est présente, on rentre dans le IF
  //   if (this.ALLDATA[key].hasOwnProperty('ressourcesToConsume')) {
  //     for (let i = 0; i < this.ALLDATA[key].ressourcesToConsume.length; i++) {
  //       this.LOGS.push('[' + key + '] RESSOURCE TO CONSUME - ' + this.ALLDATA[key].ressourcesToConsume[i].ressource + ' : '
  //         + this.ALLDATA[key].ressourcesToConsume[i].quantity);
  //     }
  //   }
  // }

  runDay() {
    Object.keys(this.ALLDATA).forEach(function (key) {
      this.HOUR = key;
      this.RATION = this.ALLDATA[key].ressource[0].quantity;
      this.ELECTRICITY = this.ALLDATA[key].ressource[1].quantity;

      this.LOGS.push('[' + key + '] ' + this.ALLDATA[key].ressource[0].ressource + ': ' + this.ALLDATA[key].ressource[0].quantity
        + ', ' + this.ALLDATA[key].ressource[1].ressource + ': ' + this.ALLDATA[key].ressource[1].quantity);

      // Si la clé WorkForcesToAdd est présente, on rentre dans le IF
      if (this.ALLDATA[key].hasOwnProperty('workForcesToAdd')) {
        for (let i = 0; i < this.ALLDATA[key].workForcesToAdd.length; i++) {
          this.LOGS.push('[' + key + '] INFRASTRUCTURE : ' + this.ALLDATA[key].workForcesToAdd[i].infrastructureId +
            ', WORKFORCE TO ADD : ' + this.ALLDATA[key].workForcesToAdd[i].workForce);
        }
      }

      // Si la clé ressourcesToRefill est présente, on rentre dans le IF
      if (this.ALLDATA[key].hasOwnProperty('ressourcesToRefill')) {
        this.LOGS.push('[' + key + '] RESSOURCE TO REFILL - ' + this.ALLDATA[key].ressourcesToRefill[0].ressource +
          ' : ' + this.ALLDATA[key].ressourcesToRefill[0].quantity);
      }

      // Si la clé ressourcesToConsume est présente, on rentre dans le IF
      if (this.ALLDATA[key].hasOwnProperty('ressourcesToConsume')) {
        for (let i = 0; i < this.ALLDATA[key].ressourcesToConsume.length; i++) {
          this.LOGS.push('[' + key + '] RESSOURCE TO CONSUME - ' + this.ALLDATA[key].ressourcesToConsume[i].ressource + ' : '
            + this.ALLDATA[key].ressourcesToConsume[i].quantity);
        }
      }
    }, this);
  }
}

export class Ressources {
  ration: number;
  electricity: number;
}
