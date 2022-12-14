// this is a mockup class for a UserModel,
// later we will hook this up to a REST API call
export class TourneyModel {
  public selected? = false;

  // these are database mapped, come from the API calls
  public tourneyId: number = 0;
  public name?: string = '';
  public gameId?: number = 0;
  public private?: boolean = false;
  public online?: boolean = false;
  public time: Date = new Date("0000-00-00");

  constructor(init?: Partial<TourneyModel>) { // allows us to assign this object C# style
    Object.assign(this, init); // copies all the properties of 'init' that exist in the 'this' object
  }


}
