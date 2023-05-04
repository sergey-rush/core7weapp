using System.ComponentModel.DataAnnotations.Schema;

namespace Interi.Gateway.Models;

public class Message : Entity<int>
{
    [Column("agent_id")]
    public int AgentId { get; set; }

    [Column("order_id")]
    public string OrderId { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("info")]
    public string Info { get; set; }

    [Column("created")]
    public DateTime? Created { get; set; }
}