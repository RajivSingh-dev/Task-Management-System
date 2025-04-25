using Task_Management_System.DTOs;
using Task_Management_System.Models;

namespace Task_Management_System.Services
{
    public interface ITaskService
    {
        Task<List<TaskEntity>> GetAllAsync();
        Task<TaskEntity?> GetByIdAsync(int id);
        Task<TaskEntity> CreateAsync(TaskCreateDto dto);
        Task<TaskEntity?> UpdateAsync(int id, TaskUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
