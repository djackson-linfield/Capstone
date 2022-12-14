import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from '../app/models/user-model';
import { catchError, map } from 'rxjs/operators';




@Injectable()
export class UserServices {
  baseUrl = 'http://localhost:5126/';
  constructor(
    private http: HttpClient){}

  // invoke the C# API UsersController.GetItems()
  public getUsers() : Observable<UserModel[]>{ 
    return this.http.get<UserModel[]>(this.baseUrl + 'api/users/GetUsers');
  }
  public post(user: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl + 'api/users/Post', user);
  }
  public postId(user: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl + 'api/users/PostId', user);
  }
  public postSingleUser(userId: number): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'api/users/GetSingleUser', userId);
  }
  public checkIfExist(user: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl + 'api/users/CheckIfExist', user);
  }
  public postNewUser(user: UserModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(this.baseUrl + 'api/users/PostNewUser', user);
  }
  public UpdateUser(user: UserModel) {
    return this.http.put(this.baseUrl + 'api/users/UpdateUser', user);
  }
  public LeaveTeam(user: UserModel) {
    return this.http.put(this.baseUrl + 'api/users/UpdateUser', user);
  }
}
