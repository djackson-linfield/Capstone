using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleAngular.Models;

namespace Round1.Controllers.Models
{
    [ApiController]
    [Route("api/tourneys")]
    public class TourneyController : ControllerBase
    {
        [HttpPost("[action]")]
        public IActionResult Post([FromBody] TourneyModel value)
        {
            try
            {
                Console.WriteLine("TourneyModel.Post() posting a new tourney");


                using (MyContext db = new MyContext())
                {
                    // if you need to validate email address,
                    // then invoke an email validation API like ZeroBounce

                    TourneyModel tourney = new TourneyModel();
                    tourney.GameId = value.GameId;
                    tourney.Name = value.Name;
                    tourney.Time = value.Time;
                    tourney.Online = value.Online;
                    tourney.Private = value.Private;
                    db.Tourney.Add(tourney);
                    db.SaveChanges();

                    return new ObjectResult(tourney);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("TourneyController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }

        }       [HttpPost("[action]")]
 

        [HttpGet("[action]")]

        public IActionResult GetTourneys()
        {
            try
            {
                Console.WriteLine("TourneyController.GetTourneys() fetching Tourneys");

                using (MyContext db = new MyContext())
                {
                    List<TourneyModel> tourneys = db.Tourney
                         .ToList();
                    return new ObjectResult(tourneys);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("TourneyController.GetTourneys() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }


        [HttpPost("[action]")]
        public IActionResult GetTourneyName([FromBody] int value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var tourney = db.Tourney
                        .Where(t => t.TourneyId == value)
                        .Select(t => new { Tourney = t })
                        .FirstOrDefault();
                    return new ObjectResult(tourney);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
    }
}
