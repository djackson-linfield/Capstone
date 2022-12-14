import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourneyServices } from '../../../services/tourney-service';
import { TourneyModel } from '../../models/tourney-model';
import { SessionService } from '../../../services/session.service';
import { UserServices } from '../../../services/user-service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models/user-model';
import { TUserModel } from '../../models/tuser-model';
import { TUserServices } from '../../../services/tuser-service';
import { GameServices } from '../../../services/game-service';



@Component({
  selector: 'app-event',
  templateUrl: './Event.component.html',
  providers: [TourneyServices, UserServices, TUserServices, GameServices]
})
export class EventComponent {
  public tourneys: TourneyModel[] = [];
  public games: String[]= []
  private dialog: NgbModalRef | undefined = undefined;
  public username = '';
  public password = '';
  public errorMessage = '';
  public constructor(
    private tourneyService: TourneyServices,
    private sessionService: SessionService,
    private modalService: NgbModal,
    private userService: UserServices,
    private gameService: GameServices,
    private tUserService: TUserServices,
    private _router: Router,
    private _route: ActivatedRoute,  ) {

  }

  isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

  ngOnInit() {
    // gets called only once, when the component is ready
    this.reload();
  }

  public reload() {
    console.log('reload');
    // calls GetTourneys in TourneyController
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
      (result: any )=> {
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
  //
  public CreateEvent() {
    console.log("Button Press")
    this._router.navigate(['/create-event']);

  }
  public EventDetails(eventId: number) {
    console.log("Button Press")
    this._router.navigate(['/event-details', eventId]);

  }
  public convertTime(time: Date) {
    let timeString = ""
    //timeString = String(time.getMonth) + "/" + String(time.getDay) + "/" + String(time.getFullYear) + " at " + String(time.getHours) + ":" + String(time.getMinutes);
    timeString = String(time.toUTCString);
    return timeString;
  }

  public JoinEvent(tourney: TourneyModel) {
    let tu = new TUserModel;
    tu.tourneyId = tourney.tourneyId;
    tu.userId = this.sessionService.userId;
    this.tUserService.postTuser(tu).subscribe(
      (result) => {
        console.warn()
        this.reloadCurrentRoute();
      });
  }

  //TODO: Allow the ability to see you are already in an event from this page
  //TODO: If a tournament is private, dont allow the user to join it

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
  // Login Stuff
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
