using BrokerService;

namespace Interi.Router.Services;

public interface IGrpcService
{
    Task Start();
    Task Stop();
    Task Send(InsRequest request);
}