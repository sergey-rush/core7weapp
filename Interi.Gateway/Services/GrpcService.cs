using BrokerService;
using Grpc.Core;
using Grpc.Net.Client;
using Interi.Gateway.Hubs;
using Interi.Gateway.Models;
using Microsoft.AspNetCore.SignalR;

namespace Interi.Gateway.Services;

public class GrpcService : IGrpcService
{
    private AsyncDuplexStreamingCall<InsRequest, InsResponse>? client;

    private readonly IHubContext<ChatHub, IChatClient> _chatHub;

    public GrpcService(IHubContext<ChatHub, IChatClient> chatHub)
    {
        _chatHub = chatHub;
    }

    public async Task Start()
    {
        using var channel = GrpcChannel.ForAddress("https://localhost:5001");
        var endpoint = new Broker.BrokerClient(channel);
        await Listen(endpoint);
    }

    public async Task Stop()
    {
        await client.RequestStream.CompleteAsync();
    }

    public async Task Send(InsRequest request)
    {
        

        await client.RequestStream.WriteAsync(request);
        Console.WriteLine("Client message sent");
    }

    private async Task Listen(Broker.BrokerClient endpoint)
    {
        Console.WriteLine("Ready, set, go!");
        client = endpoint.PostInsRequest();

        // Read incoming messages in a background task
        InsResponse? insResponse = null;
        var readTask = Task.Run(async () =>
        {
            await foreach (var message in client.ResponseStream.ReadAllAsync())
            {
                ResponseHandler responseHandler = new ResponseHandler();
                responseHandler.Process(message);
                insResponse = message;

                ChatMessage msg = new ChatMessage();
                msg.User = "User";
                msg.Message = message.Message;

                await _chatHub.Clients.All.ReceiveMessage(msg);

                await Task.Delay(1000);
            }
        });
        
        await readTask;
    }

    public class ResponseHandler
    {
        public void Process(InsResponse response)
        {
            Console.WriteLine($"Message {response.Count:n0} received: {response.Message}");
        }
    }
}