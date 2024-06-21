16. File Uploader with Preview
Description: Develop a file uploader that allows users to upload files and preview them before submission. Skills Tested: File handling, DOM manipulation, event handling. Features:

Support uploading of multiple files.
Preview images and videos before upload.
Display file names and sizes for other file types.
Provide a button to remove selected files from the list. """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Uploader with Preview</title>
    <style>
        .file-preview {
            margin-top: 20px;
        }
        .file-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .file-item img, .file-item video {
            max-width: 100px;
            margin-right: 10px;
        }
        .file-item button {
            margin-left: auto;
        }
    </style>
</head>
<body>
    <h1>File Uploader with Preview</h1>
    <input type="file" id="fileInput" multiple>
    <div class="file-preview" id="filePreview"></div>


    <script>
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const files = event.target.files;
            const previewContainer = document.getElementById('filePreview');


            // Clear previous previews
            previewContainer.innerHTML = '';


            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileItem = document.createElement('div');
                fileItem.classList.add('file-item');


                const fileName = document.createElement('p');
                fileName.textContent = file.name;
                fileItem.appendChild(fileName);


                const fileSize = document.createElement('p');
                fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
                fileItem.appendChild(fileSize);


                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    fileItem.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    fileItem.appendChild(video);
                }


                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', function() {
                    previewContainer.removeChild(fileItem);
                });
                fileItem.appendChild(removeButton);


                previewContainer.appendChild(fileItem);
            }
        });
    </script>
</body>
</html>
Intentional Mistakes:
File Size Calculation: The file size is displayed in KB but the code (file.size / 1024).toFixed(2) + ' KB' is correct. To introduce a mistake, you can change the calculation to (file.size / 1000).toFixed(2) + ' KB' which is incorrect.
Event Listener: The event listener for removing files is correct but let's introduce an error by changing previewContainer.removeChild(fileItem); to fileItem.remove(); which might not be supported in all browsers.
Video Preview: The video preview code is correct but let's introduce an error by changing video.controls = true; to video.controls = false; so the video controls won't appear.
File Input ID: The file input ID is fileInput but let's introduce an error by changing it to fileUploader in the JavaScript code.
Here's the modified code with intentional mistakes:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Uploader with Preview</title>
    <style>
        .file-preview {
            margin-top: 20px;
        }
        .file-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .file-item img, .file-item video {
            max-width: 100px;
            margin-right: 10px;
        }
        .file-item button {
            margin-left: auto;
        }
    </style>
</head>
<body>
    <h1>File Uploader with Preview</h1>
    <input type="file" id="fileInput" multiple>
    <div class="file-preview" id="filePreview"></div>


    <script>
        document.getElementById('fileUploader').addEventListener('change', function(event) { // Mistake: ID should be 'fileInput'
            const files = event.target.files;
            const previewContainer = document.getElementById('filePreview');


            // Clear previous previews
            previewContainer.innerHTML = '';


            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileItem = document.createElement('div');
                fileItem.classList.add('file-item');


                const fileName = document.createElement('p');
                fileName.textContent = file.name;
                fileItem.appendChild(fileName);


                const fileSize = document.createElement('p');
                fileSize.textContent = (file.size / 1000).toFixed(2) + ' KB'; // Mistake: Should be 1024 to convert bytes to KB
                fileItem.appendChild(fileSize);


                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    fileItem.appendChild(img);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = false; // Mistake: Should be true to enable video controls
                    fileItem.appendChild(video);
                }


                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', function() {
                    fileItem.remove(); // Mistake: Should be previewContainer.removeChild(fileItem);
                });
                fileItem.appendChild(removeButton);


                previewContainer.appendChild(fileItem);
            }
        });
    </script>
</body>
</html>
Mistakes Summary:
Changed fileInput to fileUploader in the JavaScript code.
Changed (file.size / 1024).toFixed(2) + ' KB' to (file.size / 1000).toFixed(2) + ' KB'.
Changed video.controls = true; to video.controls = false;.
Changed previewContainer.removeChild(fileItem); to fileItem.remove();.
This code can be used to test the interviewee's ability to debug and correct the mistakes.
