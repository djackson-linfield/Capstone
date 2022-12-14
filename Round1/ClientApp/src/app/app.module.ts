import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './page/home/home.component';
import { UserComponent } from './page/user/user.component';
import { AboutUsComponent } from './page/aboutus/AboutUs.component';
import { EventComponent } from './page/event/Event.component'
import { CreateEventComponent } from './page/createevent/CreateEvent.component'
import { CreateTeamComponent } from './page/createteam/CreateTeam.component';
import { TeamComponent } from './page/teams/Teams.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SessionService } from '../services/session.service';
import { EventDetailsComponent } from './page/eventdetails/eventdetails.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutUsComponent,
    EventComponent,
    CreateEventComponent,
    UserComponent,
    CreateTeamComponent,
    EventDetailsComponent,
    TeamComponent,
 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about-us', component: AboutUsComponent },
    { path: 'users/:id', component: UserComponent },
      { path: 'event', component: EventComponent },
      { path: 'create-event', component: CreateEventComponent },
      { path: 'create-team', component: CreateTeamComponent },
      { path: 'team', component: TeamComponent },
      { path: 'event-details/:id', component: EventDetailsComponent },
    ]),
    NgbModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
