33. Task Automation with Scripting
Description: Develop a task automation tool where users can write and run simple scripts to automate repetitive tasks. Skills Tested: Scripting, data handling, event handling. Features:

Provide a text area for writing JavaScript scripts.
Allow users to run scripts to perform tasks (e.g., data manipulation, calculations).
Save and load scripts for reuse.
Display output and error messages. """
Sure, here's a testable code snippet for a task automation tool in JavaScript that includes some intentional mistakes. This code can be used on coding platforms like HackerRank or Coderbyte. The mistakes are added to test the interviewee's understanding of scripting, data handling, and event handling.


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Automation Tool</title>
</head>
<body>
    <h1>Task Automation Tool</h1>
    <textarea id="scriptArea" rows="10" cols="50" placeholder="Write your script here..."></textarea>
    <br>
    <button id="runScript">Run Script</button>
    <button id="saveScript">Save Script</button>
    <button id="loadScript">Load Script</button>
    <h3>Output:</h3>
    <pre id="outputArea"></pre>
    <h3>Error Messages:</h3>
    <pre id="errorArea"></pre>


    <script>
        document.getElementById('runScript').addEventListener('click', function() {
            let scriptContent = document.getElementById('scriptArea').value;
            try {
                let result = eval(scriptContent);
                document.getElementById('outputArea').innerText = result;
            } catch (error) {
                document.getElementById('errorArea').innerText = error.message;
            }
        });


        document.getElementById('saveScript').addEventListener('click', function() {
            let scriptContent = document.getElementById('scriptArea').value;
            localStorage.setItem('savedScript', scriptContent);
            alert('Script saved!');
        });


        document.getElementById('loadScript').addEventListener('click', function() {
            let savedScript = localStorage.getItem('savedScript');
            document.getElementById('scriptArea').value = savedScript;
            alert('Script loaded!');
        });
    </script>
</body>
</html>
```

Intentional Mistakes:
Data Handling Issue: The eval function is used directly without any sanitization, which poses a security risk. This is intentional to see if the interviewee can identify and mitigate potential security vulnerabilities.
Error Handling Issue: The error handling in the runScript function only captures the error message but does not clear previous error messages when a new script runs successfully.
Event Handling Issue: The loadScript function does not handle the case when there is no script saved in localStorage.
Interviewee Tasks:
Fix the Security Issue: Replace eval with a safer alternative or sanitize the input script.
Improve Error Handling: Ensure that the error area is cleared when a new script runs successfully.
Handle Missing Data: Modify the loadScript function to handle cases where no script is saved in localStorage.
These tasks will help test the interviewee's skills in scripting, data handling, and event handling.
IPrompt23 = f""" Create a testable code that creates the following application and can be used on coding platforms like hackerrank or coderbyte. Introduce some mistakes to it so that you can test the interviewee with the main concepts mentioned:-
