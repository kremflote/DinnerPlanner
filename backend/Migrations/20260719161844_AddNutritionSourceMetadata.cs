using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddNutritionSourceMetadata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MatvaretabellenFoodId",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 80,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionMatchConfidence",
                table: "Ingredients",
                type: "TEXT",
                precision: 4,
                scale: 3,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionMatchedName",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionSource",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 40,
                nullable: false,
                defaultValue: "None");

            migrationBuilder.AddColumn<string>(
                name: "NutritionSourceLabel",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 160,
                nullable: true);

            migrationBuilder.Sql("""
                UPDATE Ingredients
                SET NutritionPer100_Vitamins = NULLIF(TRIM(REPLACE(',' || COALESCE(NutritionPer100_Vitamins, '') || ',', ',VitaminB,', ','), ','), '')
                WHERE NutritionPer100_Vitamins LIKE '%VitaminB%';
                """);

            migrationBuilder.Sql("""
                UPDATE Ingredients
                SET NutritionSource = CASE
                    WHEN NutritionPer100_Calories IS NOT NULL
                        OR NutritionPer100_CarbohydrateGrams IS NOT NULL
                        OR NutritionPer100_ProteinGrams IS NOT NULL
                        OR NutritionPer100_SaltGrams IS NOT NULL
                        OR NutritionPer100_DietaryFiberGrams IS NOT NULL
                        OR NutritionPer100_SaturatedFatGrams IS NOT NULL
                        OR NutritionPer100_UnsaturatedFatGrams IS NOT NULL
                        OR NutritionPer100_MonounsaturatedFatGrams IS NOT NULL
                        OR NutritionPer100_PolyunsaturatedFatGrams IS NOT NULL
                        OR NutritionPer100_Vitamins IS NOT NULL
                    THEN 'Manual'
                    ELSE 'None'
                END;
                """);

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 1,
                columns: new[] { "MatvaretabellenFoodId", "NutritionMatchConfidence", "NutritionMatchedName", "NutritionSource", "NutritionSourceLabel" },
                values: new object[] { null, null, null, "Manual", null });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 2,
                columns: new[] { "MatvaretabellenFoodId", "NutritionMatchConfidence", "NutritionMatchedName", "NutritionSource", "NutritionSourceLabel" },
                values: new object[] { null, null, null, "Manual", null });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 3,
                columns: new[] { "MatvaretabellenFoodId", "NutritionMatchConfidence", "NutritionMatchedName", "NutritionSource", "NutritionSourceLabel" },
                values: new object[] { null, null, null, "Manual", null });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 4,
                columns: new[] { "MatvaretabellenFoodId", "NutritionMatchConfidence", "NutritionMatchedName", "NutritionSource", "NutritionSourceLabel" },
                values: new object[] { null, null, null, "Manual", null });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 5,
                columns: new[] { "MatvaretabellenFoodId", "NutritionMatchConfidence", "NutritionMatchedName", "NutritionSource", "NutritionSourceLabel" },
                values: new object[] { null, null, null, "Manual", null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatvaretabellenFoodId",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionMatchConfidence",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionMatchedName",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionSource",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionSourceLabel",
                table: "Ingredients");
        }
    }
}
