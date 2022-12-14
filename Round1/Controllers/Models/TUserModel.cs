using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace SampleAngular.Models
{
    [Table("TUser")] // this is the real SQL server table name that this model maps to
    public class TUserModel
    {

        [Key]
        public Int64 TUserId { get; set; }
        public Int64? UserId { get; set; }
        public Int64? TourneyId { get; set; }
        public bool? Manager { get; set; }
    }
}
