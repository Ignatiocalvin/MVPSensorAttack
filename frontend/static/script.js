$(document).ready(function() {
    // Handle chat form submission
    $('#chat-form').submit(function(e) {
        e.preventDefault();
        var message = $('#chat-input').val().trim();
        if (message === '') return; // Ignore empty messages

        $('#chat-messages').append('<p><strong>You:</strong> ' + message + '</p>');
        $('#chat-input').val('');
        $('#chat-messages').append('<p id="loading"><em>Bot is thinking...</em></p>');

        $.ajax({
            url: '/chat',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({message: message}),
            success: function(response) {
                $('#loading').remove();
                $('#chat-messages').append('<p><strong>Bot:</strong> ' + response.response + '</p>');
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            },
            error: function() {
                $('#loading').remove();
                $('#chat-messages').append('<p><strong>Error:</strong> Failed to get response from server.</p>');
            }
        });
    });

    // Handle data point analysis form submission
    $('#input-form').submit(function(e) {
        e.preventDefault();
        var firstValue = $('#first-input').val();
        var secondValue = $('#second-input').val();
        $('#llm-prompter p').text('Analyzing...');

        $.ajax({
            url: '/analyze',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({first_value: firstValue, second_value: secondValue}),
            success: function(response) {
                $('#llm-prompter p').text(response.response);
            },
            error: function() {
                $('#llm-prompter p').text('Error: Failed to get analysis from server.');
            }
        });
    });

    // Handle task submission
    $('#submit-task-button').click(function() {
        var taskContent = $('#task-input').val().trim();
        if (taskContent === '') return; // Ignore empty input

        $('#task-response-content').text('Submitting task...');

        fetch('/submit_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({input1: taskContent})
        })
        .then(response => response.json())
        .then(data => {
            $('#task-response-content').text(data.response || 'Task response received.');
        })
        .catch(() => {
            $('#task-response-content').text('Error: Failed to get response from server.');
        });
    });
});
