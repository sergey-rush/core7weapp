using System.ComponentModel.DataAnnotations.Schema;

namespace Interi.Config.Models;

public class Product : Entity<int>
{
    [Column("title")]
    public string Title { get; set; }

}