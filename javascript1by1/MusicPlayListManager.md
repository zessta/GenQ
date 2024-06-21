19. Music Playlist Manager
Description: Develop a music playlist manager where users can create, edit, and play playlists. Skills Tested: Audio API, DOM manipulation, data handling. Features:

Add songs to playlists from a local library or an API.
Play, pause, and skip songs in the playlist.
Display song details and playlist duration.
Persist playlist data in local storage. """
Certainly! Below is a testable code snippet that introduces a few intentional mistakes to challenge the interviewee's understanding of the main concepts such as DOM manipulation, data handling, and working with local storage. This code can be used on coding platforms like HackerRank or Coderbyte.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Playlist Manager</title>
</head>
<body>
    <h1>Music Playlist Manager</h1>
    <div>
        <input type="text" id="songInput" placeholder="Add a song">
        <button onclick="addSong()">Add Song</button>
    </div>
    <div>
        <h2>Playlist</h2>
        <ul id="playlist"></ul>
    </div>
    <div>
        <button onclick="playSong()">Play</button>
        <button onclick="pauseSong()">Pause</button>
        <button onclick="skipSong()">Skip</button>
    </div>
    <div>
        <h3>Now Playing:</h3>
        <p id="nowPlaying">None</p>
        <h3>Playlist Duration:</h3>
        <p id="playlistDuration">0:00</p>
    </div>
    <script>
        let playlist = [];
        let currentSongIndex = 0;
        let isPlaying = false;
        let audio = new Audio();


        function addSong() {
            let songInput = document.getElementById('songInput').value;
            if (songInput) {
                playlist.push(songInput);
                updatePlaylistUI();
                document.getElementById('songInput').value = ''; // Clear input
                savePlaylist();
            }
        }


        function updatePlaylistUI() {
            let playlistElement = document.getElementById('playlist');
            playlistElement.innerHTML = '';
            playlist.forEach((song, index) => {
                let li = document.createElement('li');
                li.textContent = song;
                playlistElement.appendChild(li);
            });
            updatePlaylistDuration();
        }


        function playSong() {
            if (playlist.length > 0 && !isPlaying) {
                audio.src = playlist[currentSongIndex];
                audio.play();
                isPlaying = true;
                document.getElementById('nowPlaying').textContent = playlist[currentSongIndex];
            }
        }


        function pauseSong() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            }
        }


        function skipSong() {
            if (playlist.length > 0) {
                currentSongIndex = (currentSongIndex + 1) % playlist.length;
                playSong();
            }
        }


        function updatePlaylistDuration() {
            let totalDuration = playlist.length * 3; // Assume each song is 3 minutes
            let minutes = Math.floor(totalDuration / 60);
            let seconds = totalDuration % 60;
            document.getElementById('playlistDuration').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }


        function savePlaylist() {
            localStorage.setItem('playlist', JSON.stringify(playlist));
        }


        function loadPlaylist() {
            let savedPlaylist = localStorage.getItem('playlist');
            if (savedPlaylist) {
                playlist = JSON.parse(savedPlaylist);
                updatePlaylistUI();
            }
        }


        // Load playlist on page load
        window.onload = loadPlaylist;
    </script>
</body>
</html>
Intentional Mistakes and Points to Test:
Audio Source Handling: The audio.src is set directly to the song name, which is not a valid URL. The interviewee should recognize that they need to handle actual audio file URLs or use a mock API.

Playlist Duration Calculation: The duration is hardcoded to 3 minutes per song. The interviewee should ideally recognize the need to handle actual song duration data.

Local Storage Loading Timing: The loadPlaylist function is called on window.onload, which might not be the best timing for all scenarios. The interviewee should consider if this is the best approach or if there are better event listeners to use.

UI Update after Skipping Songs: The nowPlaying element is not updated when skipping songs. The interviewee should notice that the playSong function needs to update the nowPlaying element after skipping.

Error Handling: The code lacks error handling for cases where the audio file might fail to load or play. The interviewee should add error handling for robustness.

This code provides a good starting point and includes enough complexity to test an interviewee's understanding and ability to debug and improve the application.
