using System.ComponentModel.DataAnnotations;
using cv_backend.Interfaces;

namespace cv_backend.Models;

public class Tenure : ITenure
{
    [Key]
    public int Id { get; set; }
    public string Company_Name { get; set; } = string.Empty;
    public string Work_Title { get; set; } = string.Empty;
    public string Start_Date { get; set; } = string.Empty;
    public string End_Date { get; set; } = string.Empty;
}