import { RessourcesService } from './../ressources.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  RESSOURCESDATA: Ressources[] = [];
  HOUR: any;
  LOGS: string[] = [];
  RATION: number;
  ELECTRICITY: number;
  interval;
  RETRIEVEDATA: any;
  INFRASTRUCTURESDATA: any;

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

    this.ressourcesServices.getRessources().subscribe(
      ((data: Ressources[]) => {
        this.RESSOURCESDATA = data;
    }));

    this.ressourcesServices.getInfrastructures().subscribe(
      ((data) => {
        this.INFRASTRUCTURESDATA = data;
      })
    );

    // this.ressourcesServices.getDay().subscribe(
    //   ((data) => {
    //     this.RETRIEVEDATA = data;
    //     console.log(this.RETRIEVEDATA);
    //     console.log(Object.keys(this.RETRIEVEDATA)[1]);
    //   })
    // );

    // this.runDay();
    let i = 0;
    this.interval = setInterval(() => {
      if (i === 24) {
        clearInterval(this.interval);
      } else {
        this.runHour(Object.keys(this.ALLDATA)[i]);
        i++;
      }
    }, 5000);

  }

  runHour(key) {
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
      for (let i = 0; i < this.ALLDATA[key].ressourcesToRefill.length; i++) {
      this.LOGS.push('[' + key + '] RESSOURCE TO REFILL - ' + this.ALLDATA[key].ressourcesToRefill[i].ressource +
        ' : ' + this.ALLDATA[key].ressourcesToRefill[i].quantity);
      }
    }

    // Si la clé ressourcesToConsume est présente, on rentre dans le IF
    if (this.ALLDATA[key].hasOwnProperty('ressourcesToConsume')) {
      for (let i = 0; i < this.ALLDATA[key].ressourcesToConsume.length; i++) {
        this.LOGS.push('[' + key + '] RESSOURCE TO CONSUME - ' + this.ALLDATA[key].ressourcesToConsume[i].ressource + ' : '
          + this.ALLDATA[key].ressourcesToConsume[i].quantity);
      }
    }
  }

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
