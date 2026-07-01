using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ExpandNutritionFacts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_CarbohydrateGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_MonounsaturatedFatGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_PolyunsaturatedFatGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_ProteinGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_SaltGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_SaturatedFatGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_UnsaturatedFatGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NutritionPer100_CarbohydrateGrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_MonounsaturatedFatGrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_PolyunsaturatedFatGrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_ProteinGrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_SaltGrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_SaturatedFatGrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_UnsaturatedFatGrams",
                table: "Ingredients");
        }
    }
}
