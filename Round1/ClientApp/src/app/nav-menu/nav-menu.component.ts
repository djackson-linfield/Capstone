import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../services/session.service';
import { } from 'crypto-js';
import { UserServices } from '../../services/user-service';
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [UserServices]
})
export class NavMenuComponent {
  isExpanded = false;

  private dialog: NgbModalRef | undefined = undefined;
  public username = '';
  public password = '';
  public createUsername = '';
  public createPassword = '';
  public id = 0;
  public errorMessage = '';
  public constructor(
    private modalService: NgbModal,
    private sessionService: SessionService,
    private userService: UserServices,
    private _router: Router,
    private _route: ActivatedRoute,) { }
  collapse() {
    this.isExpanded = false;
  }

  isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  // everything past here delete if no work

  logout() {
    this.sessionService.logout();
    this.reloadCurrentRoute();
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
    this.userService.postId(user).subscribe(
      (result: any) => {
        user.userId = result;
      }
    )
    this.id = user.userId
    this.userService.post(user).subscribe(
      (result: any) => {
        this.dialog?.close();
        this.sessionService.login(user.userId, this.username); // this is where you should get the user id so you can send it to the session service
        this.reloadCurrentRoute();
      },
      (err: { error: string; }) => {
        console.log(err);
        this.errorMessage = err.error;
      }
    )
  }

  createUser() {
    console.log("Create User")
    let user = new UserModel();
    user.name = this.createUsername;
    user.password = this.createPassword;
    this.userService.checkIfExist(user).subscribe(
      (result: any) => {
        this.userService.postNewUser(user).subscribe((result) => {
          console.warn()
        })
        this.dialog?.close();
      },
      (err: { error: string; }) => {
        console.log(err);
        this.errorMessage = err.error;
      }
    )
  
  }

  public userProfile() {
    console.log("Button Press")
    this._router.navigate(['/users', this.sessionService.userId]);
  }

  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
}
