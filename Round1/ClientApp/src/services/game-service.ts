import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GameModel } from '../app/models/game-model';
import { catchError, map } from 'rxjs/operators';




@Injectable()
export class GameServices {
  url = 'http://localhost:5126/';
  constructor(
    private http: HttpClient,) { }

  // invoke the C# API UsersController.GetItems()
  public getGames(): Observable<GameModel[]>{
    return this.http.get<GameModel[]>(this.url + 'api/games/GetGames');
  }
  public GetGameNameForTourney() {
    return this.http.get(this.url + 'api/games/GetGameNameForTourney')
  }
  public GetGameName(gameId: number | undefined) {
    return this.http.post(this.url + 'api/games/GetGameName', gameId);
  }
  public GetGameNameForTeam() {
    return this.http.get(this.url + 'api/games/GetGameNameForTeam')
  }
}
