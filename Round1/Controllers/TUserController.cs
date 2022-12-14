using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleAngular.Models;
namespace Round1.Controllers.Models
{
    [ApiController]
    [Route("api/tusers")]
    public class TUserController : ControllerBase
    {
        [HttpPost("[action]")]
        public IActionResult PostTuser([FromBody] TUserModel value)
        {
            try
            {
                Console.WriteLine("TourneyModel.Post() posting a new tourney");


                using (MyContext db = new MyContext())
                {
                    // if you need to validate email address,
                    // then invoke an email validation API like ZeroBounce

                    TUserModel tuser = new TUserModel();
                    tuser.TourneyId = value.TourneyId;
                    tuser.UserId = value.UserId;
                    db.TUser.Add(tuser);
                    db.SaveChanges();

                    return new ObjectResult(tuser);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("TourneyController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }

        }


        [HttpGet("[action]")]
        public IActionResult GetTUsers()
        {
            try
            {
                Console.WriteLine("TUserController.GetTUsers() fetching tusers");

                using (MyContext db = new MyContext())
                {
                    List<TUserModel> tusers = db.TUser
                         .ToList();
                    return new ObjectResult(tusers);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("TUserConroller.GetTUsers() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        public IActionResult GetTUserId([FromBody] int value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    List<TUserModel> tuser = db.TUser
                        .Where(tu => tu.UserId == value)
                        .ToList();
                    return new ObjectResult(tuser);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult GetTUserTourney([FromBody] int value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    List<TUserModel> tuser = db.TUser
                        .Where(tu => tu.TourneyId == value)
                        .ToList();
                    return new ObjectResult(tuser);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
/*        [HttpPost("[action]")]
        public IActionResult CheckIfInTourney([FromBody] int userId, int tournamentId)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var tuser = db.TUser
                        .Where(t => t.TourneyId == tournamentId && t.UserId == userId)
                        .Select(t => new { tuser = t })
                        .FirstOrDefault();
                    return new ObjectResult(tuser);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }*/

    }
    
}
