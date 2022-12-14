// this is a mockup class for a UserModel,
// later we will hook this up to a REST API call
export class TUserModel {
  public selected? = false;

  // these are database mapped, come from the API calls
  public tUserId: number = 0;
  public userId: number = 0;
  public tourneyId: number = 0;
  public manager?: boolean = false;

  constructor(init?: Partial<TUserModel>) { // allows us to assign this object C# style
    Object.assign(this, init); // copies all the properties of 'init' that exist in the 'this' object
  }


}
