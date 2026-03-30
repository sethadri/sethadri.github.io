const getGitHubProfile = async () => {
    try {
        const response = await fetch('https://api.github.com/users/sethadri');
        const data = await response.json();
        
        document.querySelector('#username').textContent = `Username: ${data.login}`;
        document.querySelector('#repos').textContent = `Public Repos: ${data.public_repos}`;
        const date = new Date(data.created_at).toLocaleDateString('en-GB');
        document.querySelector('#created').textContent = `Account created: ${date}`;
        
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
    }
};

getGitHubProfile();
