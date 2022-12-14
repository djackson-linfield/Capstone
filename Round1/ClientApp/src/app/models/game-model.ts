// this is a mockup class for a UserModel,
// later we will hook this up to a REST API call
export class GameModel {
  public selected? = false;

  // these are database mapped, come from the API calls
  public gameId: number = 0;
  public name?: string = '';

  constructor(init?: Partial<GameModel>) { // allows us to assign this object C# style
    Object.assign(this, init); // copies all the properties of 'init' that exist in the 'this' object
  }


}
