### 14. Fetch and Display API Data with Loading and Error Handling 
**Question:** 
Create a function that fetches user data from the GitHub API and displays it on the page. The function should handle loading states and errors gracefully. 
**Example:** 
```javascript 
async function fetchGitHubUser(username) { 
 const container = document.getElementById('user-container'); 
 container.innerHTML = 'Loading...'; 
 try { 
 const response = await fetch(`https://api.github.com/users/${username}`);  if (!response.ok) throw new Error('User not found'); 
  
 const user = await response.json(); 
 container.innerHTML = ` 
 <h2>${user.name}</h2> 
 <img src="${user.avatar_url}" alt="${user.name}" width="100"> 
 <p>${user.bio}</p> 
 <p>Followers: ${user.followers}</p> 
 `; 
 } catch (error) { 
 container.innerHTML = `Error: ${error.message}`; 
 } 
} 
document.getElementById('fetch-user-button').onclick = () => { 
 const username = document.getElementById('username-input').value; 
 fetchGitHubUser(username); 
}; 
// HTML 
// <input type="text" id="username-input" placeholder="GitHub username"> 
// <button id="fetch-user-button">Fetch User</button> 
// <div id="user-container"></div> 
``` 
These questions test various advanced JavaScript concepts, including closures, asynchronous programming, DOM manipulation, event handling, and dynamic content generation, providing a comprehensive assessment of a senior JavaScript developer's skills. 
