using System.ComponentModel.DataAnnotations;

namespace Task_Management_System.Models
{
    public enum TaskStatusEnum
    {
        Pending,
        InProgress,
        Completed
    }

    public class TaskEntity
    {
        public int TaskId { get; set; }
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
