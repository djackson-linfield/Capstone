import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TUserModel } from '../app/models/tuser-model';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from "../app/models/user-model";




@Injectable()
export class TUserServices {
  url = 'http://localhost:5126/';
  constructor(
    private http: HttpClient,) { }

  // invoke the C# API UsersController.GetItems()
  public getTUsers() : Observable<TUserModel[]>{ 
    return this.http.get<TUserModel[]>(this.url + 'api/tusers/GetTUsers');
  }
  postTuser(tuser: TUserModel) {
    return this.http.post<TUserModel[]>(this.url + 'api/tusers/PostTuser', tuser)
  }
  GetTUserId(userId: number) {
    return this.http.post<TUserModel[]>(this.url + 'api/tusers/GetTUserId', userId)
  }
  GetTUserTourney(tourneyId: number) {
    return this.http.post<TUserModel[]>(this.url + 'api/tusers/GetTUserTourney', tourneyId)
  }
/*  CheckIfInTourney(userId: number, tournamentId: number) {
    return this.http.post<TUserModel>(this.url + 'api/tusers/CheckIfInTourney', userId, tournamentId)
  }*/
}
