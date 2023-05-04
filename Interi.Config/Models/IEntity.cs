namespace Interi.Config.Models;

public interface IEntity<TKey>
{
    TKey Id { get; set; }
}