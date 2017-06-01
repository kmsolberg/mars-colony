import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonist: Colonist;
  NO_OCCUPATION_SELECTED = '(none)';

  constructor(private jobService: JobsService,
              private colonistService: ColonistService,
              private router: Router) { 
                this.colonist = new Colonist('', '', this.NO_OCCUPATION_SELECTED);
              }

  ngOnInit() {
    this.jobService.getData()
    .subscribe((data) => {
      this.jobs = data.jobs;
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
        ]),
      age: new FormControl('', [Validators.required]),
      job_id: new FormControl('', [])
    });
  }

  postColonist() {
    this.colonistService.postData(this.colonist)
                        .subscribe((newColonist) => {
                        this.router.navigate(['/encounters']);
                        });
  }

}
