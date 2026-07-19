using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ExpandNutritionFatFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NutritionPer100_UnsaturatedFatGrams",
                table: "Ingredients");

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_CholesterolMilligrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_TransFatGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_Omega3Grams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_Omega6Grams",
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
                name: "NutritionPer100_CholesterolMilligrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_Omega3Grams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_Omega6Grams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_TransFatGrams",
                table: "Ingredients");

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_UnsaturatedFatGrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);
        }
    }
}
