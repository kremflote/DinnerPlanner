using DinnerPlanner.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace DinnerPlanner.Api.Contexts;

public class DinnerPlannerContext(DbContextOptions<DinnerPlannerContext> options) : DbContext(options)
{
    public DbSet<Ingredient> Ingredients => Set<Ingredient>();
    public DbSet<KitchenItem> KitchenItems => Set<KitchenItem>();
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<RecipeIngredient> RecipeIngredients => Set<RecipeIngredient>();
    public DbSet<Dish> Dishes => Set<Dish>();
    public DbSet<Dessert> Desserts => Set<Dessert>();
    public DbSet<Sauce> Sauces => Set<Sauce>();
    public DbSet<Dip> Dips => Set<Dip>();
    public DbSet<Side> Sides => Set<Side>();
    public DbSet<Marinade> Marinades => Set<Marinade>();
    public DbSet<SpiceMix> SpiceMixes => Set<SpiceMix>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.Property(ingredient => ingredient.IngredientName).HasMaxLength(160);
            entity.Property(ingredient => ingredient.Price).HasPrecision(10, 2);
            entity.Property(ingredient => ingredient.Amount).HasPrecision(10, 2);
            entity.Property(ingredient => ingredient.Unit).HasConversion<string>().HasMaxLength(40);
            entity.Property(ingredient => ingredient.Category).HasConversion<string>().HasMaxLength(64);
            entity.OwnsOne(ingredient => ingredient.NutritionPer100, nutrition =>
            {
                nutrition.Property(value => value.DietaryFiberGrams).HasPrecision(8, 2);
                nutrition.Property(value => value.Vitamins).HasMaxLength(300);
            });
        });

        modelBuilder.Entity<KitchenItem>(entity =>
        {
            entity.Property(item => item.Name).HasMaxLength(160);
            entity.HasOne(item => item.Recipe)
                .WithMany()
                .HasForeignKey(item => item.RecipeId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasDiscriminator<string>("ItemType")
                .HasValue<Dish>("Dish")
                .HasValue<Dessert>("Dessert")
                .HasValue<Sauce>("Sauce")
                .HasValue<Dip>("Dip")
                .HasValue<Side>("Side")
                .HasValue<Marinade>("Marinade")
                .HasValue<SpiceMix>("SpiceMix");
        });

        modelBuilder.Entity<RecipeIngredient>(entity =>
        {
            entity.HasKey(recipeIngredient => recipeIngredient.RecipeIngredientId);

            entity.Property(recipeIngredient => recipeIngredient.Amount).HasPrecision(10, 2);
            entity.Property(recipeIngredient => recipeIngredient.Unit).HasConversion<string>().HasMaxLength(40);
            entity.Property(recipeIngredient => recipeIngredient.Preparation).HasConversion<string>().HasMaxLength(80);

            entity.HasOne(recipeIngredient => recipeIngredient.Recipe)
                .WithMany(recipe => recipe.Ingredients)
                .HasForeignKey(recipeIngredient => recipeIngredient.RecipeId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(recipeIngredient => recipeIngredient.Ingredient)
                .WithMany()
                .HasForeignKey(recipeIngredient => recipeIngredient.IngredientId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.Property(recipe => recipe.Name).HasMaxLength(160);
        });

        modelBuilder.Entity<Dish>(entity =>
        {
            entity.Property(dish => dish.Name).HasMaxLength(160);
            entity.Property(dish => dish.Cuisine).HasConversion<string>().HasMaxLength(64);
        });

        modelBuilder.Entity<Dessert>(entity =>
        {
            entity.Property(dessert => dessert.Name).HasMaxLength(160);
        });
    }
}
