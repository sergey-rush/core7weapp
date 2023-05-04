using Microsoft.AspNetCore.Mvc;

namespace Interi.Gateway.Controllers;

/// <summary>
/// Контроллер для работы с конфигурацией сервиса
/// </summary>
[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    /// <summary>
    /// Контроллер для работы с конфигурацией сервиса
    /// </summary>
    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Ensure application performance
    /// </summary>
    /// <returns></returns>
    [HttpGet("index")]
    public string Index()
    {
        return "OK";
    }
}