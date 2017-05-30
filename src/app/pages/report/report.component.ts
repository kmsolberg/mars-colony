import { Component, OnInit } from '@angular/core';
import { Aliens } from '../../models/aliens';
import { AliensService } from '../../services/aliens.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  aliens: Aliens[] = [];

  constructor(private aliensService: AliensService) {

   }

  ngOnInit() {
    this.aliensService.getData()
    .subscribe((data) => {
      this.aliens = data.aliens;
    });
  }

}
