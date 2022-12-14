import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourneyServices } from 'src/services/tourney-service'
import { TourneyModel } from '../../models/tourney-model';

@Component({
  selector: 'app-create-event',
  templateUrl: './CreateEvent.component.html',
  providers: [TourneyServices]
})

export class CreateEventComponent {
  

  tourneys: any;
  constructor(
    private tourneyService: TourneyServices,
    private _router: Router,) {
    this.tourneyService.getTourneys().subscribe((data) => { this.tourneys = data; });
  }
  getEventFormData(data: TourneyModel) {
    console.warn(data)
    this.tourneyService.saveTourney(data).subscribe((result) => {
      console.warn()
    })
    this._router.navigate(['/event']);
  }

  // Give more options to put more data into the Tourney Table
}
