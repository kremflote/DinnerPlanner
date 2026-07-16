using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRecipeComponents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecipeComponents",
                columns: table => new
                {
                    ParentRecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    ChildRecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    SortOrder = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeComponents", x => new { x.ParentRecipeId, x.ChildRecipeId });
                    table.ForeignKey(
                        name: "FK_RecipeComponents_Recipes_ChildRecipeId",
                        column: x => x.ChildRecipeId,
                        principalTable: "Recipes",
                        principalColumn: "RecipeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecipeComponents_Recipes_ParentRecipeId",
                        column: x => x.ParentRecipeId,
                        principalTable: "Recipes",
                        principalColumn: "RecipeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeComponents_ChildRecipeId",
                table: "RecipeComponents",
                column: "ChildRecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeComponents_ParentRecipeId_SortOrder",
                table: "RecipeComponents",
                columns: new[] { "ParentRecipeId", "SortOrder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeComponents");
        }
    }
}
