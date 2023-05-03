using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Interi.Router.Models;

namespace Interi.Router.Controllers;

/// <summary>
/// Контроллер для работы с агентами
/// </summary>
[ApiController]
[Route("api/agent")]
public class AgentController : ControllerBase
{
    private readonly ILogger _logger;

    /// <summary>
    /// Контроллер для работы с агентами
    /// </summary>
    public AgentController(ILogger<AgentController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Получить список агентов
    /// </summary>
    [HttpGet("list")]
    [ProducesResponseType(typeof(IEnumerable<Agent>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IEnumerable<Agent>> GetAgentList()
    {
        List<Agent> list = new List<Agent>();
        using (var context = new SqliteContext())
        {
            list = await context.Agents.ToListAsync();
        }

        return list;
    }


    /// <summary>
    /// Получить агента по id
    /// </summary>
    [HttpGet("item/{id}")]
    [ProducesResponseType(typeof(Agent), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<Agent?> GetAgentItem(int id)
    {
        Agent? agent;

        await using var context = new SqliteContext();
        agent = await context.Agents.FirstOrDefaultAsync(x => x.Id == id);

        return agent;
    }

    /// <summary>
    /// Создать агента
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PostAgent([FromBody] Agent agent)
    {
        await using var context = new SqliteContext();
        await context.Agents.AddAsync(agent);
        await context.SaveChangesAsync();

        return Ok();
    }

    /// <summary>
    /// Изменить агента
    /// </summary>
    [HttpPut]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PutAgent([FromBody] Agent agent)
    {
        await using var context = new SqliteContext();
        context.Update(agent);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Удалить агент по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> DeleteAgent(int id)
    {
        await using var context = new SqliteContext();
        Agent? agent = await context.Agents.FirstOrDefaultAsync(x => x.Id == id);
        if (agent != null)
        {
            context.Remove(agent);
            await context.SaveChangesAsync();
        }

        return Ok();
    }
}