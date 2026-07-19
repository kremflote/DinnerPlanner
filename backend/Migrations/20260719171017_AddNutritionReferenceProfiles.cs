using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddNutritionReferenceProfiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NutritionReferenceImportRuns",
                columns: table => new
                {
                    NutritionReferenceImportRunId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Provider = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Status = table.Column<string>(type: "TEXT", maxLength: 80, nullable: false),
                    Message = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: true),
                    SourceUrl = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    StartedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    CompletedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionReferenceImportRuns", x => x.NutritionReferenceImportRunId);
                });

            migrationBuilder.CreateTable(
                name: "NutritionReferenceProfiles",
                columns: table => new
                {
                    NutritionReferenceProfileId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProfileId = table.Column<string>(type: "TEXT", maxLength: 80, nullable: false),
                    Label = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Gender = table.Column<string>(type: "TEXT", maxLength: 40, nullable: false),
                    MinAge = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxAge = table.Column<int>(type: "INTEGER", nullable: true),
                    SourceUrl = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    SourceUpdatedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    ImportedAt = table.Column<DateTimeOffset>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionReferenceProfiles", x => x.NutritionReferenceProfileId);
                });

            migrationBuilder.CreateTable(
                name: "NutritionReferenceValues",
                columns: table => new
                {
                    NutritionReferenceValueId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NutritionReferenceProfileId = table.Column<int>(type: "INTEGER", nullable: false),
                    NutrientKey = table.Column<string>(type: "TEXT", maxLength: 80, nullable: false),
                    Label = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    DailyAmount = table.Column<decimal>(type: "TEXT", precision: 10, scale: 2, nullable: false),
                    Unit = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    ValueType = table.Column<string>(type: "TEXT", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionReferenceValues", x => x.NutritionReferenceValueId);
                    table.ForeignKey(
                        name: "FK_NutritionReferenceValues_NutritionReferenceProfiles_NutritionReferenceProfileId",
                        column: x => x.NutritionReferenceProfileId,
                        principalTable: "NutritionReferenceProfiles",
                        principalColumn: "NutritionReferenceProfileId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "NutritionReferenceProfiles",
                columns: new[] { "NutritionReferenceProfileId", "Gender", "ImportedAt", "Label", "MaxAge", "MinAge", "ProfileId", "SourceUpdatedAt", "SourceUrl" },
                values: new object[,]
                {
                    { 1, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 18-50", 50, 18, "female-18-50", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 2, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 18-50", 50, 18, "male-18-50", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" }
                });

            migrationBuilder.InsertData(
                table: "NutritionReferenceValues",
                columns: new[] { "NutritionReferenceValueId", "DailyAmount", "Label", "NutrientKey", "NutritionReferenceProfileId", "Unit", "ValueType" },
                values: new object[,]
                {
                    { 1, 700m, "Vitamin A", "vitaminA", 1, "ug", "ManualFallback" },
                    { 2, 330m, "Vitamin B9", "vitaminB9", 1, "ug", "ManualFallback" },
                    { 3, 4m, "Vitamin B12", "vitaminB12", 1, "ug", "ManualFallback" },
                    { 4, 95m, "Vitamin C", "vitaminC", 1, "mg", "ManualFallback" },
                    { 5, 10m, "Vitamin D", "vitaminD", 1, "ug", "ManualFallback" },
                    { 6, 10m, "Vitamin E", "vitaminE", 1, "mg", "ManualFallback" },
                    { 7, 65m, "Vitamin K", "vitaminK", 1, "ug", "ManualFallback" },
                    { 8, 400m, "Choline", "choline", 1, "mg", "ManualFallback" },
                    { 9, 800m, "Vitamin A", "vitaminA", 2, "ug", "ManualFallback" },
                    { 10, 330m, "Vitamin B9", "vitaminB9", 2, "ug", "ManualFallback" },
                    { 11, 4m, "Vitamin B12", "vitaminB12", 2, "ug", "ManualFallback" },
                    { 12, 110m, "Vitamin C", "vitaminC", 2, "mg", "ManualFallback" },
                    { 13, 10m, "Vitamin D", "vitaminD", 2, "ug", "ManualFallback" },
                    { 14, 11m, "Vitamin E", "vitaminE", 2, "mg", "ManualFallback" },
                    { 15, 75m, "Vitamin K", "vitaminK", 2, "ug", "ManualFallback" },
                    { 16, 400m, "Choline", "choline", 2, "mg", "ManualFallback" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_NutritionReferenceProfiles_ProfileId",
                table: "NutritionReferenceProfiles",
                column: "ProfileId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NutritionReferenceValues_NutritionReferenceProfileId_NutrientKey",
                table: "NutritionReferenceValues",
                columns: new[] { "NutritionReferenceProfileId", "NutrientKey" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NutritionReferenceImportRuns");

            migrationBuilder.DropTable(
                name: "NutritionReferenceValues");

            migrationBuilder.DropTable(
                name: "NutritionReferenceProfiles");
        }
    }
}
