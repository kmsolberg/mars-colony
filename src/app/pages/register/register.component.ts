import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Cant be this value': value } : null;
  };
};

const age = (tooYoung: number, tooOld: number): ValidatorFn => {
  if (tooYoung < 0 || tooOld < 0) {
    throw new Error('You can\'t be negative age...');
  }
  return (control: AbstractControl) => {
    return control.value < 0 || control.value < tooYoung || control.value > tooOld ?
      { 'You\'re not the right age...': age } : null;
  };
};

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
  registerForm: FormGroup;
  NO_OCCUPATION_SELECTED = '(none)';

  constructor(private jobService: JobsService,
    private colonistService: ColonistService,
    private router: Router,
    private formBuilder: FormBuilder) {
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
      age: new FormControl('', [Validators.required, age(16, 98)]),
      job_id: new FormControl(this.NO_OCCUPATION_SELECTED, [cantBe(this.NO_OCCUPATION_SELECTED)])
    });
  }

  register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      alert('Please fill out the form!');
      return;
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      const colonist = new Colonist(name, age, job_id);
      this.colonistService
        .postData(colonist)
        .subscribe(colonist => {
          window.localStorage.setItem('userID', colonist.colonist.id);
          this.router.navigate(['/encounters']);
        });
    }
  }
}
