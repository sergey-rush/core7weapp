using System.ComponentModel.DataAnnotations.Schema;

namespace Interi.Gateway.Models;

public class RiskOption : Entity<int>
{
    [Column("title")]
    public string Title { get; set; }
}