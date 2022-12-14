// this is a mockup class for a UserModel,
// later we will hook this up to a REST API call
export class UserModel {
  public selected? = false;

  // these are database mapped, come from the API calls
  public userId: number = 0;
  public name: string = '';
  public password: string = '';
  public gameId?: number = 0;
  public teamId?: number = 0;
  public loss?: number = 0;
  public wins?: number = 0;

  constructor(init?: Partial<UserModel>) { // allows us to assign this object C# style
    Object.assign(this, init); // copies all the properties of 'init' that exist in the 'this' object
  }


}
