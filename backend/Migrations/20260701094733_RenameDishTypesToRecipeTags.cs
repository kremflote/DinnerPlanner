using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RenameDishTypesToRecipeTags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishTypeAssignments_Recipes_DishId",
                table: "DishTypeAssignments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DishTypeAssignments",
                table: "DishTypeAssignments");

            migrationBuilder.RenameTable(
                name: "DishTypeAssignments",
                newName: "RecipeTagAssignments");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "RecipeTagAssignments",
                newName: "Tag");

            migrationBuilder.RenameColumn(
                name: "DishId",
                table: "RecipeTagAssignments",
                newName: "RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RecipeTagAssignments",
                table: "RecipeTagAssignments",
                columns: new[] { "RecipeId", "Tag" });

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeTagAssignments_Recipes_RecipeId",
                table: "RecipeTagAssignments",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "RecipeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO RecipeTagAssignments (RecipeId, Tag)
                VALUES (2, 'Bowl');
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeTagAssignments_Recipes_RecipeId",
                table: "RecipeTagAssignments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RecipeTagAssignments",
                table: "RecipeTagAssignments");

            migrationBuilder.RenameTable(
                name: "RecipeTagAssignments",
                newName: "DishTypeAssignments");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "DishTypeAssignments",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "RecipeId",
                table: "DishTypeAssignments",
                newName: "DishId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DishTypeAssignments",
                table: "DishTypeAssignments",
                columns: new[] { "DishId", "Type" });

            migrationBuilder.AddForeignKey(
                name: "FK_DishTypeAssignments_Recipes_DishId",
                table: "DishTypeAssignments",
                column: "DishId",
                principalTable: "Recipes",
                principalColumn: "RecipeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
