using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Task_Management_System.Models;

namespace Task_Management_System.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskEntity>().HasKey(t => t.TaskId);
            modelBuilder.Entity<User>().HasKey(u => u.UserId);
        }

        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
