using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ExpandNutritionReferenceProfiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 1,
                columns: new[] { "Gender", "Label", "MaxAge", "MinAge", "ProfileId" },
                values: new object[] { "Child", "Child 1-3", 3, 1, "child-1-3" });

            migrationBuilder.UpdateData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 2,
                columns: new[] { "Gender", "Label", "MaxAge", "MinAge", "ProfileId" },
                values: new object[] { "Child", "Child 4-6", 6, 4, "child-4-6" });

            migrationBuilder.InsertData(
                table: "NutritionReferenceProfiles",
                columns: new[] { "NutritionReferenceProfileId", "Gender", "ImportedAt", "Label", "MaxAge", "MinAge", "ProfileId", "SourceUpdatedAt", "SourceUrl" },
                values: new object[,]
                {
                    { 3, "Child", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Child 7-10", 10, 7, "child-7-10", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 4, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 11-14", 14, 11, "female-11-14", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 5, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 15-17", 17, 15, "female-15-17", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 6, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 18-24", 24, 18, "female-18-24", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 7, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 25-50", 50, 25, "female-25-50", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 8, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 51-70", 70, 51, "female-51-70", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 9, "Female", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Female 70+", null, 70, "female-70-plus", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 10, "Pregnancy", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Pregnant, trimester 1", null, 18, "pregnant-trimester-1", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 11, "Pregnancy", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Pregnant, trimester 2", null, 18, "pregnant-trimester-2", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 12, "Pregnancy", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Pregnant, trimester 3", null, 18, "pregnant-trimester-3", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 13, "Lactating", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Lactating", null, 18, "lactating", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 14, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 11-14", 14, 11, "male-11-14", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 15, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 15-17", 17, 15, "male-15-17", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 16, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 18-24", 24, 18, "male-18-24", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 17, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 25-50", 50, 25, "male-25-50", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 18, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 51-70", 70, 51, "male-51-70", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" },
                    { 19, "Male", new DateTimeOffset(new DateTime(2026, 7, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Male 70+", null, 70, "male-70-plus", null, "https://www.helsedirektoratet.no/rapporter/referanseverdier-for-energi-og-naeringsstoffer/anbefalinger-om-energi-og-naeringsstoffer-ved-planlegging-av-kosthold/vitaminer-og-mineraler" }
                });

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 1,
                column: "DailyAmount",
                value: 300m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 2,
                column: "DailyAmount",
                value: 120m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 3,
                column: "DailyAmount",
                value: 1.5m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 4,
                column: "DailyAmount",
                value: 25m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 6,
                column: "DailyAmount",
                value: 7m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 7,
                column: "DailyAmount",
                value: 15m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 8,
                column: "DailyAmount",
                value: 150m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 9,
                column: "DailyAmount",
                value: 350m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 10,
                column: "DailyAmount",
                value: 140m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 11,
                column: "DailyAmount",
                value: 1.7m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 12,
                column: "DailyAmount",
                value: 35m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 14,
                column: "DailyAmount",
                value: 8m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 15,
                column: "DailyAmount",
                value: 20m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 16,
                column: "DailyAmount",
                value: 170m);

            migrationBuilder.InsertData(
                table: "NutritionReferenceValues",
                columns: new[] { "NutritionReferenceValueId", "DailyAmount", "Label", "NutrientKey", "NutritionReferenceProfileId", "Unit", "ValueType" },
                values: new object[,]
                {
                    { 17, 450m, "Vitamin A", "vitaminA", 3, "ug", "ManualFallback" },
                    { 18, 200m, "Vitamin B9", "vitaminB9", 3, "ug", "ManualFallback" },
                    { 19, 2.5m, "Vitamin B12", "vitaminB12", 3, "ug", "ManualFallback" },
                    { 20, 55m, "Vitamin C", "vitaminC", 3, "mg", "ManualFallback" },
                    { 21, 10m, "Vitamin D", "vitaminD", 3, "ug", "ManualFallback" },
                    { 22, 9m, "Vitamin E", "vitaminE", 3, "mg", "ManualFallback" },
                    { 23, 30m, "Vitamin K", "vitaminK", 3, "ug", "ManualFallback" },
                    { 24, 250m, "Choline", "choline", 3, "mg", "ManualFallback" },
                    { 25, 650m, "Vitamin A", "vitaminA", 4, "ug", "ManualFallback" },
                    { 26, 280m, "Vitamin B9", "vitaminB9", 4, "ug", "ManualFallback" },
                    { 27, 3.5m, "Vitamin B12", "vitaminB12", 4, "ug", "ManualFallback" },
                    { 28, 75m, "Vitamin C", "vitaminC", 4, "mg", "ManualFallback" },
                    { 29, 10m, "Vitamin D", "vitaminD", 4, "ug", "ManualFallback" },
                    { 30, 10m, "Vitamin E", "vitaminE", 4, "mg", "ManualFallback" },
                    { 31, 45m, "Vitamin K", "vitaminK", 4, "ug", "ManualFallback" },
                    { 32, 350m, "Choline", "choline", 4, "mg", "ManualFallback" },
                    { 33, 650m, "Vitamin A", "vitaminA", 5, "ug", "ManualFallback" },
                    { 34, 310m, "Vitamin B9", "vitaminB9", 5, "ug", "ManualFallback" },
                    { 35, 4m, "Vitamin B12", "vitaminB12", 5, "ug", "ManualFallback" },
                    { 36, 90m, "Vitamin C", "vitaminC", 5, "mg", "ManualFallback" },
                    { 37, 10m, "Vitamin D", "vitaminD", 5, "ug", "ManualFallback" },
                    { 38, 11m, "Vitamin E", "vitaminE", 5, "mg", "ManualFallback" },
                    { 39, 60m, "Vitamin K", "vitaminK", 5, "ug", "ManualFallback" },
                    { 40, 390m, "Choline", "choline", 5, "mg", "ManualFallback" },
                    { 41, 700m, "Vitamin A", "vitaminA", 6, "ug", "ManualFallback" },
                    { 42, 330m, "Vitamin B9", "vitaminB9", 6, "ug", "ManualFallback" },
                    { 43, 4m, "Vitamin B12", "vitaminB12", 6, "ug", "ManualFallback" },
                    { 44, 95m, "Vitamin C", "vitaminC", 6, "mg", "ManualFallback" },
                    { 45, 10m, "Vitamin D", "vitaminD", 6, "ug", "ManualFallback" },
                    { 46, 10m, "Vitamin E", "vitaminE", 6, "mg", "ManualFallback" },
                    { 47, 65m, "Vitamin K", "vitaminK", 6, "ug", "ManualFallback" },
                    { 48, 400m, "Choline", "choline", 6, "mg", "ManualFallback" },
                    { 49, 700m, "Vitamin A", "vitaminA", 7, "ug", "ManualFallback" },
                    { 50, 330m, "Vitamin B9", "vitaminB9", 7, "ug", "ManualFallback" },
                    { 51, 4m, "Vitamin B12", "vitaminB12", 7, "ug", "ManualFallback" },
                    { 52, 95m, "Vitamin C", "vitaminC", 7, "mg", "ManualFallback" },
                    { 53, 10m, "Vitamin D", "vitaminD", 7, "ug", "ManualFallback" },
                    { 54, 10m, "Vitamin E", "vitaminE", 7, "mg", "ManualFallback" },
                    { 55, 65m, "Vitamin K", "vitaminK", 7, "ug", "ManualFallback" },
                    { 56, 400m, "Choline", "choline", 7, "mg", "ManualFallback" },
                    { 57, 700m, "Vitamin A", "vitaminA", 8, "ug", "ManualFallback" },
                    { 58, 330m, "Vitamin B9", "vitaminB9", 8, "ug", "ManualFallback" },
                    { 59, 4m, "Vitamin B12", "vitaminB12", 8, "ug", "ManualFallback" },
                    { 60, 95m, "Vitamin C", "vitaminC", 8, "mg", "ManualFallback" },
                    { 61, 10m, "Vitamin D", "vitaminD", 8, "ug", "ManualFallback" },
                    { 62, 9m, "Vitamin E", "vitaminE", 8, "mg", "ManualFallback" },
                    { 63, 60m, "Vitamin K", "vitaminK", 8, "ug", "ManualFallback" },
                    { 64, 400m, "Choline", "choline", 8, "mg", "ManualFallback" },
                    { 65, 650m, "Vitamin A", "vitaminA", 9, "ug", "ManualFallback" },
                    { 66, 330m, "Vitamin B9", "vitaminB9", 9, "ug", "ManualFallback" },
                    { 67, 4m, "Vitamin B12", "vitaminB12", 9, "ug", "ManualFallback" },
                    { 68, 95m, "Vitamin C", "vitaminC", 9, "mg", "ManualFallback" },
                    { 69, 20m, "Vitamin D", "vitaminD", 9, "ug", "ManualFallback" },
                    { 70, 9m, "Vitamin E", "vitaminE", 9, "mg", "ManualFallback" },
                    { 71, 60m, "Vitamin K", "vitaminK", 9, "ug", "ManualFallback" },
                    { 72, 400m, "Choline", "choline", 9, "mg", "ManualFallback" },
                    { 73, 750m, "Vitamin A", "vitaminA", 10, "ug", "ManualFallback" },
                    { 74, 600m, "Vitamin B9", "vitaminB9", 10, "ug", "ManualFallback" },
                    { 75, 4.5m, "Vitamin B12", "vitaminB12", 10, "ug", "ManualFallback" },
                    { 76, 105m, "Vitamin C", "vitaminC", 10, "mg", "ManualFallback" },
                    { 77, 10m, "Vitamin D", "vitaminD", 10, "ug", "ManualFallback" },
                    { 78, 10m, "Vitamin E", "vitaminE", 10, "mg", "ManualFallback" },
                    { 79, 65m, "Vitamin K", "vitaminK", 10, "ug", "ManualFallback" },
                    { 80, 410m, "Choline", "choline", 10, "mg", "ManualFallback" },
                    { 81, 750m, "Vitamin A", "vitaminA", 11, "ug", "ManualFallback" },
                    { 82, 600m, "Vitamin B9", "vitaminB9", 11, "ug", "ManualFallback" },
                    { 83, 4.5m, "Vitamin B12", "vitaminB12", 11, "ug", "ManualFallback" },
                    { 84, 105m, "Vitamin C", "vitaminC", 11, "mg", "ManualFallback" },
                    { 85, 10m, "Vitamin D", "vitaminD", 11, "ug", "ManualFallback" },
                    { 86, 11m, "Vitamin E", "vitaminE", 11, "mg", "ManualFallback" },
                    { 87, 70m, "Vitamin K", "vitaminK", 11, "ug", "ManualFallback" },
                    { 88, 430m, "Choline", "choline", 11, "mg", "ManualFallback" },
                    { 89, 750m, "Vitamin A", "vitaminA", 12, "ug", "ManualFallback" },
                    { 90, 600m, "Vitamin B9", "vitaminB9", 12, "ug", "ManualFallback" },
                    { 91, 4.5m, "Vitamin B12", "vitaminB12", 12, "ug", "ManualFallback" },
                    { 92, 105m, "Vitamin C", "vitaminC", 12, "mg", "ManualFallback" },
                    { 93, 10m, "Vitamin D", "vitaminD", 12, "ug", "ManualFallback" },
                    { 94, 12m, "Vitamin E", "vitaminE", 12, "mg", "ManualFallback" },
                    { 95, 75m, "Vitamin K", "vitaminK", 12, "ug", "ManualFallback" },
                    { 96, 470m, "Choline", "choline", 12, "mg", "ManualFallback" },
                    { 97, 1400m, "Vitamin A", "vitaminA", 13, "ug", "ManualFallback" },
                    { 98, 490m, "Vitamin B9", "vitaminB9", 13, "ug", "ManualFallback" },
                    { 99, 5.5m, "Vitamin B12", "vitaminB12", 13, "ug", "ManualFallback" },
                    { 100, 155m, "Vitamin C", "vitaminC", 13, "mg", "ManualFallback" },
                    { 101, 10m, "Vitamin D", "vitaminD", 13, "ug", "ManualFallback" },
                    { 102, 11m, "Vitamin E", "vitaminE", 13, "mg", "ManualFallback" },
                    { 103, 65m, "Vitamin K", "vitaminK", 13, "ug", "ManualFallback" },
                    { 104, 520m, "Choline", "choline", 13, "mg", "ManualFallback" },
                    { 105, 700m, "Vitamin A", "vitaminA", 14, "ug", "ManualFallback" },
                    { 106, 260m, "Vitamin B9", "vitaminB9", 14, "ug", "ManualFallback" },
                    { 107, 3m, "Vitamin B12", "vitaminB12", 14, "ug", "ManualFallback" },
                    { 108, 80m, "Vitamin C", "vitaminC", 14, "mg", "ManualFallback" },
                    { 109, 10m, "Vitamin D", "vitaminD", 14, "ug", "ManualFallback" },
                    { 110, 11m, "Vitamin E", "vitaminE", 14, "mg", "ManualFallback" },
                    { 111, 50m, "Vitamin K", "vitaminK", 14, "ug", "ManualFallback" },
                    { 112, 330m, "Choline", "choline", 14, "mg", "ManualFallback" },
                    { 113, 750m, "Vitamin A", "vitaminA", 15, "ug", "ManualFallback" },
                    { 114, 320m, "Vitamin B9", "vitaminB9", 15, "ug", "ManualFallback" },
                    { 115, 4m, "Vitamin B12", "vitaminB12", 15, "ug", "ManualFallback" },
                    { 116, 105m, "Vitamin C", "vitaminC", 15, "mg", "ManualFallback" },
                    { 117, 10m, "Vitamin D", "vitaminD", 15, "ug", "ManualFallback" },
                    { 118, 12m, "Vitamin E", "vitaminE", 15, "mg", "ManualFallback" },
                    { 119, 65m, "Vitamin K", "vitaminK", 15, "ug", "ManualFallback" },
                    { 120, 400m, "Choline", "choline", 15, "mg", "ManualFallback" },
                    { 121, 800m, "Vitamin A", "vitaminA", 16, "ug", "ManualFallback" },
                    { 122, 330m, "Vitamin B9", "vitaminB9", 16, "ug", "ManualFallback" },
                    { 123, 4m, "Vitamin B12", "vitaminB12", 16, "ug", "ManualFallback" },
                    { 124, 110m, "Vitamin C", "vitaminC", 16, "mg", "ManualFallback" },
                    { 125, 10m, "Vitamin D", "vitaminD", 16, "ug", "ManualFallback" },
                    { 126, 11m, "Vitamin E", "vitaminE", 16, "mg", "ManualFallback" },
                    { 127, 75m, "Vitamin K", "vitaminK", 16, "ug", "ManualFallback" },
                    { 128, 400m, "Choline", "choline", 16, "mg", "ManualFallback" },
                    { 129, 800m, "Vitamin A", "vitaminA", 17, "ug", "ManualFallback" },
                    { 130, 330m, "Vitamin B9", "vitaminB9", 17, "ug", "ManualFallback" },
                    { 131, 4m, "Vitamin B12", "vitaminB12", 17, "ug", "ManualFallback" },
                    { 132, 110m, "Vitamin C", "vitaminC", 17, "mg", "ManualFallback" },
                    { 133, 10m, "Vitamin D", "vitaminD", 17, "ug", "ManualFallback" },
                    { 134, 11m, "Vitamin E", "vitaminE", 17, "mg", "ManualFallback" },
                    { 135, 75m, "Vitamin K", "vitaminK", 17, "ug", "ManualFallback" },
                    { 136, 400m, "Choline", "choline", 17, "mg", "ManualFallback" },
                    { 137, 800m, "Vitamin A", "vitaminA", 18, "ug", "ManualFallback" },
                    { 138, 330m, "Vitamin B9", "vitaminB9", 18, "ug", "ManualFallback" },
                    { 139, 4m, "Vitamin B12", "vitaminB12", 18, "ug", "ManualFallback" },
                    { 140, 110m, "Vitamin C", "vitaminC", 18, "mg", "ManualFallback" },
                    { 141, 10m, "Vitamin D", "vitaminD", 18, "ug", "ManualFallback" },
                    { 142, 11m, "Vitamin E", "vitaminE", 18, "mg", "ManualFallback" },
                    { 143, 70m, "Vitamin K", "vitaminK", 18, "ug", "ManualFallback" },
                    { 144, 400m, "Choline", "choline", 18, "mg", "ManualFallback" },
                    { 145, 750m, "Vitamin A", "vitaminA", 19, "ug", "ManualFallback" },
                    { 146, 330m, "Vitamin B9", "vitaminB9", 19, "ug", "ManualFallback" },
                    { 147, 4m, "Vitamin B12", "vitaminB12", 19, "ug", "ManualFallback" },
                    { 148, 110m, "Vitamin C", "vitaminC", 19, "mg", "ManualFallback" },
                    { 149, 20m, "Vitamin D", "vitaminD", 19, "ug", "ManualFallback" },
                    { 150, 11m, "Vitamin E", "vitaminE", 19, "mg", "ManualFallback" },
                    { 151, 70m, "Vitamin K", "vitaminK", 19, "ug", "ManualFallback" },
                    { 152, 400m, "Choline", "choline", 19, "mg", "ManualFallback" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 50);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 51);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 52);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 53);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 54);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 55);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 56);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 57);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 58);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 59);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 60);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 61);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 62);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 63);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 64);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 65);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 66);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 67);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 68);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 69);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 70);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 71);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 72);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 73);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 74);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 75);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 76);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 77);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 78);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 79);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 80);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 81);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 82);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 83);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 84);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 85);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 86);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 87);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 88);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 89);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 90);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 91);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 92);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 93);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 94);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 95);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 96);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 97);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 98);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 99);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 100);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 101);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 102);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 103);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 104);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 105);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 106);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 107);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 108);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 109);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 110);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 111);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 112);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 113);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 114);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 115);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 116);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 117);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 118);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 119);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 120);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 121);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 122);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 123);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 124);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 125);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 126);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 127);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 128);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 129);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 130);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 131);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 132);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 133);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 134);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 135);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 136);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 137);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 138);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 139);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 140);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 141);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 142);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 143);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 144);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 145);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 146);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 147);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 148);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 149);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 150);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 151);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 152);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 19);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 1,
                columns: new[] { "Gender", "Label", "MaxAge", "MinAge", "ProfileId" },
                values: new object[] { "Female", "Female 18-50", 50, 18, "female-18-50" });

            migrationBuilder.UpdateData(
                table: "NutritionReferenceProfiles",
                keyColumn: "NutritionReferenceProfileId",
                keyValue: 2,
                columns: new[] { "Gender", "Label", "MaxAge", "MinAge", "ProfileId" },
                values: new object[] { "Male", "Male 18-50", 50, 18, "male-18-50" });

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 1,
                column: "DailyAmount",
                value: 700m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 2,
                column: "DailyAmount",
                value: 330m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 3,
                column: "DailyAmount",
                value: 4m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 4,
                column: "DailyAmount",
                value: 95m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 6,
                column: "DailyAmount",
                value: 10m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 7,
                column: "DailyAmount",
                value: 65m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 8,
                column: "DailyAmount",
                value: 400m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 9,
                column: "DailyAmount",
                value: 800m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 10,
                column: "DailyAmount",
                value: 330m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 11,
                column: "DailyAmount",
                value: 4m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 12,
                column: "DailyAmount",
                value: 110m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 14,
                column: "DailyAmount",
                value: 11m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 15,
                column: "DailyAmount",
                value: 75m);

            migrationBuilder.UpdateData(
                table: "NutritionReferenceValues",
                keyColumn: "NutritionReferenceValueId",
                keyValue: 16,
                column: "DailyAmount",
                value: 400m);
        }
    }
}
