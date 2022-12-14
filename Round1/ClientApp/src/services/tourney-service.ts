import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TourneyModel } from '../app/models/tourney-model';
import { catchError, map } from 'rxjs/operators';




@Injectable()
export class TourneyServices {
  url = 'http://localhost:5126/';
  constructor( private http: HttpClient,) { }

  saveTourney(tourney: TourneyModel): Observable<TourneyModel> {
    return this.http.post<TourneyModel>(this.url + 'api/tourneys/Post', tourney)
  }

  // invoke the C# API UsersController.GetItems()
  public getTourneys(): Observable<TourneyModel[]>{ 
    return this.http.get<TourneyModel[]>(this.url + 'api/tourneys/GetTourneys');
  }
  public GetTourneyName(tourneyId: number): Observable<TourneyModel> {
    return this.http.post<TourneyModel>(this.url + 'api/tourneys/GetTourneyName', tourneyId);
  }
}
