using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Interi.Config.Models;

namespace Interi.Config.Controllers;

/// <summary>
/// Контроллер для работы с продуктами
/// </summary>
[ApiController]
[Route("api/message")]
public class MessageController : ControllerBase
{
    private readonly ILogger _logger;

    /// <summary>
    /// Контроллер для работы с продуктами
    /// </summary>
    public MessageController(ILogger<MessageController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Получить список продуктов
    /// </summary>
    [HttpGet("list")]
    [ProducesResponseType(typeof(IEnumerable<Message>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IEnumerable<Message>> GetMessageList()
    {
        List<Message> list = new List<Message>();
        using (var context = new SqliteContext())
        {
            list = await context.Messages.ToListAsync();
        }

        return list;
    }


    /// <summary>
    /// Получить продукт по id
    /// </summary>
    [HttpGet("item/{id}")]
    [ProducesResponseType(typeof(Message), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<Message?> GetMessageItem(int id)
    {
        Message? message;

        await using var context = new SqliteContext();
        message = await context.Messages.FirstOrDefaultAsync(x => x.Id == id);

        return message;
    }

    /// <summary>
    /// Создать продукт
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PostMessage([FromBody] Message message)
    {
        await using var context = new SqliteContext();
        await context.Messages.AddAsync(message);
        await context.SaveChangesAsync();

        return Ok();
    }

    /// <summary>
    /// Изменить продукт
    /// </summary>
    [HttpPut]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PutMessage([FromBody] Message message)
    {
        await using var context = new SqliteContext();
        context.Update(message);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Удалить продукт по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> DeleteMessage(int id)
    {
        await using var context = new SqliteContext();
        Message? message = await context.Messages.FirstOrDefaultAsync(x => x.Id == id);
        if (message != null)
        {
            context.Remove(message);
            await context.SaveChangesAsync();
        }

        return Ok();
    }
}