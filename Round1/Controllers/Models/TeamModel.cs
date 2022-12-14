using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace SampleAngular.Models
{
    [Table("Team")] // this is the real SQL server table name that this model maps to
    public class TeamModel
    {

        [Key]
        public Int64 TeamId { get; set; }
        public String? Name { get; set; }
        public String? Description { get; set; }
        public bool? Private { get; set; }
        public Int64? GameId { get; set; }
    }
}