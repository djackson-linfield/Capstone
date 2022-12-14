import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserServices } from '../../../services/user-service';
import { SessionService } from '../../../services/session.service';
import { TeamServices } from '../../../services/team-service';
import { TeamModel } from '../../models/team-model';
import { UserModel } from '../../models/user-model';
import { GameServices } from '../../../services/game-service';

@Component({
  selector: 'app-event',
  templateUrl: './Teams.component.html',
  providers: [TeamServices, UserServices, GameServices]
})
export class TeamComponent {
  public teams: TeamModel[] = [];
  private dialog: NgbModalRef | undefined = undefined;
  public username = '';
  public password = '';
  public userTeamId? = -1;
  public games: String[] = []
  public errorMessage = '';
  public constructor(
    private teamService: TeamServices,
    private gameService: GameServices,
    private sessionService: SessionService,
    private modalService: NgbModal,
    private userService: UserServices,
    private _router: Router,
    private _route: ActivatedRoute,) {

  }


  ngOnInit() {
    // gets called only once, when the component is ready
    this.reload();
  }

  public reload() {
    console.log('reload');
    // invoke the C# API UsersController.GetItems()
    this.teamService.getTeams().subscribe(
      result => {
        this.teams = result.map(x => new TeamModel(x));
        console.log('got teams: ', this.teams);
      },
      error => {
        console.error(error);
      }
    );
    this.gameService.GetGameNameForTeam().subscribe(
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

    let user: UserModel = new UserModel;
    user.userId = this.sessionService.userId;
    this.userService.postSingleUser(user.userId).subscribe(
      result => {
        user = result;
        this.userTeamId = user.teamId;
      }
    );

    console.log('reload done');
  }

  public CreateTeam() {
    console.log("Button Press")
    this._router.navigate(['/create-team']);

  }


  public JoinTeam(team: TeamModel) {
    let user: UserModel = new UserModel;
    user.userId = this.sessionService.userId;
    this.userService.postSingleUser(user.userId).subscribe(
      result => {
        user = result;
        this.UpdateUser(team, user);
        console.log('updated user');
      }
    );
  }
  public UpdateUser(team: TeamModel, user:UserModel) {
    user.teamId = team.teamId;
    this.userService.UpdateUser(user).subscribe(
      (result) => {
        console.warn()
        this.reloadCurrentRoute();
      }
    );
  }

  public IsInThisTeam(team: TeamModel) {
        if (this.userTeamId == team.teamId && this.sessionService.isLoggedIn()) {
          return true;
        }
        return false;
  }
  public UserTeamNull() {

        if (this.userTeamId == 0 && this.sessionService.isLoggedIn()) {
          return true;
        }
        return false;

  }

  public LeaveTeam() {
    var user = new UserModel;
    user.userId = this.sessionService.userId;
    this.userService.LeaveTeam(user).subscribe(
      (result) => {
        console.warn()
        this.reloadCurrentRoute();
      }
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
// Login Stuff

  isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

open(content: any) {
  this.errorMessage = "";
  this.dialog = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

}
cancel() {
  this.dialog?.close();
}

save() {
  console.log("Login:")

  let user = new UserModel();
  user.name = this.username;
  user.password = this.password;
  this.userService.postId(user).subscribe( // Gets UserId when Logging in
    (result: any) => {
      user.userId = result;
    }
  )

  this.userService.post(user).subscribe( // performs the login and check if user and pass is correct
    (result: any) => {
      this.dialog?.close();
      this.sessionService.login(user.userId, this.username); // sets the UserId to the correct ID
      this.reloadCurrentRoute();
    },
    (err: { error: string; }) => {
      console.log(err);
      this.errorMessage = err.error;
    }
  )
}
}
