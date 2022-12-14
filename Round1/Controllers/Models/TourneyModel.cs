using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
namespace SampleAngular.Models
{
    [Table("Tourney")] // this is the real SQL server table name that this model maps to
    public class TourneyModel
    {

        [Key]
        public Int64 TourneyId { get; set; }
        public String? Name { get; set; }
        public Int64? GameId { get; set; }
        public bool? Online { get; set; }
        public DateTime? Time { get; set; }
        public bool? Private { get; set; }
    }
}
