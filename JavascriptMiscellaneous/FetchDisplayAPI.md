### 8. Fetch and Display API Data 
**Question:** 
Create a function that fetches data from a public API (e.g., GitHub Users API) and displays it on the web page. The function should handle loading states and errors gracefully. 
**Requirements:** 
- Fetch data from a public API 
- Display the data 
- Handle loading states 
- Handle errors 
**Example:** 
```javascript 

async function fetchAndDisplayUser(username) { 
 const container = document.getElementById('user-container'); 
 container.innerHTML = 'Loading...'; 
 try { 
 const response = await fetch(`https://api.github.com/users/${username}`);  if (!response.ok) { 
 throw new Error('User not found'); 
 } 
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
 if (username) { 
 fetchAndDisplayUser(username); 
 } 
}; 
``` 
