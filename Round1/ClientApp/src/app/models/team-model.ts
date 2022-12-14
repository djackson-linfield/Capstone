// this is a mockup class for a UserModel,
// later we will hook this up to a REST API call
export class TeamModel {
  public selected? = false;

  // these are database mapped, come from the API calls
  public teamId: number = 0;
  public name?: string = '';
  public description?: string = '';
  public private?: boolean = false;
  public gameId?: number = 0;

  constructor(init?: Partial<TeamModel>) { // allows us to assign this object C# style
    Object.assign(this, init); // copies all the properties of 'init' that exist in the 'this' object
  }


}
