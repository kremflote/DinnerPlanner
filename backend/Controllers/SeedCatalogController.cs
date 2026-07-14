using DinnerPlanner.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/seed-catalog")]
public class SeedCatalogController(SeedCatalogService seedCatalogService) : ControllerBase
{
    [HttpGet("export")]
    public async Task<IActionResult> Export(CancellationToken cancellationToken)
    {
        var catalog = await seedCatalogService.ExportCatalogAsync(cancellationToken);
        var json = seedCatalogService.Serialize(catalog);

        return File(
            System.Text.Encoding.UTF8.GetBytes(json),
            "application/json",
            "matflote-seed-catalog.json");
    }
}
