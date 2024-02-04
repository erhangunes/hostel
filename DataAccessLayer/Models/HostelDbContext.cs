using System;
using System.Collections.Generic;
using DataAccessLayer.Dto;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Models;

public partial class HostelDbContext : DbContext
{
    public HostelDbContext()
    {
    }

    public HostelDbContext(DbContextOptions<HostelDbContext> options)
        : base(options)
    {
    }
    public virtual DbSet<TblBuilding> TblBuildings { get; set; }

    public virtual DbSet<TblDefination> TblDefinations { get; set; }

    public virtual DbSet<TblGeneralcontrol> TblGeneralcontrols { get; set; }

    public virtual DbSet<TblInventory> TblInventories { get; set; }

    public virtual DbSet<TblProduct> TblProducts { get; set; }

    public virtual DbSet<TblRoom> TblRooms { get; set; }

    public virtual DbSet<TblWarehouse> TblWarehouses { get; set; }

    public virtual DbSet<TblWorkhouselog> TblWorkhouselogs { get; set; }

    public virtual DbSet<TblWorkorder> TblWorkorders { get; set; }

    public virtual DbSet<TblUsers> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-U43J2AG;Database=HostelDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblBuilding>(entity =>
        {
            entity.HasKey(e => e.BuildingId);

            entity.ToTable("tbl_building");

            entity.Property(e => e.BuildingName).HasMaxLength(50);
        });

        modelBuilder.Entity<TblDefination>(entity =>
        {
            entity.HasKey(e => e.DefinationId);

            entity.ToTable("tbl_defination");
        });

        modelBuilder.Entity<TblGeneralcontrol>(entity =>
        {
            entity.HasKey(e => e.GeneralControld);

            entity.ToTable("tbl_generalcontrol");
        });

        modelBuilder.Entity<TblInventory>(entity =>
        {
            entity.HasKey(e => e.InventoryId);

            entity.ToTable("tbl_inventory");

            entity.Property(e => e.InventoryName).HasMaxLength(50);
        });

        modelBuilder.Entity<TblProduct>(entity =>
        {
            entity.HasKey(e => e.ProductId);

            entity.ToTable("tbl_products");

            entity.Property(e => e.CreateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ProductName).HasMaxLength(50);
            entity.Property(e => e.ProductSerialCode).HasMaxLength(50);
        });

        modelBuilder.Entity<TblRoom>(entity =>
        {
            entity.HasKey(e => e.RoomId);

            entity.ToTable("tbl_room");

            entity.Property(e => e.RoomName).HasMaxLength(50);
        });

        modelBuilder.Entity<TblWarehouse>(entity =>
        {
            entity.HasKey(e => e.WareHouseId);

            entity.ToTable("tbl_warehouse");

            entity.Property(e => e.WareHouseName).HasMaxLength(50);
        });

        modelBuilder.Entity<TblWorkhouselog>(entity =>
        {
            entity.HasKey(e => e.WorkHouseLogId);

            entity.ToTable("tbl_workhouselog");

            entity.Property(e => e.CreateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<TblWorkorder>(entity =>
        {
            entity.HasKey(e => e.WorkOrderId);

            entity.ToTable("tbl_workorder");

            entity.Property(e => e.Status).HasDefaultValueSql("((1))");
        });
        modelBuilder.Entity<TblUsers>(entity =>
        {
            entity.ToTable("tbl_users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
