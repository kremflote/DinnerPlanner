using DinnerPlanner.Api.Contexts;
using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController(DinnerPlannerContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<IngredientDto>>> GetIngredients()
    {
        var ingredients = await context.Ingredients
            .AsNoTracking()
            .OrderBy(ingredient => ingredient.IngredientName)
            .ToListAsync();

        return Ok(ingredients.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<IngredientDto>> GetIngredient(int id)
    {
        var ingredient = await context.Ingredients
            .AsNoTracking()
            .FirstOrDefaultAsync(ingredient => ingredient.IngredientId == id);

        return ingredient is null ? NotFound() : Ok(ToDto(ingredient));
    }

    [HttpPost]
    public async Task<ActionResult<IngredientDto>> CreateIngredient(IngredientRequest request)
    {
        var ingredient = new Ingredient
        {
            IngredientName = request.IngredientName,
            Brand = request.Brand,
            Price = request.Price,
            Amount = request.Amount,
            Unit = request.Unit,
            Category = request.Category,
            NutritionPer100 = request.NutritionPer100,
            Color = request.Color
        };

        context.Ingredients.Add(ingredient);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetIngredient), new { id = ingredient.IngredientId }, ToDto(ingredient));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateIngredient(int id, IngredientRequest request)
    {
        var ingredient = await context.Ingredients.FindAsync(id);
        if (ingredient is null)
        {
            return NotFound();
        }

        ingredient.IngredientName = request.IngredientName;
        ingredient.Brand = request.Brand;
        ingredient.Price = request.Price;
        ingredient.Amount = request.Amount;
        ingredient.Unit = request.Unit;
        ingredient.Category = request.Category;
        ingredient.NutritionPer100 = request.NutritionPer100;
        ingredient.Color = request.Color;

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteIngredient(int id)
    {
        var ingredient = await context.Ingredients.FindAsync(id);
        if (ingredient is null)
        {
            return NotFound();
        }

        context.Ingredients.Remove(ingredient);
        await context.SaveChangesAsync();
        return NoContent();
    }

    private static IngredientDto ToDto(Ingredient ingredient) => new(
        ingredient.IngredientId,
        ingredient.IngredientName,
        ingredient.Brand,
        ingredient.Price,
        ingredient.Amount,
        ingredient.Unit,
        ingredient.Category,
        ingredient.NutritionPer100,
        ingredient.Color
    );
}
