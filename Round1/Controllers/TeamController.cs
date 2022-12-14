using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleAngular.Models;
namespace Round1.Controllers.Models
{
    [ApiController]
    [Route("api/teams")]
    public class TeamController : ControllerBase
    {
        [HttpPost("[action]")]
        public IActionResult Post([FromBody] TeamModel value)
        {
            try
            {
                Console.WriteLine("TourneyModel.Post() posting a new tourney");


                using (MyContext db = new MyContext())
                {
                    // if you need to validate email address,
                    // then invoke an email validation API like ZeroBounce

                    TeamModel team = new TeamModel();;
                    team.Name = value.Name;
                    team.Description = value.Description;
                    team.Private = value.Private;
                    team.GameId = value.GameId;

                    db.Team.Add(team);
                    db.SaveChanges();

                    return new ObjectResult(team);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("TourneyController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }

        }

        [HttpGet("[action]")]
        public IActionResult GetTeams()
        {
            try
            {
                Console.WriteLine("TeamController.GetTeams() fetching teams");

                using (MyContext db = new MyContext())
                {
                    List<TeamModel> teams = db.Team
                         .ToList();
                    return new ObjectResult(teams);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("TeamController.GetTeams() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult GetTeamName([FromBody] int value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var team = db.Team
                        .Where(t => t.TeamId == value)
                        .Select(t => new { Team = t })
                        .FirstOrDefault();
                    return new ObjectResult(team);
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
