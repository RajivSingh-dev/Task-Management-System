using System.ComponentModel.DataAnnotations;
using Task_Management_System.Models;

namespace Task_Management_System.DTOs
{
    public class TaskCreateDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public TaskStatusEnum Status { get; set; }
    }

}
