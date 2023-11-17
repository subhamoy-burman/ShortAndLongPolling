document.getElementById('myButton').addEventListener('click', function() {
    //alert('Button clicked!');
    fetchData();
});

document.getElementById('btnLongPoll').addEventListener('click', function() {
    //alert('Button clicked!');
    clearInterval(intervalId);

    fetchLongPollData();
});

var intervalId = setInterval(fetchData, 3000);


// Function to fetch data from your endpoint
function fetchData() {
    fetch('https://localhost:7136/api/poll',  { mode: 'cors' })
        .then(response => response.text())
        .then(data => {
            // Create a new paragraph element
            let p = document.createElement('p');
            // Set the text of the paragraph to the response data
            p.textContent = data;
            // Append the paragraph to the body of the document
            document.body.appendChild(p);
        })
        .catch(error => console.error('Error:', error));
}

// Function to fetch data from your endpoint using long polling
function fetchLongPollData() {
    fetch('https://localhost:7136/api/poll/longpoll', { mode: 'cors' })
        .then(response => {
            if (response.status === 202) {
                // If the status is 202 (Accepted), the server is still processing the request
                // and we should try again after a delay
                setTimeout(fetchLongPollData, 5000); // Try again after 5 seconds
            } else if (response.status === 200) {
                // If the status is 200 (OK), the server has finished processing the request
                // and we can get the response data
                return response.text();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(data => {
            if (data) {
                // Create a new paragraph element
                let p = document.createElement('p');
                // Set the text of the paragraph to the response data
                p.textContent = data;
                // Append the paragraph to the body of the document
                document.body.appendChild(p);
            }
        })
        .catch(error => console.error('Error:', error));
}


// Call fetchData every 3 seconds
//setInterval(fetchData, 3000);
