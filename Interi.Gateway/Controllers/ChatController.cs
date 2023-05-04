﻿using Interi.Gateway.Hubs;
using Interi.Gateway.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Interi.Gateway.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub, IChatClient> _chatHub;

    public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
    {
        _chatHub = chatHub;
    }

    [HttpPost("messages")]
    public async Task Post(ChatMessage message)
    {
        await _chatHub.Clients.All.ReceiveMessage(message);
    }
}