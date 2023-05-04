using System.ComponentModel.DataAnnotations.Schema;

namespace Interi.Gateway.Models;

public class Order : Entity<int>
{
    [Column("order_id")]
    public string OrderId { get; set; }

    [Column("agent_id")]
    public int AgentId { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("product_id")]
    public string ProductId { get; set; }

    [Column("option_id")]
    public string OptionId { get; set; }

    [Column("info")]
    public string Info { get; set; }

    [Column("order_state")]
    public int OrderState { get; set; }

    [Column("paid_state")]
    public int PaidState { get; set; }

    [Column("created")]
    public DateTime? Created { get; set; }
}