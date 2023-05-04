﻿using BrokerService;

namespace Interi.Gateway.Services;

public interface IGrpcService
{
    Task Start();
    Task Stop();
    Task Send(InsRequest request);
}