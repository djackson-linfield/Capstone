using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace SampleAngular.Models
{
    [Table("User")] // this is the real SQL server table name that this model maps to
    public class UserModel
    {

        [Key]
        public Int64 UserId { get; set; }
        public Int64? TeamId { get; set; }
        public String? Name { get; set; }
        public String? Password { get; set; }
        public Int64? Wins { get; set; }
        public Int64? Loss { get; set; }
        public Int64? GameId { get; set; }
    }
}
