import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss']
})
export class EncountersComponent implements OnInit {
  message = 'Hello';
  listofMessages = [
    'Ciao',
    'Bonjour',
    'Buongiorno',
    'Wassup'
  ];

  constructor() { }

  ngOnInit() {
  }

}
