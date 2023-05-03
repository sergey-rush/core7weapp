using System.Reflection;
using Interi.Router.Services;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsProduction())
{
    builder.Host.ConfigureAppConfiguration(x => x.AddJsonFile("hosting.json", optional: true));
    builder.Services.AddSwaggerGen(o =>
    {
        o.SwaggerDoc("v1", new OpenApiInfo { Title = "Interi API", Version = "v1" });
        o.SwaggerGeneratorOptions.Servers.Add(new OpenApiServer()
            { Description = "Interi API", Url = "http://localhost:5124" });
        var xmlFilename1 = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        o.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename1), true);
    });
}
else
{
    builder.Services.AddSwaggerGen(o =>
    {
        o.SwaggerDoc("v1", new OpenApiInfo { Title = "Interi API", Version = "v1" });
        o.SwaggerGeneratorOptions.Servers.Add(new OpenApiServer()
            { Description = "Interi API", Url = "https://localhost:7290" });
        var xmlFilename1 = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        o.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename1), true);
    });
}

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IGrpcService, GrpcService>();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:7290").AllowCredentials();
    }));
}
else
{
    builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://interi.ru").AllowCredentials();
    }));
}

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
