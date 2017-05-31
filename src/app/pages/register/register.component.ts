import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
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
  }

  postColonist() {
    // this.colonist.age = this.colonist.age.toString();
    this.colonistService.postData(this.colonist)
                        .subscribe((newColonist) => {
                        this.router.navigate(['/encounters']);
                      });
  }

  // onSubmit(){
  //   this.colonistService
  //       .newColonist(this.colonist)
  //       .then(colonist => {
  //           this.router.navigate(['/encounters']);
  //       })
  //       .catch(error => {
  //           // TODO: Handle error
  //       });
// }
}
