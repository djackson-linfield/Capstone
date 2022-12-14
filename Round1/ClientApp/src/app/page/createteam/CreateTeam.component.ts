import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TourneyServices } from 'src/services/tourney-service'
import { TeamServices } from '../../../services/team-service';
import { TourneyModel } from '../../models/tourney-model';

@Component({
  selector: 'app-create-team',
  templateUrl: './CreateTeam.component.html',
  providers: [TeamServices]
})

export class CreateTeamComponent {


  teams: any;
  constructor(
    private eventData: TeamServices,
    private _router: Router,  ) {
    this.eventData.getTeams().subscribe((data) => { this.teams = data; });
  }
  getEventFormData(data:any) {
    console.warn(data)
    this.eventData.saveTourney(data).subscribe((result) => {
      console.warn()
    })
    this._router.navigate(['/team']);
  }
  // TODO: Give boxes for the rest of the data pieces in the Team function
}
