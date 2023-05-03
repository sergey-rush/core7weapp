using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Interi.Router.Models;

namespace Interi.Router.Controllers;

/// <summary>
/// Контроллер для работы с опциями продукта
/// </summary>
[ApiController]
[Route("api/product-option")]
public class ProductOptionController : ControllerBase
{
    private readonly ILogger _logger;

    /// <summary>
    /// Контроллер для работы с опциями продукта
    /// </summary>
    public ProductOptionController(ILogger<ProductOptionController> logger)
    {
        _logger = logger;
    }




    /// <summary>
    /// Получить опцию продукта по id
    /// </summary>
    [HttpGet("item/{id}")]
    [ProducesResponseType(typeof(ProductOption), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ProductOption?> GetProductOptionItem(int id)
    {
        await using var context = new SqliteContext();
        var product = await context.ProductOptions.FirstOrDefaultAsync(x => x.Id == id);

        return product;
    }

    /// <summary>
    /// Получить список опций продукта по id продукта
    /// </summary>
    [HttpGet("list/{id}")]
    [ProducesResponseType(typeof(List<ProductOption>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<List<ProductOption>> GetProductOptionList(int id)
    {
        List<ProductOption> list = new List<ProductOption>();
        await using var context = new SqliteContext();
        list = await context.ProductOptions.Join(context.RiskOptions, x => x.OptionId,
                y => y.Id, (x, y) => new { x, y })
            .Where(po => po.x.ProductId == id).Select(o => new ProductOption()
            {
                Id = o.x.Id,
                OptionId = o.x.OptionId,
                ProductId = o.x.ProductId,
                Title = o.y.Title,
                Required = o.x.Required
            }).OrderBy(x => x.Title).ToListAsync();

        return list;
    }

    /// <summary>
    /// Создать новую опцию продукта
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> PostProductOption([FromBody] ProductOption option)
    {
        await using var context = new SqliteContext();
        var count = await context.ProductOptions.CountAsync(x => x.ProductId == option.ProductId && x.OptionId == option.OptionId);

        if (count > 0)
        {
            return new ConflictObjectResult("Такая опция уже добавлена");
        }

        await context.ProductOptions.AddAsync(option);
        await context.SaveChangesAsync();

        return Created(nameof(PostProductOption), option.Id);
    }

    /// <summary>
    /// Изменить текущую опцию продукта
    /// </summary>
    [HttpPut]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> PutProductOption([FromBody] ProductOption option)
    {
        await using var context = new SqliteContext();
        var count = await context.ProductOptions.CountAsync(x => x.ProductId == option.ProductId && x.OptionId == option.OptionId && x.Id != option.Id);
        if (count > 0)
        {
            return new ConflictObjectResult("Такая опция уже добавлена");
        }
        context.Update(option);
        await context.SaveChangesAsync();
        return Ok();
    }

    /// <summary>
    /// Удалить опцию продукта по id
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<OkResult> DeleteProductOption(int id)
    {
        await using var context = new SqliteContext();
        ProductOption? productOption = await context.ProductOptions.FirstOrDefaultAsync(x => x.Id == id);
        if (productOption != null)
        {
            context.Remove(productOption);
            await context.SaveChangesAsync();
        }

        return Ok();
    }
}