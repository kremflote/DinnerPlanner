using DinnerPlanner.Api.Contexts;
using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DishesController(DinnerPlannerContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DishDto>>> GetDishes()
    {
        var dishes = await context.Dishes
            .AsNoTracking()
            .OrderBy(dish => dish.Name)
            .ToListAsync();

        return Ok(dishes.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<DishDto>> GetDish(int id)
    {
        var dish = await context.Dishes
            .AsNoTracking()
            .FirstOrDefaultAsync(dish => dish.Id == id);

        return dish is null ? NotFound() : Ok(ToDto(dish));
    }

    [HttpPost]
    public async Task<ActionResult<DishDto>> CreateDish(DishRequest request)
    {
        var dish = new Dish
        {
            Name = request.Name,
            ImageUrl = request.ImageUrl,
            RecipeId = request.RecipeId,
            Type = request.Type,
            Cuisine = request.Cuisine
        };

        context.Dishes.Add(dish);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, ToDto(dish));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateDish(int id, DishRequest request)
    {
        var dish = await context.Dishes.FindAsync(id);
        if (dish is null)
        {
            return NotFound();
        }

        dish.Name = request.Name;
        dish.ImageUrl = request.ImageUrl;
        dish.RecipeId = request.RecipeId;
        dish.Type = request.Type;
        dish.Cuisine = request.Cuisine;

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDish(int id)
    {
        var dish = await context.Dishes.FindAsync(id);
        if (dish is null)
        {
            return NotFound();
        }

        context.Dishes.Remove(dish);
        await context.SaveChangesAsync();
        return NoContent();
    }

    private static DishDto ToDto(Dish dish) => new(
        dish.Id,
        dish.Name,
        dish.ImageUrl,
        dish.RecipeId,
        dish.Type,
        dish.Cuisine
    );
}
