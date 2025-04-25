$(document).ready(function () {
    loadTasks();

    $.ajax({
        url: '/api/tasks',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            title: $('#title').val(),
            description: $('#description').val(),
            dueDate: new Date($('#dueDate').val()).toISOString(), 
            status: $('#status').val() 
        }),
        success: function () {
            loadTasks();  
        },
        error: function (err) {
            console.log("Error:", err);
            if (err.responseJSON) {
                console.log("Validation Errors:", err.responseJSON);
            }
            alert("Failed to add task.");
        }
    });
    

    $('#edit-task-form').submit(function (e) {
        e.preventDefault();
        var updatedTask = {
            id: $('#edit-task-id').val(),
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            dueDate: $('#edit-dueDate').val(),
            status: $('#edit-status').val()
        };

        $.ajax({
            url: '/api/tasks/' + updatedTask.id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedTask),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            success: function () {
                loadTasks();
                $('#edit-task-form-container').hide();  
            },
            error: function () {
                alert("Failed to update task.");
            }
        });
    });

    $(document).on('click', '.delete-task', function () {
        var taskId = $(this).data('id');
        $('#delete-confirmation').show();
        $('#confirm-delete').click(function () {
            deleteTask(taskId);
        });
        $('#cancel-delete').click(function () {
            $('#delete-confirmation').hide();
        });
    });

    // Load all tasks
    function loadTasks() {
        $.ajax({
            url: '/api/tasks',
            type: 'GET',
            success: function (tasks) {
                $('#task-list tbody').empty();
                tasks.forEach(function (task) {
                    $('#task-list tbody').append(`
                        <tr>
                            <td>${task.title}</td>
                            <td>${task.description}</td>
                            <td>${task.dueDate}</td>
                            <td>${task.status}</td>
                            <td>
                                <button class="btn btn-warning edit-task" data-id="${task.id}">Edit</button>
                                <button class="btn btn-danger delete-task" data-id="${task.id}">Delete</button>
                            </td>
                        </tr>
                    `);
                });

                $('.edit-task').click(function () {
                    var taskId = $(this).data('id');
                    editTask(taskId);
                });
            },
            error: function () {
                alert("Failed to load tasks.");
            }
        });
    }

    function editTask(taskId) {
        $.ajax({
            url: '/api/tasks/' + taskId,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            success: function (task) {
                $('#edit-task-id').val(task.id);
                $('#edit-title').val(task.title);
                $('#edit-description').val(task.description);
                $('#edit-dueDate').val(task.dueDate);
                $('#edit-status').val(task.status);
            },
            error: function () {
                alert("Failed to load task.");
            }
        });
    }

    function deleteTask(taskId) {
        $.ajax({
            url: '/api/tasks/' + taskId,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            success: function () {
                loadTasks();
                $('#delete-confirmation').hide();
            },
            error: function () {
                alert("Failed to delete task.");
            }
        });
    }
});
