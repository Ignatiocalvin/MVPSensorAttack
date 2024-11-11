$(document).ready(function() {
    // Handle chat form submission
    $('#chat-form').submit(function(e) {
        e.preventDefault();
        var message = $('#chat-input').val().trim();
        if (message === '') return; // Ignore empty messages

        // Display user message
        $('#chat-messages').append('<p><strong>You:</strong> ' + message + '</p>');
        $('#chat-input').val(''); // Clear chat input

        // Show loading indicator
        $('#chat-messages').append('<p id="loading"><em>Bot is thinking...</em></p>');

        // Send message to server
        $.ajax({
            url: '/chat',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({message: message}),
            success: function(response) {
                $('#loading').remove(); // Remove loading indicator
                if (response.error) {
                    $('#chat-messages').append('<p><strong>Error:</strong> ' + response.error + '</p>');
                } else {
                    $('#chat-messages').append('<p><strong>Bot:</strong> ' + response.response + '</p>');
                }
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#loading').remove(); // Remove loading indicator
                $('#chat-messages').append('<p><strong>Error:</strong> Failed to get response from server.</p>');
            }
        });
    });

    // Handle input form submission for data points
    $('#input-form').submit(function(e) {
        e.preventDefault();
        var firstValue = $('#first-input').val();
        var secondValue = $('#second-input').val();

        // Show loading indicator
        $('#llm-prompter p').text('Analyzing...');

        $.ajax({
            url: '/analyze',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({first_value: firstValue, second_value: secondValue}),
            success: function(response) {
                if (response.error) {
                    $('#llm-prompter p').text('Error: ' + response.error);
                } else {
                    $('#llm-prompter p').text(response.response);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#llm-prompter p').text('Error: Failed to get analysis from server.');
            }
        });
    });
});
