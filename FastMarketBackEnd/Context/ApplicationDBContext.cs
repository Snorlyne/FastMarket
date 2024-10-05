using Microsoft.EntityFrameworkCore;

namespace FastMarketBackEnd.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) {}
        //public DbSet<Test> Test { get; set; }

    }
}
