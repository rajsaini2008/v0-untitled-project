-- Insert Centers
INSERT INTO "Center" ("id", "name", "code", "address", "city", "state", "pincode", "phone", "email", "isMainCenter", "createdAt", "updatedAt")
VALUES 
('center-1', 'Krishna Computers - Main Center', 'KC-MAIN', '123 Main Street, Near City Mall', 'Jaipur', 'Rajasthan', '302001', '9876543210', 'info@krishnacomputers.com', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('center-2', 'Krishna Computers - Vaishali Nagar', 'KC-VN', '456 Vaishali Nagar, Near Metro Station', 'Jaipur', 'Rajasthan', '302021', '9876543211', 'vaishali@krishnacomputers.com', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('center-3', 'Krishna Computers - Mansarovar', 'KC-MAN', '789 Mansarovar, Sector 9', 'Jaipur', 'Rajasthan', '302020', '9876543212', 'mansarovar@krishnacomputers.com', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('center-4', 'Krishna Computers - Ajmer', 'KC-AJM', '101 Civil Lines, Near Railway Station', 'Ajmer', 'Rajasthan', '305001', '9876543213', 'ajmer@krishnacomputers.com', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Update center relationships
UPDATE "Center" SET "parentId" = 'center-1' WHERE "code" IN ('KC-VN', 'KC-MAN', 'KC-AJM');

-- Insert Users
INSERT INTO "User" ("id", "name", "email", "hashedPassword", "role", "centerId", "createdAt", "updatedAt")
VALUES 
('user-1', 'Admin User', 'admin@krishnacomputers.com', '$2a$10$GmQzTXcl5Ae9E1LCnYrFZOQRYnSfLXUd9Aeyr1vO8YT1MnQlE5iva', 'ADMIN', 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user-2', 'Vaishali Center Admin', 'vaishali-admin@krishnacomputers.com', '$2a$10$GmQzTXcl5Ae9E1LCnYrFZOQRYnSfLXUd9Aeyr1vO8YT1MnQlE5iva', 'CENTER_ADMIN', 'center-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user-3', 'Mansarovar Center Admin', 'mansarovar-admin@krishnacomputers.com', '$2a$10$GmQzTXcl5Ae9E1LCnYrFZOQRYnSfLXUd9Aeyr1vO8YT1MnQlE5iva', 'CENTER_ADMIN', 'center-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user-4', 'Staff User 1', 'staff1@krishnacomputers.com', '$2a$10$GmQzTXcl5Ae9E1LCnYrFZOQRYnSfLXUd9Aeyr1vO8YT1MnQlE5iva', 'STAFF', 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user-5', 'Staff User 2', 'staff2@krishnacomputers.com', '$2a$10$GmQzTXcl5Ae9E1LCnYrFZOQRYnSfLXUd9Aeyr1vO8YT1MnQlE5iva', 'STAFF', 'center-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Courses
INSERT INTO "Course" ("id", "name", "code", "description", "duration", "fees", "isActive", "centerId", "createdAt", "updatedAt")
VALUES 
('course-1', 'Diploma in Computer Applications', 'DCA', 'Comprehensive course covering computer fundamentals, office applications, and programming basics.', 6, 12000, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('course-2', 'Course on Computer Concepts', 'CCC', 'Basic course covering computer fundamentals and office applications.', 3, 6000, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('course-3', 'Tally Prime with GST', 'TALLY', 'Comprehensive course on Tally accounting software with GST implementation.', 2, 5000, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('course-4', 'Advanced Excel & Data Analysis', 'EXCEL', 'Advanced Excel features, formulas, pivot tables, and data analysis techniques.', 2, 4500, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('course-5', 'Web Development', 'WEBDEV', 'HTML, CSS, JavaScript, and responsive web design.', 4, 8000, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('course-6', 'Digital Marketing', 'DIGMKT', 'SEO, social media marketing, email marketing, and digital advertising.', 3, 7500, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Subjects
INSERT INTO "Subject" ("id", "name", "code", "description", "courseId", "createdAt", "updatedAt")
VALUES 
-- DCA Subjects
('subject-1', 'Computer Fundamentals', 'DCA-CF', 'Introduction to computer systems, hardware, and software.', 'course-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-2', 'MS Office', 'DCA-MSO', 'Microsoft Office applications including Word, Excel, and PowerPoint.', 'course-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-3', 'Operating System', 'DCA-OS', 'Introduction to operating systems and their functions.', 'course-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-4', 'Internet & Web Design', 'DCA-WEB', 'Internet basics and introduction to web design using HTML and CSS.', 'course-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-5', 'Programming Concepts', 'DCA-PROG', 'Introduction to programming concepts and basic algorithms.', 'course-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- CCC Subjects
('subject-6', 'Computer Basics', 'CCC-CB', 'Introduction to computers and their components.', 'course-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-7', 'Office Applications', 'CCC-OA', 'Basic usage of MS Word, Excel, and PowerPoint.', 'course-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-8', 'Internet & Email', 'CCC-IE', 'Internet browsing and email communication.', 'course-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Tally Subjects
('subject-9', 'Accounting Basics', 'TALLY-AB', 'Introduction to accounting principles.', 'course-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-10', 'Tally Fundamentals', 'TALLY-TF', 'Basic operations in Tally software.', 'course-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('subject-11', 'GST in Tally', 'TALLY-GST', 'GST implementation and filing using Tally.', 'course-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Students
INSERT INTO "Student" ("id", "registrationNo", "name", "fatherName", "motherName", "dob", "gender", "address", "city", "state", "pincode", "phone", "email", "education", "centerId", "createdAt", "updatedAt")
VALUES 
('student-1', 'KC-2023-1001', 'Rahul Sharma', 'Ramesh Sharma', 'Sunita Sharma', '2000-05-15', 'MALE', '123 Shyam Nagar', 'Jaipur', 'Rajasthan', '302019', '9876543001', 'rahul.sharma@example.com', '12th Pass', 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('student-2', 'KC-2023-1002', 'Priya Singh', 'Rajendra Singh', 'Meena Singh', '2001-08-22', 'FEMALE', '456 Vaishali Nagar', 'Jaipur', 'Rajasthan', '302021', '9876543002', 'priya.singh@example.com', 'Graduate', 'center-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('student-3', 'KC-2023-1003', 'Amit Kumar', 'Suresh Kumar', 'Radha Kumar', '1999-03-10', 'MALE', '789 Malviya Nagar', 'Jaipur', 'Rajasthan', '302017', '9876543003', 'amit.kumar@example.com', 'Graduate', 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('student-4', 'KC-2023-1004', 'Neha Gupta', 'Mahesh Gupta', 'Sushila Gupta', '2002-11-05', 'FEMALE', '101 Mansarovar', 'Jaipur', 'Rajasthan', '302020', '9876543004', 'neha.gupta@example.com', '12th Pass', 'center-3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('student-5', 'KC-2023-1005', 'Vikram Joshi', 'Dinesh Joshi', 'Kamla Joshi', '1998-07-18', 'MALE', '202 Civil Lines', 'Ajmer', 'Rajasthan', '305001', '9876543005', 'vikram.joshi@example.com', 'Graduate', 'center-4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Enrollments
INSERT INTO "Enrollment" ("id", "studentId", "courseId", "startDate", "endDate", "status", "createdAt", "updatedAt")
VALUES 
('enrollment-1', 'student-1', 'course-1', '2023-01-15', '2023-07-15', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('enrollment-2', 'student-2', 'course-2', '2023-02-01', '2023-05-01', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('enrollment-3', 'student-3', 'course-3', '2023-03-10', '2023-05-10', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('enrollment-4', 'student-4', 'course-5', '2023-02-15', '2023-06-15', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('enrollment-5', 'student-5', 'course-6', '2023-01-20', '2023-04-20', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('enrollment-6', 'student-1', 'course-3', '2023-08-01', '2023-10-01', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Payments
INSERT INTO "Payment" ("id", "enrollmentId", "amount", "paymentDate", "paymentMethod", "reference", "status", "createdAt", "updatedAt")
VALUES 
('payment-1', 'enrollment-1', 6000, '2023-01-15', 'CASH', 'REF-1001', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('payment-2', 'enrollment-1', 6000, '2023-02-15', 'ONLINE', 'REF-1002', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('payment-3', 'enrollment-2', 3000, '2023-02-01', 'CASH', 'REF-1003', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('payment-4', 'enrollment-2', 3000, '2023-03-01', 'UPI', 'REF-1004', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('payment-5', 'enrollment-3', 5000, '2023-03-10', 'ONLINE', 'REF-1005', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Student Payments
INSERT INTO "StudentPayment" ("id", "studentId", "amount", "paymentDate", "paymentType", "description", "reference", "status", "createdAt", "updatedAt")
VALUES 
('student-payment-1', 'student-1', 500, '2023-02-10', 'CERTIFICATE_FEE', 'Certificate fee for previous course', 'REF-2001', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('student-payment-2', 'student-3', 300, '2023-03-15', 'EXAM_FEE', 'Additional exam fee', 'REF-2002', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Exams
INSERT INTO "Exam" ("id", "title", "description", "courseId", "subjectId", "examDate", "duration", "totalMarks", "passingMarks", "isOnline", "centerId", "createdAt", "updatedAt")
VALUES 
('exam-1', 'DCA Mid-Term Examination', 'Mid-term examination for DCA course', 'course-1', 'subject-1', '2023-04-15', 120, 100, 40, false, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('exam-2', 'CCC Final Examination', 'Final examination for CCC course', 'course-2', 'subject-7', '2023-04-30', 90, 50, 20, true, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('exam-3', 'Tally Practical Examination', 'Practical examination for Tally course', 'course-3', 'subject-10', '2023-05-10', 120, 100, 50, false, 'center-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Questions
INSERT INTO "Question" ("id", "examId", "questionText", "questionType", "options", "correctAnswer", "marks", "createdAt", "updatedAt")
VALUES 
('question-1', 'exam-1', 'What is the full form of CPU?', 'MULTIPLE_CHOICE', '["Central Processing Unit", "Central Program Unit", "Control Processing Unit", "Computer Processing Unit"]', 'Central Processing Unit', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('question-2', 'exam-1', 'MS Word is a word processing software.', 'TRUE_FALSE', '["True", "False"]', 'True', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('question-3', 'exam-1', 'Explain the difference between RAM and ROM.', 'DESCRIPTIVE', NULL, 'RAM is volatile memory used for temporary storage, while ROM is non-volatile memory used for permanent storage.', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('question-4', 'exam-2', 'Which of the following is not a valid Excel function?', 'MULTIPLE_CHOICE', '["SUM", "AVERAGE", "COUNT", "CALCULATE"]', 'CALCULATE', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('question-5', 'exam-2', 'Ctrl+C is used to copy selected text.', 'TRUE_FALSE', '["True", "False"]', 'True', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('question-6', 'exam-3', 'Create a company in Tally with the following details...', 'DESCRIPTIVE', NULL, 'Steps to create a company in Tally...', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('question-7', 'exam-3', 'Record a sales invoice in Tally.', 'DESCRIPTIVE', NULL, 'Steps to record a sales invoice in Tally...', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Exam Attempts
INSERT INTO "ExamAttempt" ("id", "examId", "studentId", "startTime", "endTime", "totalMarks", "marksObtained", "status", "createdAt", "updatedAt")
VALUES 
('attempt-1', 'exam-1', 'student-1', '2023-04-15 10:00:00', '2023-04-15 12:00:00', 100, 75, 'PASSED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('attempt-2', 'exam-2', 'student-2', '2023-04-30 14:00:00', '2023-04-30 15:30:00', 50, 35, 'PASSED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Student Answers
INSERT INTO "StudentAnswer" ("id", "examAttemptId", "questionId", "answer", "isCorrect", "marksObtained", "createdAt", "updatedAt")
VALUES 
('answer-1', 'attempt-1', 'question-1', 'Central Processing Unit', true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('answer-2', 'attempt-1', 'question-2', 'True', true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('answer-3', 'attempt-1', 'question-3', 'RAM is volatile memory that loses data when power is off. ROM is non-volatile and retains data.', true, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('answer-4', 'attempt-2', 'question-4', 'CALCULATE', true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('answer-5', 'attempt-2', 'question-5', 'True', true, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Certificates
INSERT INTO "Certificate" ("id", "certificateNo", "issueDate", "enrollmentId", "createdAt", "updatedAt")
VALUES 
('certificate-1', 'KC-CCC-2023-001', '2023-05-10', 'enrollment-2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Update Student with Certificate
UPDATE "Student" SET "certificateId" = 'certificate-1' WHERE "id" = 'student-2';
