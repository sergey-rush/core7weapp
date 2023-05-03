using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Interi.Router.Models;

namespace Interi.Router.Controllers;

/// <summary>
/// Контроллер для работы с продуктами
/// </summary>
[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly ILogger _logger;

    /// <summary>
    /// Контроллер для работы с продуктами
    /// </summary>
    public ProductController(ILogger<ProductController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Получить список продуктов
    /// </summary>
    [HttpGet("list")]
    [ProducesResponseType(typeof(IEnumerable<Product>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IEnumerable<Product>> GetProductList()
    {
        List<Product> list = new List<Product>();
        using (var context = new SqliteContext())
        {
            list = await context.Products.ToListAsync();
        }

        return list;
    }


    /// <summary>
    /// Получить продукт по id
    /// </summary>
    [HttpGet("item/{id}")]
    [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<Product?> GetProductItem(int id)
    {
        Product? product;

        await using var context = new SqliteContext();
        product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);

        return product;
    }

    /// <summary>
    /// Создать продукт
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PostProduct([FromBody] Product product)
    {
        await using var context = new SqliteContext();
        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();

        return Ok();
    }

    /// <summary>
    /// Изменить продукт
    /// </summary>
    [HttpPut]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> PutProduct([FromBody] Product product)
    {
        await using var context = new SqliteContext();
        context.Update(product);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Удалить продукт по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> DeleteProduct(int id)
    {
        await using var context = new SqliteContext();
        Product? product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
        if (product != null)
        {
            var options = context.ProductOptions.Where(x => x.ProductId == id);
            context.ProductOptions.RemoveRange(options);
            context.Remove(product);
            await context.SaveChangesAsync();
        }

        return Ok();
    }
}