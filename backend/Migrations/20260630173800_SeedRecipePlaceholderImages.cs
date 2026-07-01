using DinnerPlanner.Api.Contexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(DinnerPlannerContext))]
    [Migration("20260630173800_SeedRecipePlaceholderImages")]
    public partial class SeedRecipePlaceholderImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                UPDATE Recipes
                SET ImageUrl = '/images/recipes/garlic-yogurt-sauce.png'
                WHERE RecipeId = 1;
                """);

            migrationBuilder.Sql("""
                UPDATE Recipes
                SET ImageUrl = '/images/recipes/chicken-rice-bowl.png'
                WHERE RecipeId = 2;
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                UPDATE Recipes
                SET ImageUrl = NULL
                WHERE RecipeId IN (1, 2);
                """);
        }
    }
}
