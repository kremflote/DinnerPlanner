using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ConvertIngredientCategoryToTags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IngredientTagAssignments",
                columns: table => new
                {
                    IngredientId = table.Column<int>(type: "INTEGER", nullable: false),
                    Tag = table.Column<string>(type: "TEXT", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientTagAssignments", x => new { x.IngredientId, x.Tag });
                    table.ForeignKey(
                        name: "FK_IngredientTagAssignments_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "IngredientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO "IngredientTagAssignments" ("IngredientId", "Tag")
                SELECT "IngredientId", "Category"
                FROM "Ingredients"
                WHERE "Category" IS NOT NULL AND "Category" <> ''
                """);

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Ingredients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 64,
                nullable: false,
                defaultValue: "Other");

            migrationBuilder.Sql("""
                UPDATE "Ingredients"
                SET "Category" = COALESCE(
                    (
                        SELECT "Tag"
                        FROM "IngredientTagAssignments"
                        WHERE "IngredientTagAssignments"."IngredientId" = "Ingredients"."IngredientId"
                        ORDER BY "Tag"
                        LIMIT 1
                    ),
                    'Other'
                )
                """);

            migrationBuilder.DropTable(
                name: "IngredientTagAssignments");
        }
    }
}
