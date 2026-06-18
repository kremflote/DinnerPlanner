using DinnerPlanner.Api.Contexts;
using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DinnerPlanner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipesController(DinnerPlannerContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecipeDto>>> GetRecipes()
    {
        var recipes = await context.Recipes
            .AsNoTracking()
            .Include(recipe => recipe.Ingredients)
            .ThenInclude(recipeIngredient => recipeIngredient.Ingredient)
            .OrderBy(recipe => recipe.Name)
            .ToListAsync();

        return Ok(recipes.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
    {
        var recipe = await context.Recipes
            .AsNoTracking()
            .Include(recipe => recipe.Ingredients)
            .ThenInclude(recipeIngredient => recipeIngredient.Ingredient)
            .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

        return recipe is null ? NotFound() : Ok(ToDto(recipe));
    }

    [HttpPost]
    public async Task<ActionResult<RecipeDto>> CreateRecipe(RecipeRequest request)
    {
        var recipe = new Recipe
        {
            Name = request.Name,
            ImageUrl = request.ImageUrl,
            Description = request.Description,
            Instructions = request.Instructions,
            Ingredients = request.Ingredients.Select(ToRecipeIngredient).ToList()
        };

        context.Recipes.Add(recipe);
        await context.SaveChangesAsync();

        var created = await LoadRecipe(recipe.RecipeId);
        return CreatedAtAction(nameof(GetRecipe), new { id = recipe.RecipeId }, ToDto(created!));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateRecipe(int id, RecipeRequest request)
    {
        var recipe = await context.Recipes
            .Include(recipe => recipe.Ingredients)
            .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

        if (recipe is null)
        {
            return NotFound();
        }

        recipe.Name = request.Name;
        recipe.ImageUrl = request.ImageUrl;
        recipe.Description = request.Description;
        recipe.Instructions = request.Instructions;

        context.RecipeIngredients.RemoveRange(recipe.Ingredients);
        recipe.Ingredients = request.Ingredients.Select(ToRecipeIngredient).ToList();

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe = await context.Recipes.FindAsync(id);
        if (recipe is null)
        {
            return NotFound();
        }

        context.Recipes.Remove(recipe);
        await context.SaveChangesAsync();
        return NoContent();
    }

    private Task<Recipe?> LoadRecipe(int id) => context.Recipes
        .AsNoTracking()
        .Include(recipe => recipe.Ingredients)
        .ThenInclude(recipeIngredient => recipeIngredient.Ingredient)
        .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

    private static RecipeIngredient ToRecipeIngredient(RecipeIngredientRequest request) => new()
    {
        IngredientId = request.IngredientId,
        Amount = request.Amount,
        Unit = request.Unit,
        Preparation = request.Preparation
    };

    private static RecipeDto ToDto(Recipe recipe) => new(
        recipe.RecipeId,
        recipe.Name,
        recipe.ImageUrl,
        recipe.Description,
        recipe.Instructions,
        recipe.Ingredients.Select(ToDto).ToList()
    );

    private static RecipeIngredientDto ToDto(RecipeIngredient recipeIngredient) => new(
        recipeIngredient.RecipeIngredientId,
        recipeIngredient.IngredientId,
        recipeIngredient.Ingredient is null ? null : ToDto(recipeIngredient.Ingredient),
        recipeIngredient.Amount,
        recipeIngredient.Unit,
        recipeIngredient.Preparation
    );

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
