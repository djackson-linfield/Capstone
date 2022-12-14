using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleAngular.Models;
namespace Round1.Controllers.Models
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        [HttpPost("[action]")]
        public IActionResult Post([FromBody] UserModel value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext()) // Used for creating a new user
                {
                    if (String.IsNullOrWhiteSpace(value.Name))
                    {
                        return BadRequest("Missing username");
                    }
                    if (String.IsNullOrWhiteSpace(value.Password))
                    {
                        return BadRequest("Missing password");
                    }
                    if (db.User.FirstOrDefault(x => x.Name == value.Name && x.Password == value.Password) == null)
                    {
                        return NotFound("Invalid username or password");
                    }

                    return new OkResult();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {

            try
            {
                Console.WriteLine("UserController.GetItems() fetching user");

                List<UserModel> users = new List<UserModel>();

                using (MyContext db = new MyContext())
                {

                    users = db.User.ToList();

                    if (users == null)
                    {
                        return new ObjectResult("No users to display.");
                    }

                    return new ObjectResult(users);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("UsersController.GetItems() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult PostId([FromBody] UserModel value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var users = db.User
                        .Where(u => u.Name == value.Name)
                        .Select(u => new {UserId = u.UserId})
                        .FirstOrDefault();
                    if (users == null) return StatusCode(500);
                    return new ObjectResult(users.UserId);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult GetSingleUser([FromBody] Int64 value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    var users = db.User
                        .Where(u => u.UserId == value)
                        .Select(u => new { User = u })
                        .FirstOrDefault();
                    if (users == null) return StatusCode(500);
                    return new ObjectResult(users.User);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult CheckIfExist([FromBody] UserModel value)
        {
            try
            {
                Console.WriteLine("UserController.Post() posting a new item");

                using (MyContext db = new MyContext()) // Used for creating a new user
                {
                    if (String.IsNullOrWhiteSpace(value.Name))
                    {
                        return BadRequest("Missing username");
                    }
                    if (String.IsNullOrWhiteSpace(value.Password))
                    {
                        return BadRequest("Missing password");
                    }
                    if (db.User.FirstOrDefault(x => x.Name == value.Name) != null)
                    {
                        return NotFound("Invalid username");
                    }

                    return new OkResult();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CustomerController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        [HttpPost("[action]")]
        public IActionResult PostNewUser([FromBody] UserModel value)
        {
            try
            {
                Console.WriteLine("TourneyModel.Post() posting a new tourney");


                using (MyContext db = new MyContext())
                {
                    // if you need to validate email address,
                    // then invoke an email validation API like ZeroBounce

                    UserModel user = new UserModel();
                    user.Name = value.Name;
                    user.Password = value.Password;
                    user.TeamId = 0;
                    user.Wins = 0;
                    user.Loss = 0;
                    db.User.Add(user);
                    db.SaveChanges();

                    return new ObjectResult(user);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("TourneyController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }

        }
        [HttpPut("[action]")]
        public IActionResult UpdateUser([FromBody] UserModel value)
        {

            using (MyContext db = new MyContext())
            {
                var users = db.User
                        .Where(u => u.UserId == value.UserId)
                        .Select(u => new { User = u })
                        .FirstOrDefault();
                if (users == null) return StatusCode(500);
                users.User.TeamId = value.TeamId;
                users.User.Wins = value.Wins;
                users.User.Loss = value.Loss;
                db.SaveChanges();
                return Ok();
            }
        }
        [HttpPut("[action]")]
        public IActionResult LeaveTeam([FromBody] UserModel value)
        {

            using (MyContext db = new MyContext())
            {
                var users = db.User
                        .Where(u => u.UserId == value.UserId)
                        .Select(u => new { User = u })
                        .FirstOrDefault();
                if (users == null) return StatusCode(500);
                users.User.TeamId = null;
                db.SaveChanges();
                return Ok();
            }

        }
    }
}
