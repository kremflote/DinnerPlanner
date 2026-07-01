using DinnerPlanner.Api.Contexts;
using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CuisinesController(DinnerPlannerContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CuisineDto>>> GetCuisines()
    {
        var cuisines = await context.Cuisines
            .AsNoTracking()
            .OrderBy(cuisine => cuisine.Name)
            .ToListAsync();

        return Ok(cuisines.Select(ToDto));
    }

    [HttpPost]
    public async Task<ActionResult<CuisineDto>> CreateCuisine(LookupRequest request)
    {
        var name = request.Name.Trim();
        var existingCuisine = await context.Cuisines
            .FirstOrDefaultAsync(cuisine => cuisine.Name.ToLower() == name.ToLower());

        if (existingCuisine is not null)
        {
            return Ok(ToDto(existingCuisine));
        }

        var cuisine = new Cuisine { Name = name };
        context.Cuisines.Add(cuisine);
        await context.SaveChangesAsync();

        return Ok(ToDto(cuisine));
    }

    private static CuisineDto ToDto(Cuisine cuisine) => new(cuisine.CuisineId, cuisine.Name);
}
