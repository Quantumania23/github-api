// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');
gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username 
    let gitHubUsername = usernameInput.value;
    requestUserRepos(gitHubUsername)
        .then(response => response.json())
        .then(data => {
            for (let i in data) {
                if (data.message === "Not Found") {
                    let ul = document.getElementById('userRepos');
                    let li = document.createElement('li');
                    li.classList.add('list-group-item')
                    li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                } else {

                    let ul = document.getElementById('userRepos');
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})
function requestUserRepos(username) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}