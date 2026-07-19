using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ExpandNutritionMicronutrients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_CholineMilligrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminAMicrograms",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminB12Micrograms",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminB9Micrograms",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminCMilligrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminDMicrograms",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminEMilligrams",
                table: "Ingredients",
                type: "TEXT",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NutritionPer100_VitaminKMicrograms",
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
                name: "NutritionPer100_CholineMilligrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminAMicrograms",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminB12Micrograms",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminB9Micrograms",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminCMilligrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminDMicrograms",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminEMilligrams",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "NutritionPer100_VitaminKMicrograms",
                table: "Ingredients");
        }
    }
}
