using Microsoft.EntityFrameworkCore;

namespace SampleAngular.Models
{
    public class MyContext : DbContext
    {
        public DbSet<GameModel> Game { get; set; }
        public DbSet<TeamModel> Team { get; set; }
        public DbSet<TourneyModel> Tourney { get; set; }
        public DbSet<TUserModel> TUser { get; set; }
        public DbSet<UserModel> User { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(LocalDb)\\MSSQLLocalDb;;database=Round1;User Id=app;Password=app;MultipleActiveResultSets=true;");
            optionsBuilder.LogTo(Console.WriteLine);
            base.OnConfiguring(optionsBuilder);

        }
    }
}
