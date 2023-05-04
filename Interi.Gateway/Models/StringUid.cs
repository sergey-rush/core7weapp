using shortid.Configuration;
using shortid;

namespace Interi.Gateway.Models;

public static class StringUid
{
    private static GenerationOptions options = new GenerationOptions(true, false, 11);

    public static string Create()
    {
        string output = ShortId.Generate(options);
        return output;
    }
}