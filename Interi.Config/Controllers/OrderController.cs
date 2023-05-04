using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Interi.Config.Models;

namespace Interi.Config.Controllers;

/// <summary>
/// Контроллер для работы с запросами
/// </summary>
[ApiController]
[Route("api/order")]
public class OrderController : ControllerBase
{
    private readonly ILogger logger;

    /// <summary>
    /// Контроллер для работы с запросами
    /// </summary>
    public OrderController(ILogger<OrderController> logger)
    {
        this.logger = logger;
    }

    /// <summary>
    /// Получить список запросов
    /// </summary>
    [HttpGet("list")]
    [ProducesResponseType(typeof(IEnumerable<Order>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IEnumerable<Order>> GetOrderList(int index, int size)
    {
        List<Order> list = new List<Order>();
        using (var context = new SqliteContext())
        {
            list = await context.Orders.OrderByDescending(i=>i.Id).Skip(index * size).Take(size).ToListAsync();
        }
        return list;
    }

    /// <summary>
    /// Получить количество запросов
    /// </summary>
    [HttpGet("count")]
    public async Task<int> CountOrders()
    {
        int count = 0;
        using (var context = new SqliteContext())
        {
            count = await context.Orders.CountAsync();
        }

        return count;
    }


    /// <summary>
    /// Получить запрос по order id
    /// </summary>
    [HttpGet("item/{orderId}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<Order?> GetOrderItem(string orderId)
    {
        Order? order;

        await using var context = new SqliteContext();
        order = await context.Orders.FirstOrDefaultAsync(x => x.OrderId == orderId);

        return order;
    }

    /// <summary>
    /// Создать запрос
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PostOrder([FromBody] Order order)
    {
        order.Created = DateTime.UtcNow;
        order.OrderState = 1;
        order.PaidState = 1;
        await using var context = new SqliteContext();
        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();

        return Ok();
    }

    /// <summary>
    /// Изменить запрос
    /// </summary>
    [HttpPut]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PutOrder([FromBody] Order order)
    {
        await using var context = new SqliteContext();
        context.Update(order);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Удалить запрос по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> DeleteOrder(int id)
    {
        await using var context = new SqliteContext();
        Order? order = await context.Orders.FirstOrDefaultAsync(x => x.Id == id);
        if (order != null)
        { context.Remove(order);
            await context.SaveChangesAsync();
        }

        return Ok();
    }
}