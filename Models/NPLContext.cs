using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace NPL.Models
{
    public partial class NPLContext : DbContext
    {
        private string connectionString;
        public NPLContext()
        {
        }

        public NPLContext(DbContextOptions<NPLContext> options)
            : base(options)
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json", optional: false);

            var configuration = builder.Build();

            connectionString = configuration.GetConnectionString("myDb1").ToString();
        }

        public virtual DbSet<ApprovedToWork> ApprovedToWorks { get; set; }
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Immigration> Immigrations { get; set; }
        public virtual DbSet<JobOffer> JobOffers { get; set; }
        public virtual DbSet<Recruiter> Recruiters { get; set; }
        public virtual DbSet<TimeSheet> TimeSheets { get; set; }
        public virtual DbSet<Worker> Workers { get; set; }
        public virtual DbSet<WorkerType> WorkerTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Server=.\\;Database=NPL;Trusted_Connection=True;MultipleActiveResultSets=True");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ApprovedToWork>(entity =>
            {
                entity.ToTable("ApprovedToWork");

                entity.Property(e => e.ApprovedToWorkId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.IsIdapproved).HasColumnName("IsIDApproved");

                entity.Property(e => e.IsIrdsigned).HasColumnName("IsIRDSigned");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.ApprovedToWorks)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("FK_ApprovedToWork_Worker");
            });

            modelBuilder.Entity<Branch>(entity =>
            {
                entity.ToTable("Branch");

                entity.Property(e => e.BranchId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");

                entity.Property(e => e.ClientId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CompanyName).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(100);

                entity.Property(e => e.LastName).HasMaxLength(100);
            });

            modelBuilder.Entity<Immigration>(entity =>
            {
                entity.ToTable("Immigration");

                entity.Property(e => e.ImmigrationId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.VisaExpiryDate).HasColumnType("date");

                entity.Property(e => e.VisaType)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.Immigrations)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("FK_Immigration_Worker");
            });

            modelBuilder.Entity<JobOffer>(entity =>
            {
                entity.ToTable("JobOffer");

                entity.Property(e => e.JobOfferId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.ChargeRate).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Location).HasMaxLength(500);

                entity.Property(e => e.PayRate).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.JobOffers)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_JobOffer_Client");

                entity.HasOne(d => d.Recruiter)
                    .WithMany(p => p.JobOffers)
                    .HasForeignKey(d => d.RecruiterId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JobOffer_Recruiter");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.JobOffers)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("FK_JobOffer_Worker");
            });

            modelBuilder.Entity<Recruiter>(entity =>
            {
                entity.ToTable("Recruiter");

                entity.Property(e => e.RecruiterId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TimeSheet>(entity =>
            {
                entity.ToTable("TimeSheet");

                entity.Property(e => e.TimeSheetId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.WeekEndDate).HasColumnType("date");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.TimeSheets)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("FK_TimeSheet_Worker");
            });

            modelBuilder.Entity<Worker>(entity =>
            {
                entity.ToTable("Worker");

                entity.Property(e => e.WorkerId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("DOB");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Ethnicity).HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.BranchId)
                    .HasConstraintName("FK_Worker_Branch");

                entity.HasOne(d => d.Recruiter)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.RecruiterId)
                    .HasConstraintName("FK_Worker_Recruiter");

                entity.HasOne(d => d.WorkerType)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.WorkerTypeId)
                    .HasConstraintName("FK_Worker_WorkerType");
            });

            modelBuilder.Entity<WorkerType>(entity =>
            {
                entity.ToTable("WorkerType");

                entity.Property(e => e.WorkerTypeId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
