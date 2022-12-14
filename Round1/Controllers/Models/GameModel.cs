using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace SampleAngular.Models
{
    [Table("Game")] // this is the real SQL server table name that this model maps to
    public class GameModel
    {

        [Key]
        public Int64 GameId { get; set; }
        public String? Name { get; set; }
    }
}