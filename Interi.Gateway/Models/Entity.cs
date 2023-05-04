namespace Interi.Gateway.Models;

public abstract class Entity<TKey> : IEntity<TKey>
{
    public TKey Id { get; set; }
}