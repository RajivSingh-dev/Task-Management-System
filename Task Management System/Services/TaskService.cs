using Task_Management_System.DTOs;
using Task_Management_System.Models;
using Task_Management_System.Repository;
using Models = Task_Management_System.Models;

namespace Task_Management_System.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TaskEntity>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<TaskEntity?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<TaskEntity> CreateAsync(TaskCreateDto dto)
        {
            var task = new TaskEntity
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                Status = dto.Status
            };

            return await _repository.AddAsync(task);
        }

        public async Task<TaskEntity?> UpdateAsync(int id, TaskUpdateDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return null;

            existing.Title = dto.Title;
            existing.Description = dto.Description;
            existing.DueDate = dto.DueDate;
            existing.Status = dto.Status;

            return await _repository.UpdateAsync(existing);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }
    }


}
