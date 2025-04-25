$(document).ready(function () {
    $('#login-link').click(function () {
        $('#signup-section').toggle();
        $('#login-section').toggle();
        $(this).text($(this).text() == 'Login' ? 'Sign Up' : 'Login');
    });

    $('#signup-button').click(function () {
        var username = $('#signup-username').val();
        var email = $('#signup-email').val();
        var password = $('#signup-password').val();
        var baseUrl = "https://localhost:7225/";
        $.ajax({
            url: baseUrl + 'api/Auth/Register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (response) {
                if (response.success) {
                    $('#signup-section').hide();
                    $('#login-section').show();
                    $('#login-link').text('Sign Up');
                } else {
                    alert(response.message);
                }
            },
            error: function (xhr, status, errorThrown) {
                console.error("Status:", status);
                console.error("Error Thrown:", errorThrown);
                console.error("Response Text:", xhr.responseText);

                alert("An error occurred. Please check the console for details.");
            }
        });
    });

    $('#login-button').click(function () {
        var username = $('#login-username').val();
        var password = $('#login-password').val();

        $.ajax({
            url: 'https://localhost:7225/api/Auth/Login', // Ensure correct URL
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (response) {
                if (response.token) {
                    localStorage.setItem('jwt', response.token);
                    // Redirect to /Home/Tasks (MVC routing convention)
                    window.location.href = '/Home/Tasks';
                } else {
                    alert(response.message); // Display error message if any
                }
            },
            error: function (xhr, status, errorThrown) {
                alert("An error occurred. Please check the console for details.");
            }
        });
    });



});
