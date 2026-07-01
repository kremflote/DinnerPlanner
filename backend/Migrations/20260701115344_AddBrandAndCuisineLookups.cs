using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBrandAndCuisineLookups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CuisineId",
                table: "Recipes",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "Ingredients",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    BrandId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.BrandId);
                });

            migrationBuilder.CreateTable(
                name: "Cuisines",
                columns: table => new
                {
                    CuisineId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cuisines", x => x.CuisineId);
                });

            migrationBuilder.InsertData(
                table: "Cuisines",
                columns: new[] { "CuisineId", "Name" },
                values: new object[,]
                {
                    { 1, "Asian" },
                    { 2, "Indian" },
                    { 3, "Mediterranean" },
                    { 4, "French" },
                    { 5, "Norwegian" },
                    { 6, "Mexican" },
                    { 7, "Italian" },
                    { 8, "Grill" },
                    { 9, "Other" }
                });

            migrationBuilder.Sql("""
                INSERT INTO Brands (Name)
                SELECT DISTINCT TRIM(Brand)
                FROM Ingredients
                WHERE Brand IS NOT NULL AND TRIM(Brand) <> ''
                AND NOT EXISTS (
                    SELECT 1 FROM Brands
                    WHERE LOWER(Brands.Name) = LOWER(TRIM(Ingredients.Brand))
                )
                """);

            migrationBuilder.Sql("""
                INSERT INTO Cuisines (Name)
                SELECT DISTINCT TRIM(Cuisine)
                FROM Recipes
                WHERE Cuisine IS NOT NULL AND TRIM(Cuisine) <> ''
                AND NOT EXISTS (
                    SELECT 1 FROM Cuisines
                    WHERE LOWER(Cuisines.Name) = LOWER(TRIM(Recipes.Cuisine))
                )
                """);

            migrationBuilder.Sql("""
                UPDATE Ingredients
                SET BrandId = (
                    SELECT BrandId
                    FROM Brands
                    WHERE LOWER(Brands.Name) = LOWER(TRIM(Ingredients.Brand))
                    LIMIT 1
                )
                WHERE Brand IS NOT NULL AND TRIM(Brand) <> ''
                """);

            migrationBuilder.Sql("""
                UPDATE Recipes
                SET CuisineId = (
                    SELECT CuisineId
                    FROM Cuisines
                    WHERE LOWER(Cuisines.Name) = LOWER(TRIM(Recipes.Cuisine))
                    LIMIT 1
                )
                WHERE Cuisine IS NOT NULL AND TRIM(Cuisine) <> ''
                """);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CuisineId",
                table: "Recipes",
                column: "CuisineId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_BrandId",
                table: "Ingredients",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Brands_Name",
                table: "Brands",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cuisines_Name",
                table: "Cuisines",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Brands_BrandId",
                table: "Ingredients",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "BrandId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Cuisines_CuisineId",
                table: "Recipes",
                column: "CuisineId",
                principalTable: "Cuisines",
                principalColumn: "CuisineId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.DropColumn(
                name: "Cuisine",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Brand",
                table: "Ingredients");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Brands_BrandId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Cuisines_CuisineId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CuisineId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_BrandId",
                table: "Ingredients");

            migrationBuilder.AddColumn<string>(
                name: "Cuisine",
                table: "Recipes",
                type: "TEXT",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Brand",
                table: "Ingredients",
                type: "TEXT",
                nullable: true);

            migrationBuilder.Sql("""
                UPDATE Ingredients
                SET Brand = (
                    SELECT Name
                    FROM Brands
                    WHERE Brands.BrandId = Ingredients.BrandId
                    LIMIT 1
                )
                WHERE BrandId IS NOT NULL
                """);

            migrationBuilder.Sql("""
                UPDATE Recipes
                SET Cuisine = (
                    SELECT Name
                    FROM Cuisines
                    WHERE Cuisines.CuisineId = Recipes.CuisineId
                    LIMIT 1
                )
                WHERE CuisineId IS NOT NULL
                """);

            migrationBuilder.DropColumn(
                name: "CuisineId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "Ingredients");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Cuisines");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "RecipeId",
                keyValue: 2,
                column: "Cuisine",
                value: "Asian");
        }
    }
}
