using FullStackCase.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace FullStackCase.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // İleride entity ekleyeceğiz
        public DbSet<User> Users { get; set; }  // 👈 burayı ekledik
        public DbSet<Product> Products { get; set; }
    }

}
