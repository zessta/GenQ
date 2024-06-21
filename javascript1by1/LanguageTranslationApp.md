34. Language Translation App
Description: Build a language translation app using a translation API. Skills Tested: API interaction, DOM manipulation, event handling. Features:

Input text to be translated.
Select source and target languages.
Display translated text.
Support multiple translation services. """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Language Translation App</title>
</head>
<body>
    <h1>Language Translation App</h1>
    <div>
        <textarea id="inputText" placeholder="Enter text to translate"></textarea>
    </div>
    <div>
        <label for="sourceLang">Source Language:</label>
        <select id="sourceLang">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
        </select>
    </div>
    <div>
        <label for="targetLang">Target Language:</label>
        <select id="targetLang">
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="fr">French</option>
        </select>
    </div>
    <button id="translateBtn">Translate</button>
    <div>
        <h2>Translated Text:</h2>
        <p id="translatedText"></p>
    </div>


    <script>
        document.getElementById('translateBtn').addEventListener('click', function() {
            const inputText = document.getElementById('inputText').value;
            const sourceLang = document.getElementById('sourceLang').value;
            const targetLang = document.getElementById('targetLang').value;


            // Intentional mistake: Incorrect API endpoint
            const apiUrl = `https://libretranslate.de/translate`;


            fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({
                    q: inputText,
                    source: sourceLang,
                    target: targetLang,
                    format: "text"
                }),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => {
                // Intentional mistake: Incorrect property name
                document.getElementById('translatedText').innerText = data.translatedText;
            })
            .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
