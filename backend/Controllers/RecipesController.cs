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
    public async Task<ActionResult<IEnumerable<RecipeDto>>> GetRecipes([FromQuery] RecipeType? type)
    {
        var recipes = await context.Recipes
            .AsNoTracking()
            .Include(recipe => recipe.Ingredients)
            .Include(recipe => recipe.Tags)
            .OrderBy(recipe => recipe.Name)
            .ToListAsync();

        if (type is not null)
        {
            recipes = recipes.Where(recipe => ToType(recipe) == type.Value).ToList();
        }

        return Ok(recipes.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
    {
        var recipe = await context.Recipes
            .AsNoTracking()
            .Include(recipe => recipe.Ingredients)
            .Include(recipe => recipe.Tags)
            .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

        return recipe is null ? NotFound() : Ok(ToDto(recipe));
    }

    [HttpPost]
    public async Task<ActionResult<RecipeDto>> CreateRecipe(RecipeRequest request)
    {
        var ingredients = await GetIngredients(request.IngredientIds);
        var missingIngredientIds = GetMissingIngredientIds(request.IngredientIds, ingredients);
        if (missingIngredientIds.Count > 0)
        {
            return BadRequest($"No ingredients found for IDs: {string.Join(", ", missingIngredientIds)}.");
        }

        var recipe = CreateRecipeModel(request);
        recipe.Ingredients = ingredients;
        recipe.Tags = NormalizeTags(request.Tags)
            .Select(tag => new RecipeTagAssignment { Tag = tag })
            .ToList();

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
            .Include(recipe => recipe.Tags)
            .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

        if (recipe is null)
        {
            return NotFound();
        }

        if (ToType(recipe) != request.RecipeType)
        {
            return BadRequest("Recipe type cannot be changed.");
        }

        var ingredients = await GetIngredients(request.IngredientIds);
        var missingIngredientIds = GetMissingIngredientIds(request.IngredientIds, ingredients);
        if (missingIngredientIds.Count > 0)
        {
            return BadRequest($"No ingredients found for IDs: {string.Join(", ", missingIngredientIds)}.");
        }

        recipe.Name = request.Name;
        recipe.ImageUrl = request.ImageUrl;
        recipe.Description = request.Description;
        recipe.Instructions = request.Instructions;
        recipe.Ingredients = ingredients;
        ApplySpecialRecipeFields(recipe, request);
        context.RecipeTagAssignments.RemoveRange(recipe.Tags);
        recipe.Tags = NormalizeTags(request.Tags)
            .Select(tag => new RecipeTagAssignment
            {
                RecipeId = recipe.RecipeId,
                Tag = tag
            })
            .ToList();

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
        .Include(recipe => recipe.Tags)
        .FirstOrDefaultAsync(recipe => recipe.RecipeId == id);

    private async Task<List<Ingredient>> GetIngredients(IReadOnlyCollection<int> ingredientIds)
    {
        var ids = ingredientIds.Distinct().ToList();

        return await context.Ingredients
            .Where(ingredient => ids.Contains(ingredient.IngredientId))
            .ToListAsync();
    }

    private static List<int> GetMissingIngredientIds(
        IReadOnlyCollection<int> requestedIngredientIds,
        IReadOnlyCollection<Ingredient> ingredients
    )
    {
        var existingIds = ingredients.Select(ingredient => ingredient.IngredientId);
        return requestedIngredientIds.Distinct().Except(existingIds).ToList();
    }

    private static Recipe CreateRecipeModel(RecipeRequest request)
    {
        Recipe recipe = request.RecipeType switch
        {
            RecipeType.Dish => new Dish(),
            RecipeType.Dessert => new Dessert(),
            RecipeType.Sauce => new Sauce(),
            RecipeType.Dip => new Dip(),
            RecipeType.Side => new Side(),
            RecipeType.SpiceMix => new SpiceMix(),
            _ => throw new ArgumentOutOfRangeException(nameof(request), "Unsupported recipe type.")
        };

        recipe.Name = request.Name;
        recipe.ImageUrl = request.ImageUrl;
        recipe.Description = request.Description;
        recipe.Instructions = request.Instructions;
        ApplySpecialRecipeFields(recipe, request);
        return recipe;
    }

    private static void ApplySpecialRecipeFields(Recipe recipe, RecipeRequest request)
    {
        if (recipe is Dish dish)
        {
            dish.Cuisine = request.Cuisine ?? Cuisine.Other;
            return;
        }

        if (recipe is Dessert dessert)
        {
            dessert.Type = request.DessertType ?? DessertType.Other;
        }
    }

    private static RecipeDto ToDto(Recipe recipe) => new(
        recipe.RecipeId,
        ToType(recipe),
        recipe.Name,
        recipe.ImageUrl,
        recipe.Description,
        recipe.Instructions,
        recipe.Ingredients.Select(ToDto).ToList(),
        recipe.Tags.Select(recipeTag => recipeTag.Tag).OrderBy(tag => tag).ToList(),
        recipe is Dish dish ? dish.Cuisine : null,
        recipe is Dessert dessert ? dessert.Type : null
    );

    private static RecipeType ToType(Recipe recipe) => recipe switch
    {
        Dish => RecipeType.Dish,
        Dessert => RecipeType.Dessert,
        Sauce => RecipeType.Sauce,
        Dip => RecipeType.Dip,
        Side => RecipeType.Side,
        SpiceMix => RecipeType.SpiceMix,
        _ => throw new ArgumentOutOfRangeException(nameof(recipe), "Unsupported recipe type.")
    };

    private static List<RecipeTag> NormalizeTags(IReadOnlyCollection<RecipeTag>? tags) =>
        tags is null
            ? []
            : tags
                .Where(tag => Enum.IsDefined(tag))
                .Distinct()
                .ToList();

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
