using Microsoft.EntityFrameworkCore;

namespace Interi.Gateway.Models;

public class SqliteContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<RiskOption> RiskOptions { get; set; }
    public DbSet<ProductOption> ProductOptions { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Agent> Agents { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=data.bin");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Product>().ToTable("products");
        builder.Entity<ProductOption>().ToTable("product_options");
        builder.Entity<RiskOption>().ToTable("risk_options");
        builder.Entity<Agent>().ToTable("agents");
        builder.Entity<Order>().ToTable("orders");
        builder.Entity<Message>().ToTable("messages");
    }
}