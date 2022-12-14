using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleAngular.Models;
namespace ProductMangment.Controllers.Models
{
    [ApiController]
    [Route("api/games")]
    public class UserController : ControllerBase
    {
        [HttpGet("[action]")]
        public IActionResult GetGames()
        {
            try
            {
                Console.WriteLine("GameController.GetGames() fetching users");

                using (MyContext db = new MyContext())
                {
                    List<GameModel> games = db.Game
                         .ToList();
                    return new ObjectResult(games);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("GameController.GetGames() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpGet("[action]")]
        public IActionResult GetGameNameForTourney()
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var games =(
                        from tourney in db.Tourney
                        join game in db.Game on tourney.GameId equals game.GameId
                        select new { g = game.Name, t = tourney.GameId }).ToList();
                    foreach (var gameAndTourney in games)
                    {
                        Console.WriteLine($"{gameAndTourney.g} - {gameAndTourney.t}");
                    }
                    return new ObjectResult(games);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpGet("[action]")]
        public IActionResult GetGameNameForTeam()
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var games = (
                        from team in db.Team
                        join game in db.Game on team.GameId equals game.GameId
                        select new { g = game.Name, t = team.GameId }).ToList();
                    foreach (var gameAndTeam in games)
                    {
                        Console.WriteLine($"{gameAndTeam.g} - {gameAndTeam.t}");
                    }
                    return new ObjectResult(games);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult GetGameName([FromBody] int value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var game = db.Game
                        .Where(g => g.GameId == value)
                        .Select(g => new { Game = g })
                        .FirstOrDefault();
                    return new ObjectResult(game);
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
