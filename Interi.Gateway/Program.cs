using Microsoft.OpenApi.Models;
using System.Reflection;
using Interi.Gateway.Services;
using Microsoft.AspNetCore.HttpOverrides;
using Interi.Gateway.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR(options => {
    options.KeepAliveInterval = TimeSpan.FromSeconds(15);
    options.EnableDetailedErrors = true;
});

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
        { Description = "Interi API", Url = "https://localhost:7222" });
        var xmlFilename1 = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        o.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename1), true);
    });
}

builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IGrpcService, GrpcService>();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:44414").AllowCredentials();
    }));
}
else
{
    builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://ustrim.ru").AllowCredentials();
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
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseWebSockets();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
    endpoints.MapHub<ChatHub>("/hubs/chat");
});

app.MapFallbackToFile("index.html");

Task.Run(() =>
{
    _ = app.Services.GetRequiredService<IGrpcService>().Start();
});

//await app.Services.GetRequiredService<IGrpcService>().Start();
app.Run();
