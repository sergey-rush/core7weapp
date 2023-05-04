using Microsoft.AspNetCore.SignalR;

namespace Interi.Gateway.Hubs;

public class ChatHub : Hub<IChatClient>
{
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }
}