using Interi.Gateway.Models;

namespace Interi.Gateway.Hubs;

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message);
}