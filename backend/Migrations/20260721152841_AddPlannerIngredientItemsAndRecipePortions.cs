using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPlannerIngredientItemsAndRecipePortions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Portions",
                table: "Recipes",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.Sql("UPDATE Recipes SET Portions = 1 WHERE Portions <= 0");

            migrationBuilder.AlterColumn<int>(
                name: "RecipeId",
                table: "MealPlanRecipes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "MealPlanRecipes",
                type: "TEXT",
                precision: 10,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IngredientId",
                table: "MealPlanRecipes",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Portions",
                table: "MealPlanRecipes",
                type: "TEXT",
                precision: 10,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "MealPlanRecipes",
                type: "TEXT",
                maxLength: 40,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 1,
                column: "Portions",
                value: 1m);

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 2,
                column: "Portions",
                value: 1m);

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 3,
                column: "Portions",
                value: 1m);

            migrationBuilder.CreateIndex(
                name: "IX_MealPlanRecipes_IngredientId",
                table: "MealPlanRecipes",
                column: "IngredientId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealPlanRecipes_Ingredients_IngredientId",
                table: "MealPlanRecipes",
                column: "IngredientId",
                principalTable: "Ingredients",
                principalColumn: "IngredientId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealPlanRecipes_Ingredients_IngredientId",
                table: "MealPlanRecipes");

            migrationBuilder.DropIndex(
                name: "IX_MealPlanRecipes_IngredientId",
                table: "MealPlanRecipes");

            migrationBuilder.DropColumn(
                name: "Portions",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "MealPlanRecipes");

            migrationBuilder.DropColumn(
                name: "IngredientId",
                table: "MealPlanRecipes");

            migrationBuilder.DropColumn(
                name: "Portions",
                table: "MealPlanRecipes");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "MealPlanRecipes");

            migrationBuilder.AlterColumn<int>(
                name: "RecipeId",
                table: "MealPlanRecipes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }
    }
}
