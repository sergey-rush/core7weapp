using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Interi.Router.Models;

namespace Interi.Router.Controllers;

/// <summary>
/// Контроллер для работы с опциями
/// </summary>
[ApiController]
[Route("api/option")]
public class OptionController : ControllerBase
{
    private readonly ILogger _logger;

    /// <summary>
    /// Контроллер для работы с опциями
    /// </summary>
    public OptionController(ILogger<OptionController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Получить список опций
    /// </summary>
    [HttpGet("list")]
    [ProducesResponseType(typeof(IEnumerable<RiskOption>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IEnumerable<RiskOption>> GetOptionList()
    {
        List<RiskOption> list = new List<RiskOption>();
        using (var context = new SqliteContext())
        {
            list = await context.RiskOptions.OrderBy(x => x.Title).ToListAsync();
        }

        return list;
    }




    /// <summary>
    /// Получить опцию по id
    /// </summary>
    [HttpGet("item/{id}")]
    [ProducesResponseType(typeof(RiskOption), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<RiskOption?> GetOptionItem(int id)
    {
        RiskOption? riskOption;

        await using var context = new SqliteContext();
        riskOption = await context.RiskOptions.FirstOrDefaultAsync(x => x.Id == id);

        return riskOption;
    }

    /// <summary>
    /// Создать новую опцию
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PostOption([FromBody] RiskOption option)
    {
        await using var context = new SqliteContext();
        await context.RiskOptions.AddAsync(option);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Изменить опцию
    /// </summary>
    [HttpPut]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PutOption([FromBody] RiskOption option)
    {
        await using var context = new SqliteContext();
        context.Update(option);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Удалить опцию по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> DeleteOption(int id)
    {
        await using var context = new SqliteContext();
        RiskOption? option = await context.RiskOptions.FirstOrDefaultAsync(x => x.Id == id);
        if (option != null)
        {
            var options = context.ProductOptions.Where(x => x.OptionId == id);
            context.ProductOptions.RemoveRange(options);
            context.Remove(option);
            await context.SaveChangesAsync();
        }

        return Ok();
    }
}