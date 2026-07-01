using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MoveAmountUnitToRecipeIngredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RecipeIngredients_New",
                columns: table => new
                {
                    RecipeIngredientId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    IngredientId = table.Column<int>(type: "INTEGER", nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", precision: 10, scale: 2, nullable: true),
                    Unit = table.Column<string>(type: "TEXT", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredients_New", x => x.RecipeIngredientId);
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_New_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "IngredientId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_New_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "RecipeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql("""
                INSERT INTO RecipeIngredients_New (RecipeId, IngredientId, Amount, Unit)
                SELECT ri.RecipeId, ri.IngredientId, i.Amount, COALESCE(i.Unit, 'Gram')
                FROM RecipeIngredients ri
                INNER JOIN Ingredients i ON i.IngredientId = ri.IngredientId
                """);

            migrationBuilder.Sql("""
                UPDATE RecipeIngredients_New SET Amount = 200, Unit = 'Gram'
                WHERE RecipeId = 1 AND IngredientId = 3
                """);
            migrationBuilder.Sql("""
                UPDATE RecipeIngredients_New SET Amount = 1, Unit = 'Clove'
                WHERE RecipeId = 1 AND IngredientId = 2
                """);
            migrationBuilder.Sql("""
                UPDATE RecipeIngredients_New SET Amount = 0.5, Unit = 'Piece'
                WHERE RecipeId = 1 AND IngredientId = 5
                """);
            migrationBuilder.Sql("""
                UPDATE RecipeIngredients_New SET Amount = 400, Unit = 'Gram'
                WHERE RecipeId = 2 AND IngredientId = 1
                """);
            migrationBuilder.Sql("""
                UPDATE RecipeIngredients_New SET Amount = 250, Unit = 'Gram'
                WHERE RecipeId = 2 AND IngredientId = 4
                """);
            migrationBuilder.Sql("""
                INSERT INTO RecipeIngredients_New (RecipeId, IngredientId, Amount, Unit)
                SELECT 3, 4, 250, 'Gram'
                WHERE EXISTS (SELECT 1 FROM Recipes WHERE RecipeId = 3)
                AND EXISTS (SELECT 1 FROM Ingredients WHERE IngredientId = 4)
                AND NOT EXISTS (
                    SELECT 1 FROM RecipeIngredients_New
                    WHERE RecipeId = 3 AND IngredientId = 4
                )
                """);

            migrationBuilder.DropTable(name: "RecipeIngredients");

            migrationBuilder.RenameTable(
                name: "RecipeIngredients_New",
                newName: "RecipeIngredients");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_IngredientId",
                table: "RecipeIngredients",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_RecipeId_IngredientId",
                table: "RecipeIngredients",
                columns: new[] { "RecipeId", "IngredientId" },
                unique: true);

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Ingredients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Ingredients",
                type: "TEXT",
                precision: 10,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "Ingredients",
                type: "TEXT",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 1,
                columns: new[] { "Amount", "Unit" },
                values: new object[] { 1m, "Kilogram" });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 2,
                columns: new[] { "Amount", "Unit" },
                values: new object[] { 1m, "Piece" });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 3,
                columns: new[] { "Amount", "Unit" },
                values: new object[] { 500m, "Gram" });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 4,
                columns: new[] { "Amount", "Unit" },
                values: new object[] { 1m, "Kilogram" });

            migrationBuilder.UpdateData(
                table: "Ingredients",
                keyColumn: "IngredientId",
                keyValue: 5,
                columns: new[] { "Amount", "Unit" },
                values: new object[] { 1m, "Piece" });

            migrationBuilder.CreateTable(
                name: "RecipeIngredients_Old",
                columns: table => new
                {
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    IngredientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredients_Old", x => new { x.RecipeId, x.IngredientId });
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_Old_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "IngredientId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_Old_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "RecipeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.Sql("""
                INSERT OR IGNORE INTO RecipeIngredients_Old (RecipeId, IngredientId)
                SELECT RecipeId, IngredientId
                FROM RecipeIngredients
                """);

            migrationBuilder.DropTable(name: "RecipeIngredients");

            migrationBuilder.RenameTable(
                name: "RecipeIngredients_Old",
                newName: "RecipeIngredients");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_IngredientId",
                table: "RecipeIngredients",
                column: "IngredientId");
        }
    }
}
