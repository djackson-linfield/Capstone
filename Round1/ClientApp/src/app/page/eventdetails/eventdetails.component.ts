import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GameServices } from '../../../services/game-service';
import { SessionService } from '../../../services/session.service';
import { TourneyServices } from '../../../services/tourney-service';
import { TUserServices } from '../../../services/tuser-service';
import { UserServices } from '../../../services/user-service';
import { TourneyModel } from '../../models/tourney-model';
import { TUserModel } from '../../models/tuser-model';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-aboutus',
  templateUrl: './eventdetails.component.html',
  providers: [TUserServices,UserServices,TourneyServices]
})
export class EventDetailsComponent {
  private tusers: TUserModel[] = [];
  public users: UserModel[] = [];
  private dialog: NgbModalRef | undefined = undefined;
  public username = '';
  public password = '';
  public tourneyId = 0;
  public errorMessage = '';
  public constructor(
    private tourneyService: TourneyServices,
    private sessionService: SessionService,
    private modalService: NgbModal,
    private userService: UserServices,
    private tUserService: TUserServices,
    private _router: Router,
    private _route: ActivatedRoute,) {
    let id = this._route.snapshot.paramMap.get('id');
    this.tourneyId = parseInt(<string>id);
    console.log('got user id: ', this.tourneyId);

  }
  ngOnInit() {
    // gets called only once, when the component is ready
    this.reload();
  }
  public reload() {

    console.log('reload');
    this.GetUsers();
  }
  GetUsers() {
    this.tUserService.GetTUserTourney(this.tourneyId).subscribe(
      (result) => {
        this.tusers = result.map(x => new TUserModel(x));
        console.log('got tusers: ', this.tusers);
        this.GetUserNames();
      },
      error => {
        console.error(error);
      }
    );
  }
  GetUserNames() {
    for (let i = 0; i < this.tusers.length; i++) {
      this.userService.postSingleUser(this.tusers[i].userId).subscribe(
        (result) => {
          result.password = "";
          this.users[i] = result;
          console.log('got users: ', this.users);
        },
        error => {
          console.error(error);
        }
      );
      console.log('reload done')
    }
  }
     
}
