using System.ComponentModel.DataAnnotations;
using cv_backend.Interfaces;

namespace cv_backend.Models;

public class Skill : ISkill
{
    [Key]
    public int Id { get; set; }
    public string Skill_Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}