namespace Interi.Router.Models;

public interface IEntity<TKey>
{
    TKey Id { get; set; }
}