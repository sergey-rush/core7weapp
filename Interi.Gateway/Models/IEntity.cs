﻿namespace Interi.Gateway.Models;

public interface IEntity<TKey>
{
    TKey Id { get; set; }
}