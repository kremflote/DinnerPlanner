using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/product-lookup")]
public partial class ProductLookupController(
    KassalappProductLookupService kassalappProductLookup
) : ControllerBase
{
    [HttpGet("ean/{ean}")]
    public async Task<ActionResult<ProductLookupResponseDto>> LookupByEan(
        string ean,
        CancellationToken cancellationToken
    )
    {
        if (!ValidEanRegex().IsMatch(ean))
        {
            return BadRequest("EAN must be 8 or 13 digits.");
        }

        try
        {
            return Ok(await kassalappProductLookup.LookupByEanAsync(ean, cancellationToken));
        }
        catch (ProductLookupConfigurationException exception)
        {
            return BadRequest(exception.Message);
        }
        catch (ProductLookupRateLimitException exception)
        {
            return StatusCode(StatusCodes.Status429TooManyRequests, exception.Message);
        }
        catch (HttpRequestException exception)
        {
            return StatusCode(StatusCodes.Status502BadGateway, exception.Message);
        }
    }

    [GeneratedRegex("^(\\d{8}|\\d{13})$")]
    private static partial Regex ValidEanRegex();
}
