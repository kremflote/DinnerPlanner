using Microsoft.EntityFrameworkCore;
using cv_backend.Models;

namespace cv_backend.Contexts;

public class CVContext(
    DbContextOptions<CVContext> options
) : DbContext(options)
{
    public DbSet<Tenure> Tenures { get; set;}

    public DbSet<Showcase> Showcases { get; set; }

    public DbSet<Skill> Skills { get; set; }

}