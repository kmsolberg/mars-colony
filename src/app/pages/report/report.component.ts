import { Component, OnInit } from '@angular/core';
import { Aliens } from '../../models/aliens';
import { AliensService } from '../../services/aliens.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Aliens[] = [];
  encounter: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(private aliensService: AliensService,
              private reportService: ReportService,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.encounter = new Report( this.NO_ALIEN_SELECTED, '', '', '');
              }

  ngOnInit() {
    this.aliensService.getData()
    .subscribe((data) => {
      this.aliens = data.aliens;
    });
    this.reportForm = new FormGroup({
      a_type: new FormControl(this.NO_ALIEN_SELECTED),
      action: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
        ]),
    });
  }

  register(e) {
    e.preventDefault();
    if (this.reportForm.invalid) {
      // the form is invalid
    } else {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const colonist_id = window.localStorage.userID;
      const action = this.reportForm.get('action').value;
      const atype = this.reportForm.get('a_type').value;
      const encounter = new Report(atype, date, action, colonist_id);
      console.log('WIN!', encounter)
      this.reportService
      .postData(encounter)
      .subscribe(report => {
        this.router.navigate(['/encounters']);
      });
    }
  }
}
