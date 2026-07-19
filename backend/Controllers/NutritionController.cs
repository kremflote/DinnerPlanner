using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NutritionController(
    NutritionSummaryService nutritionSummaryService,
    AppSettingsService appSettingsService
) : ControllerBase
{
    [HttpGet("weekly")]
    public async Task<ActionResult<NutritionSummaryDto>> GetWeeklySummary(
        [FromQuery] DateOnly from,
        [FromQuery] DateOnly to,
        [FromQuery] string? profileId
    )
    {
        if (from > to)
        {
            return BadRequest("'from' must be before or equal to 'to'.");
        }

        var selectedProfileId = profileId
            ?? await appSettingsService.GetValueAsync(AppSettingKeys.NutritionProfileId, HttpContext.RequestAborted);

        return Ok(await nutritionSummaryService.GetSummaryAsync(from, to, selectedProfileId));
    }

    [HttpGet("profile-preference")]
    public async Task<ActionResult<NutritionProfilePreferenceDto>> GetProfilePreference(CancellationToken cancellationToken) =>
        Ok(new NutritionProfilePreferenceDto(await appSettingsService.GetValueAsync(AppSettingKeys.NutritionProfileId, cancellationToken)));

    [HttpPut("profile-preference")]
    public async Task<ActionResult<NutritionProfilePreferenceDto>> UpdateProfilePreference(
        [FromBody] NutritionProfilePreferenceDto request,
        CancellationToken cancellationToken
    )
    {
        await appSettingsService.SetNutritionProfileIdAsync(request.ProfileId, cancellationToken);
        return Ok(new NutritionProfilePreferenceDto(request.ProfileId));
    }

    [HttpPost("reference-values/import")]
    public async Task<ActionResult<NutritionReferenceImportResultDto>> ImportReferenceValues(
        [FromServices] NutritionReferenceImportService importService,
        CancellationToken cancellationToken
    )
    {
        try
        {
            return Ok(await importService.ImportFromHelsedirektoratetAsync(cancellationToken));
        }
        catch (HelsedirektoratetConfigurationException exception)
        {
            return Problem(exception.Message, statusCode: StatusCodes.Status503ServiceUnavailable);
        }
        catch (HelsedirektoratetRequestException exception)
        {
            return Problem(exception.Message, statusCode: StatusCodes.Status502BadGateway);
        }
    }
}
