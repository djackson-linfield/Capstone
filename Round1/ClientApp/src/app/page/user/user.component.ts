import { Component } from '@angular/core';
import { UserServices } from '../../../services/user-service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../../services/session.service';
import { UserModel } from '../../models/user-model';
import { ActivatedRoute, Router } from '@angular/router';
import { TUserServices } from '../../../services/tuser-service';
import { TUserModel } from '../../models/tuser-model';
import { TourneyServices } from '../../../services/tourney-service';
import { TourneyModel } from '../../models/tourney-model';
import { GameServices } from '../../../services/game-service';
import { GameModel } from '../../models/game-model';
import { TeamServices } from '../../../services/team-service';


@Component({
  selector: 'app-home',
  templateUrl: './user.component.html',
  providers: [UserServices, SessionService, TUserServices, TourneyServices, GameServices, TeamServices]
})
export class UserComponent {
  public tusers: TUserModel[] = [];
  public tourneys: TourneyModel[] = [];
  public user: UserModel = new UserModel;
  public gameName = "";
  public teamName = "";
  public userId = 0;
  public errorMessage = '';
  private dialog: NgbModalRef | undefined = undefined;
  public constructor(
    private sessionService: SessionService,
    private modalService: NgbModal,
    private tourneyService: TourneyServices,
    private teamService: TeamServices,
    private tUserService: TUserServices,
    private gameService: GameServices,
    private userService: UserServices,
    private _router: Router,
    private _route: ActivatedRoute,)
  {
    let id = this._route.snapshot.paramMap.get('id');
    this.userId = parseInt(<string>id);
    console.log('got user id: ', this.userId);
  }
  ngOnInit() {
    // gets called only once, when the component is ready
    this.reload();

  }
  public reload() {
    console.log('reload');
    this.user.userId = this.userId;
    this.userService.postSingleUser(this.user.userId).subscribe( // get the user information
      (result: any) => {
        this.user.gameId = result.gameId;
        this.user.name = result.name;
        this.user.teamId = result.teamId;
        this.user.loss = result.loss;
        this.user.wins = result.wins;
        this.userGame();
        this.userTeamName();
      },
      error => {
        console.error(error);
      }
    );

    this.tUserService.GetTUserId(this.userId).subscribe(
      (result) => {
        this.tusers = result.map(x => new TUserModel(x));
        console.log('got tusers: ', this.tusers);
        this.tourneyForUser();
      },
      error => {
        console.error(error);
      }
    );


    console.log('reload done');
  }
  public userGame() {
      this.gameService.GetGameName(this.user.gameId).subscribe(
        (result: any) => {
          this.gameName = result.game.name;
        },
        error => {
          console.error(error);
        }
      );
  }
  public userTeamName() {
    this.teamService.GetTeamName(this.user.teamId).subscribe(
      (result: any) => {
        this.teamName = result.team.name
      }
    );

  }
  public tourneyForUser() { // gets the tourneys from the tusersID
    for (let i = 0; i < this.tusers.length; i++) {
      this.tourneyService.GetTourneyName(this.tusers[i].tourneyId).subscribe(
        (result: any) => {
         this.tourneys[i] = result.tourney;
          console.log('got tourneys: ', this.tourneys);
        },
        error => {
          console.error(error);
        }
      );
      console.log('reload done')
    }
  }
}

