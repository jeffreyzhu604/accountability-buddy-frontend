export const DocumentationPage = () => {
    return (
        <div className="profile-content">
            <h1>Documentation</h1>

            <h2>Note: You should have GitHub freely available on your terminal</h2>
            <h2>Note: This is for Linux/MacOS</h2>

            <p>Create a directory for main project and change into it</p>
            <code>mkdir accountability-buddy && cd accountability-buddy</code>

            <p>Clone repository from GitHub for the frontend</p>
            <code>git clone https://www.github.com/jeffreyzhu604/accountability-buddy-frontend</code>

            <p>Clone repository from GitHub for the backend</p>
            <code>git clone https://www.github.com/jeffreyzhu604/accountability-buddy-backend</code>

            <p>Navigate the directory for the frontend</p>
            <code>cd accountability-buddy-frontend</code>

            <p>Open a second terminal window and navigate to the directory for the backend</p>
            <code>cd accountability-buddy-backend</code>

            <p>For both terminal windows, install dependencies</p>
            <code>npm install</code>

            <p>To start the frontend client, run</p>
            <code>npm start</code>

            <p>To start the backend server, run</p>
            <code>npm run devstart</code>

            <h3>Voila! Hope you enjoy this!</h3>

            <h1>Usage:</h1>

            <p>Users can register (Password must be 8 characters) and login to the site</p>
            <p>Users can search for other users in the search bar in the home page</p>
            <p>Users can create agreements with other users (must be a friend and use the username)</p>
            <p>Delete and edit for agreements currently doesn't work</p>
            <p>Searching for agreements in currently doesn't work</p>
        </div>
    );
};