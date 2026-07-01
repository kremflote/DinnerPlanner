using DinnerPlanner.Api.Contexts;
using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BrandsController(DinnerPlannerContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BrandDto>>> GetBrands()
    {
        var brands = await context.Brands
            .AsNoTracking()
            .OrderBy(brand => brand.Name)
            .ToListAsync();

        return Ok(brands.Select(ToDto));
    }

    [HttpPost]
    public async Task<ActionResult<BrandDto>> CreateBrand(LookupRequest request)
    {
        var name = request.Name.Trim();
        var existingBrand = await context.Brands
            .FirstOrDefaultAsync(brand => brand.Name.ToLower() == name.ToLower());

        if (existingBrand is not null)
        {
            return Ok(ToDto(existingBrand));
        }

        var brand = new Brand { Name = name };
        context.Brands.Add(brand);
        await context.SaveChangesAsync();

        return Ok(ToDto(brand));
    }

    private static BrandDto ToDto(Brand brand) => new(brand.BrandId, brand.Name);
}
