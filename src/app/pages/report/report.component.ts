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
  report: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(private aliensService: AliensService,
              private reportService: ReportService,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.report = new Report(this.NO_ALIEN_SELECTED, '', '', '');
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
      const atype = this.reportForm.get('atype').value;
      const date = Date.now();
      const action = this.reportForm.get('action').value;
      const colonist_id = window.localStorage.userID;
      const report = new Report(atype, date, action, colonist_id);
      console.log('WIN!', report)
      this.reportService
      .postData(this.report)
      .subscribe(report => {
        this.router.navigate(['/encounters']);
      });
    }
  }
}
