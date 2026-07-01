using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class EnrichSeedDataAndIngredientDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 600,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 1,
                column: "Description",
                value: "Lean poultry cut with mild flavor. Useful as the main protein in bowls, salads, soups, and quick pan-fried dinners.");

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 2,
                column: "Description",
                value: "Aromatic vegetable used to build flavor in sauces, marinades, soups, stir fries, and roasted dishes.");

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 3,
                column: "Description",
                value: "Thick cultured dairy product. Works as a base for cold sauces, dressings, marinades, and high-protein breakfasts.");

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 4,
                column: "Description",
                value: "Neutral grain that works as a side or base for bowls, curries, stir fries, and meal prep portions.");

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 5,
                column: "Description",
                value: "Bright acidic fruit used for sauces, dressings, marinades, desserts, and finishing cooked dishes.");

            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET
                    "NutritionPer100_Calories" = 165,
                    "NutritionPer100_CarbohydrateGrams" = 0,
                    "NutritionPer100_ProteinGrams" = 31,
                    "NutritionPer100_SaltGrams" = 0.18,
                    "NutritionPer100_DietaryFiberGrams" = 0,
                    "NutritionPer100_SaturatedFatGrams" = 1,
                    "NutritionPer100_UnsaturatedFatGrams" = 2.6,
                    "NutritionPer100_MonounsaturatedFatGrams" = 1.2,
                    "NutritionPer100_PolyunsaturatedFatGrams" = 0.8,
                    "NutritionPer100_Vitamins" = 'VitaminB,VitaminB12'
                WHERE "IngredientId" = 1
                """);

            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET
                    "NutritionPer100_Calories" = 149,
                    "NutritionPer100_CarbohydrateGrams" = 33.1,
                    "NutritionPer100_ProteinGrams" = 6.4,
                    "NutritionPer100_SaltGrams" = 0.04,
                    "NutritionPer100_DietaryFiberGrams" = 2.1,
                    "NutritionPer100_SaturatedFatGrams" = 0.1,
                    "NutritionPer100_UnsaturatedFatGrams" = 0.4,
                    "NutritionPer100_MonounsaturatedFatGrams" = 0,
                    "NutritionPer100_PolyunsaturatedFatGrams" = 0.2,
                    "NutritionPer100_Vitamins" = 'VitaminB,VitaminC'
                WHERE "IngredientId" = 2
                """);

            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET
                    "NutritionPer100_Calories" = 97,
                    "NutritionPer100_CarbohydrateGrams" = 3.6,
                    "NutritionPer100_ProteinGrams" = 9,
                    "NutritionPer100_SaltGrams" = 0.1,
                    "NutritionPer100_DietaryFiberGrams" = 0,
                    "NutritionPer100_SaturatedFatGrams" = 1.6,
                    "NutritionPer100_UnsaturatedFatGrams" = 0.8,
                    "NutritionPer100_MonounsaturatedFatGrams" = 0.7,
                    "NutritionPer100_PolyunsaturatedFatGrams" = 0.1,
                    "NutritionPer100_Vitamins" = 'VitaminB,VitaminB12'
                WHERE "IngredientId" = 3
                """);

            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET
                    "NutritionPer100_Calories" = 130,
                    "NutritionPer100_CarbohydrateGrams" = 28.2,
                    "NutritionPer100_ProteinGrams" = 2.7,
                    "NutritionPer100_SaltGrams" = 0.01,
                    "NutritionPer100_DietaryFiberGrams" = 0.4,
                    "NutritionPer100_SaturatedFatGrams" = 0.1,
                    "NutritionPer100_UnsaturatedFatGrams" = 0.2,
                    "NutritionPer100_MonounsaturatedFatGrams" = 0.1,
                    "NutritionPer100_PolyunsaturatedFatGrams" = 0.1,
                    "NutritionPer100_Vitamins" = 'VitaminB'
                WHERE "IngredientId" = 4
                """);

            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET
                    "NutritionPer100_Calories" = 29,
                    "NutritionPer100_CarbohydrateGrams" = 9.3,
                    "NutritionPer100_ProteinGrams" = 1.1,
                    "NutritionPer100_SaltGrams" = 0,
                    "NutritionPer100_DietaryFiberGrams" = 2.8,
                    "NutritionPer100_SaturatedFatGrams" = 0,
                    "NutritionPer100_UnsaturatedFatGrams" = 0.2,
                    "NutritionPer100_MonounsaturatedFatGrams" = 0,
                    "NutritionPer100_PolyunsaturatedFatGrams" = 0.1,
                    "NutritionPer100_Vitamins" = 'VitaminC'
                WHERE "IngredientId" = 5
                """);

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 1,
                columns: new[] { "Description", "Instructions" },
                values: new object[] { "Cold yogurt sauce with grated garlic and lemon. Best with chicken bowls, grilled meat, roasted vegetables, and rice.", "Grate the garlic finely. Stir garlic, lemon juice, and a little lemon zest into the yogurt. Season with salt and let it rest for at least 10 minutes before serving." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 2,
                columns: new[] { "Description", "Instructions" },
                values: new object[] { "Weeknight bowl with pan-fried chicken, steamed rice, and fresh garlic yogurt sauce. Good as dinner and easy to scale for meal prep.", "Rinse the rice and cook until tender. Slice the chicken breast, season lightly, and fry in a hot pan until cooked through. Spoon rice into bowls, add chicken, and finish with garlic yogurt sauce." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 3,
                columns: new[] { "Description", "Instructions" },
                values: new object[] { "Plain steamed rice for bowls, curries, stir fries, and saucy dishes.", "Rinse the rice until the water runs mostly clear. Cook with the correct amount of water, then rest covered for 5 minutes before fluffing." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET
                    "NutritionPer100_Calories" = NULL,
                    "NutritionPer100_CarbohydrateGrams" = NULL,
                    "NutritionPer100_ProteinGrams" = NULL,
                    "NutritionPer100_SaltGrams" = NULL,
                    "NutritionPer100_DietaryFiberGrams" = NULL,
                    "NutritionPer100_SaturatedFatGrams" = NULL,
                    "NutritionPer100_UnsaturatedFatGrams" = NULL,
                    "NutritionPer100_MonounsaturatedFatGrams" = NULL,
                    "NutritionPer100_PolyunsaturatedFatGrams" = NULL,
                    "NutritionPer100_Vitamins" = NULL
                WHERE "IngredientId" IN (1, 2, 3, 4, 5)
                """);

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Ingredients");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 1,
                columns: new[] { "Description", "Instructions" },
                values: new object[] { "Fresh yogurt sauce with garlic and lemon.", "Grate the garlic, stir it into yogurt with lemon, and season to taste." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 2,
                columns: new[] { "Description", "Instructions" },
                values: new object[] { "Simple chicken bowl with rice and sauce.", "Cook rice. Fry chicken until done. Serve with garlic yogurt sauce." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 3,
                columns: new[] { "Description", "Instructions" },
                values: new object[] { "", "Rinse rice and steam until tender." });
        }
    }
}
