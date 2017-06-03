import { Component, OnInit } from '@angular/core';
import { Aliens } from '../../models/aliens';
import { AliensService } from '../../services/aliens.service';
// import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';

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
  providers: [AliensService]
})
export class ReportComponent implements OnInit {

  aliens: Aliens[] = [];
  report: Report;
  registerForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(private aliensService: AliensService,
              // private reportService: ReportService,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.report = new Report(this.NO_ALIEN_SELECTED, '', '', '');
              }

  ngOnInit() {
    this.aliensService.getData()
    .subscribe((data) => {
      this.aliens = data.aliens;
    });
    this.registerForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED),
      date: new FormControl('', [Validators.required]),
      action: new FormControl('', [Validators.required]),
      colonist_id: new FormControl('')
    });
  }

//   register(e) {
//     e.preventDefault();
//     if (this.registerForm.invalid) {
//       // the form is invalid
//     } else {
//       const atype = this.registerForm.get('atype').value;
//       const action = this.registerForm.get('action').value;
//       const report = new Report(atype, date, action, colonist_id);
//       this.reportService
//       .postData(this.report)
//       .subscribe(report => {
//         this.router.navigate(['/encounters']);
//       });
//     }
//   }
// }
}