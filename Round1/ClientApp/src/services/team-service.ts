import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TeamModel } from '../app/models/team-model';
import { catchError, map } from 'rxjs/operators';




@Injectable()
export class TeamServices {
  url = 'http://localhost:5126/';
  constructor(
    private http: HttpClient, ) { }
  saveTourney(team: TeamModel) {
    return this.http.post<TeamModel[]>(this.url + 'api/teams/Post', team)
  }

  // invoke the C# API UsersController.GetTeams()
  public getTeams() : Observable<TeamModel[]>{ 
    return this.http.get<TeamModel[]>(this.url + 'api/teams/GetTeams');
  }
  public GetTeamName(teamId: number | undefined) {
    return this.http.post(this.url + 'api/teams/GetTeamName', teamId);
  }
}
