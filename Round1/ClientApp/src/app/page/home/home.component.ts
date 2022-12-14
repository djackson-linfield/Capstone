import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameServices } from '../../../services/game-service';
import { TourneyServices } from '../../../services/tourney-service';
import { TourneyModel } from '../../models/tourney-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [TourneyServices, GameServices]
})
export class HomeComponent {
  public tourneys: TourneyModel[] = [];
  public games: String[] = [];
  constructor(
    private tourneyService: TourneyServices,
    private gameService: GameServices,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // gets called only once, when the component is ready
    this.reload();
  }

  public reload() {
    console.log('reload');
    // invoke the C# API UsersController.GetItems()
    this.tourneyService.getTourneys().subscribe(
      result => {
        this.tourneys = result.map(x => new TourneyModel(x));
        console.log('got tourneys: ', this.tourneys);
      },
      error => {
        console.error(error);
      }
    );

    this.gameService.GetGameNameForTourney().subscribe(
      (result: any) => {
        for (let i = 0; i < result.length; i++) {
          this.games[i] = result[i].g;
        }
        console.log('got games: ', this.games);
      },
      error => {
        console.error(error);
      }
    );
    console.log('reload done');
  }
}
