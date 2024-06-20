9. Interactive Learning Platform
Description: Create an interactive learning platform with courses and quizzes. Skills Tested: Data management, DOM manipulation, event handling. Features:

Display a list of courses and lessons.
Include quizzes at the end of each lesson.
Track user progress through the courses.
Provide feedback and scores for quizzes. """ Below is a code snippet for an interactive learning platform application. The code is intentionally introduced with some mistakes to test the interviewee's understanding of data management, DOM manipulation, and event handling.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Learning Platform</title>
    <style>
        .course {
            margin-bottom: 20px;
        }
        .lesson, .quiz {
            margin-left: 20px;
            display: none;
        }
    </style>
</head>
<body>
    <h1>Interactive Learning Platform</h1>
    <div id="courses-container"></div>
    <script>
        const courses = [
            {
                title: "Course 1",
                lessons: [
                    {
                        title: "Lesson 1",
                        content: "Content for Lesson 1",
                        quiz: {
                            question: "What is 2 + 2?",
                            options: ["3", "4", "5"],
                            answer: "4"
                        }
                    },
                    {
                        title: "Lesson 2",
                        content: "Content for Lesson 2",
                        quiz: {
                            question: "What is 3 + 3?",
                            options: ["5", "6", "7"],
                            answer: "6"
                        }
                    }
                ]
            },
            {
                title: "Course 2",
                lessons: [
                    {
                        title: "Lesson 1",
                        content: "Content for Lesson 1",
                        quiz: {
                            question: "What is 1 + 1?",
                            options: ["1", "2", "3"],
                            answer: "2"
                        }
                    }
                ]
            }
        ];


        const coursesContainer = document.getElementById('courses-container');


        courses.forEach((course, courseIndex) => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';
            const courseTitle = document.createElement('h2');
            courseTitle.textContent = course.title;
            courseElement.appendChild(courseTitle);


            course.lessons.forEach((lesson, lessonIndex) => {
                const lessonElement = document.createElement('div');
                lessonElement.className = 'lesson';
                const lessonTitle = document.createElement('h3');
                lessonTitle.textContent = lesson.title;
                lessonElement.appendChild(lessonTitle);


                const lessonContent = document.createElement('p');
                lessonContent.textContent = lesson.content;
                lessonElement.appendChild(lessonContent);


                const quizElement = document.createElement('div');
                quizElement.className = 'quiz';
                const quizQuestion = document.createElement('p');
                quizQuestion.textContent = lesson.quiz.question;
                quizElement.appendChild(quizQuestion);


                lesson.quiz.options.forEach(option => {
                    const optionElement = document.createElement('button');
                    optionElement.textContent = option;
                    optionElement.addEventListener('click', () => {
                        if (option === lesson.quiz.answer) {
                            alert('Correct!');
                        } else {
                            alert('Incorrect!');
                        }
                    });
                    quizElement.appendChild(optionElement);
                });


                lessonElement.appendChild(quizElement);
                courseElement.appendChild(lessonElement);
            });


            coursesContainer.appendChild(courseElement);
        });


        const lessons = document.querySelectorAll('.lesson');
        lessons.forEach(lesson => {
            lesson.style.display = 'block'; // This mistake makes all lessons visible immediately
        });


        const quizzes = document.querySelectorAll('.quiz');
        quizzes.forEach(quiz => {
            quiz.style.display = 'none'; // This mistake hides all quizzes initially
        });
    </script>
</body>
</html>
```


Mistakes introduced:

All lessons are displayed immediately because of the lesson.style.display = 'block'; line.
All quizzes are hidden initially because of the quiz.style.display = 'none'; line, and there's no logic to show the quizzes after the lessons are completed.
No mechanism to track user progress through the courses.
The feedback mechanism is very basic and only uses alert boxes.
These mistakes will help to test the interviewee's ability to identify and correct issues related to data management, DOM manipulation, and event handling.
