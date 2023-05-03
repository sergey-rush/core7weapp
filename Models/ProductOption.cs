using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Interi.Router.Models;

public class ProductOption : Entity<int>
{
    [NotMapped]
    public string Title { get; set; }

    [Column("product_id")]
    public int ProductId { get; set; }

    [Column("option_id")]
    public int OptionId { get; set; }

    [Column("required")]
    public int Required { get; set; }

}