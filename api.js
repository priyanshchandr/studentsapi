const cors = require('cors')
const express = require('express');
const app = express();

app.use(cors())
const database = {
    "students": [
        {
            "name": "User 1",
            "roll": "200",
            "courses_enrolled": ["c1", "c2", "c3"],
            "total_attendance": 100
        },
        {
            "name": "User 2",
            "roll": "201",
            "courses_enrolled": ["c2", "c3"],
            "total_attendance": 50
        },
        {
            "name": "User 3",
            "roll": "202",
            "courses_enrolled": ["c1", "c3"],
            "total_attendance": 75
        },
        {
            "name": "User 4",
            "roll": "203",
            "courses_enrolled": [],
            "total_attendance": 20
        },
        {
            "name": "User 5",
            "roll": "204",
            "courses_enrolled": ["c3"],
            "total_attendance": 30
        }
    ]
};

app.get('./get_students', (req, res) => {
    const students = database.students;
    const formattedResponse = JSON.stringify(students, null, 2);
    res.setHeader('Content-Type', 'application/json')
    res.send(formattedResponse)
});

app.get('/enrolled_students', (req, res) => {
    const enrolledStudents = database.students.filter(student => student.courses_enrolled.length > 0);
    const enrolledStudentNames = enrolledStudents.map(student => student.name);
    const formattedResponse = JSON.stringify(enrolledStudentNames, null, 2);
    res.setHeader('Content-Type', 'application/json')
    res.send(formattedResponse)
});

app.get('/gg_group', (req, res) => {
    const lowAttendanceStudents = database.students.filter(student => student.total_attendance <= 30);
    const lowAttendanceDetails = lowAttendanceStudents.map(student => ({
        name: student.name,
        roll: student.roll
    }));
    const formattedResponse = JSON.stringify(lowAttendanceDetails, null, 2);
    res.setHeader('Content-Type', 'application/json')
    res.send(formattedResponse)
});

app.get('/course/:courseCode', (req, res) => {
    const courseCode = req.params.courseCode;
    const studentsInCourse = database.students.filter(student => student.courses_enrolled.includes(courseCode));
    const studentRollNumbers = studentsInCourse.map(student => student.roll);
    const formattedResponse = JSON.stringify(studentRollNumbers, null, 2);
    res.setHeader('Content-Type', 'application/json')
    res.send(formattedResponse)
});

app.get('/student/:roll', (req, res) => {
    const roll = req.params.roll;
    const studentDetails = database.students.find(student => student.roll === roll);
    if (studentDetails) {
        const formattedResponse = JSON.stringify(studentDetails, null, 2);
        res.setHeader('Content-Type', 'application/json')
        res.send(formattedResponse)
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}/`)
});