using AutoMapper;
using Bussiness.Helpers;
using Bussiness.Repository.Auth;
using Bussiness.Repository.Building;
using Bussiness.Repository.Defination;
using Bussiness.Repository.GeneralControl;
using Bussiness.Repository.Inventory;
using Bussiness.Repository.Products;
using Bussiness.Repository.Room;
using Bussiness.Repository.Statistic;
using Bussiness.Repository.WareHouse;
using Bussiness.Repository.WorkHouseLog;
using Bussiness.Repository.WorkOrder;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
//builder.WebHost.UseUrls("http://*:" + 5000);
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IBuildingRepository, BuildingRepository>();
builder.Services.AddScoped<IDefinationRepository, DefinationRepository>();
builder.Services.AddScoped<IWareHouseRepository, WareHouseRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IProductsRepository, ProductRepository>();
builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();
builder.Services.AddScoped<IWorkOrderRepository, WorkOrderRepository>();
builder.Services.AddScoped<IWorkHouseLogRepository, WorkHouseLogRepository>();
builder.Services.AddScoped<IGeneralControlRepository, GeneralControlRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IStatisticRepository, StatisticRepository>();


var key = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("AppSettings:Secret").Value);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero

    };
});

var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile(new MapperProfile()));
builder.Services.AddAutoMapper(typeof(StartupBase));
builder.Services.AddSingleton(mapperConfig);

var connection = builder.Configuration.GetSection("ConnectionStrings:DefaultConnection").Value;
builder.Services.AddDbContext<HostelDbContext>(x => x.UseSqlServer(connection));
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");

        c.OAuthClientId(builder.Configuration["Swagger:ClientId"]);
        c.OAuthClientSecret(builder.Configuration["Swagger:ClientSecret"]);
        c.OAuthRealm(builder.Configuration["Swagger:Realm"]);
        c.OAuthAppName(builder.Configuration["Swagger:AppName"]);
        c.OAuthUseBasicAuthenticationWithAccessCodeGrant();
    });
}

app.UseCors("corsapp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
    