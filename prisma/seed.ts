import {
  PrismaClient,
  type Role,
  type Gender,
  type EnrollmentStatus,
  type PaymentMethod,
  type PaymentStatus,
  type PaymentType,
} from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seeding...")

  // Hash password for users
  const hashedPassword = await hash("password123", 10)

  // Create centers
  const centers = [
    {
      name: "Krishna Computers - Main Center",
      code: "KC-MAIN",
      address: "123 Main Street, Near City Mall",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      phone: "9876543210",
      email: "info@krishnacomputers.com",
      isMainCenter: true,
    },
    {
      name: "Krishna Computers - Vaishali Nagar",
      code: "KC-VN",
      address: "456 Vaishali Nagar, Near Metro Station",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      phone: "9876543211",
      email: "vaishali@krishnacomputers.com",
      isMainCenter: false,
    },
    {
      name: "Krishna Computers - Mansarovar",
      code: "KC-MAN",
      address: "789 Mansarovar, Sector 9",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302020",
      phone: "9876543212",
      email: "mansarovar@krishnacomputers.com",
      isMainCenter: false,
    },
    {
      name: "Krishna Computers - Ajmer",
      code: "KC-AJM",
      address: "101 Civil Lines, Near Railway Station",
      city: "Ajmer",
      state: "Rajasthan",
      pincode: "305001",
      phone: "9876543213",
      email: "ajmer@krishnacomputers.com",
      isMainCenter: false,
    },
  ]

  for (const center of centers) {
    const createdCenter = await prisma.center.upsert({
      where: { code: center.code },
      update: {},
      create: center,
    })
    console.log(`Created center: ${createdCenter.name}`)
  }

  // Set parent-child relationships for centers
  const mainCenter = await prisma.center.findUnique({ where: { code: "KC-MAIN" } })
  if (mainCenter) {
    await prisma.center.updateMany({
      where: {
        code: {
          in: ["KC-VN", "KC-MAN", "KC-AJM"],
        },
      },
      data: { parentId: mainCenter.id },
    })
    console.log("Updated center parent-child relationships")
  }

  // Create users
  const users = [
    {
      name: "Admin User",
      email: "admin@krishnacomputers.com",
      hashedPassword,
      role: "ADMIN" as Role,
      centerCode: "KC-MAIN",
    },
    {
      name: "Vaishali Center Admin",
      email: "vaishali-admin@krishnacomputers.com",
      hashedPassword,
      role: "CENTER_ADMIN" as Role,
      centerCode: "KC-VN",
    },
    {
      name: "Mansarovar Center Admin",
      email: "mansarovar-admin@krishnacomputers.com",
      hashedPassword,
      role: "CENTER_ADMIN" as Role,
      centerCode: "KC-MAN",
    },
    {
      name: "Staff User 1",
      email: "staff1@krishnacomputers.com",
      hashedPassword,
      role: "STAFF" as Role,
      centerCode: "KC-MAIN",
    },
    {
      name: "Staff User 2",
      email: "staff2@krishnacomputers.com",
      hashedPassword,
      role: "STAFF" as Role,
      centerCode: "KC-VN",
    },
  ]

  for (const user of users) {
    const center = await prisma.center.findUnique({ where: { code: user.centerCode } })
    if (center) {
      const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          hashedPassword: user.hashedPassword,
          role: user.role,
          centerId: center.id,
        },
      })
      console.log(`Created user: ${createdUser.name} (${createdUser.role})`)
    }
  }

  // Create courses
  const courses = [
    {
      name: "Diploma in Computer Applications",
      code: "DCA",
      description: "Comprehensive course covering computer fundamentals, office applications, and programming basics.",
      duration: 6,
      fees: 12000,
      isActive: true,
      centerCode: "KC-MAIN",
    },
    {
      name: "Course on Computer Concepts",
      code: "CCC",
      description: "Basic course covering computer fundamentals and office applications.",
      duration: 3,
      fees: 6000,
      isActive: true,
      centerCode: "KC-MAIN",
    },
    {
      name: "Tally Prime with GST",
      code: "TALLY",
      description: "Comprehensive course on Tally accounting software with GST implementation.",
      duration: 2,
      fees: 5000,
      isActive: true,
      centerCode: "KC-MAIN",
    },
    {
      name: "Advanced Excel & Data Analysis",
      code: "EXCEL",
      description: "Advanced Excel features, formulas, pivot tables, and data analysis techniques.",
      duration: 2,
      fees: 4500,
      isActive: true,
      centerCode: "KC-MAIN",
    },
    {
      name: "Web Development",
      code: "WEBDEV",
      description: "HTML, CSS, JavaScript, and responsive web design.",
      duration: 4,
      fees: 8000,
      isActive: true,
      centerCode: "KC-MAIN",
    },
    {
      name: "Digital Marketing",
      code: "DIGMKT",
      description: "SEO, social media marketing, email marketing, and digital advertising.",
      duration: 3,
      fees: 7500,
      isActive: true,
      centerCode: "KC-MAIN",
    },
  ]

  const createdCourses = {}

  for (const course of courses) {
    const center = await prisma.center.findUnique({ where: { code: course.centerCode } })
    if (center) {
      const createdCourse = await prisma.course.upsert({
        where: { code: course.code },
        update: {},
        create: {
          name: course.name,
          code: course.code,
          description: course.description,
          duration: course.duration,
          fees: course.fees,
          isActive: course.isActive,
          centerId: center.id,
        },
      })
      createdCourses[course.code] = createdCourse
      console.log(`Created course: ${createdCourse.name}`)
    }
  }

  // Create subjects
  const subjects = [
    // DCA Subjects
    {
      name: "Computer Fundamentals",
      code: "DCA-CF",
      description: "Introduction to computer systems, hardware, and software.",
      courseCode: "DCA",
    },
    {
      name: "MS Office",
      code: "DCA-MSO",
      description: "Microsoft Office applications including Word, Excel, and PowerPoint.",
      courseCode: "DCA",
    },
    {
      name: "Operating System",
      code: "DCA-OS",
      description: "Introduction to operating systems and their functions.",
      courseCode: "DCA",
    },
    {
      name: "Internet & Web Design",
      code: "DCA-WEB",
      description: "Internet basics and introduction to web design using HTML and CSS.",
      courseCode: "DCA",
    },
    {
      name: "Programming Concepts",
      code: "DCA-PROG",
      description: "Introduction to programming concepts and basic algorithms.",
      courseCode: "DCA",
    },

    // CCC Subjects
    {
      name: "Computer Basics",
      code: "CCC-CB",
      description: "Introduction to computers and their components.",
      courseCode: "CCC",
    },
    {
      name: "Office Applications",
      code: "CCC-OA",
      description: "Basic usage of MS Word, Excel, and PowerPoint.",
      courseCode: "CCC",
    },
    {
      name: "Internet & Email",
      code: "CCC-IE",
      description: "Internet browsing and email communication.",
      courseCode: "CCC",
    },

    // Tally Subjects
    {
      name: "Accounting Basics",
      code: "TALLY-AB",
      description: "Introduction to accounting principles.",
      courseCode: "TALLY",
    },
    {
      name: "Tally Fundamentals",
      code: "TALLY-TF",
      description: "Basic operations in Tally software.",
      courseCode: "TALLY",
    },
    {
      name: "GST in Tally",
      code: "TALLY-GST",
      description: "GST implementation and filing using Tally.",
      courseCode: "TALLY",
    },

    // Excel Subjects
    {
      name: "Excel Basics",
      code: "EXCEL-EB",
      description: "Basic Excel operations and formulas.",
      courseCode: "EXCEL",
    },
    {
      name: "Advanced Formulas",
      code: "EXCEL-AF",
      description: "Advanced Excel formulas and functions.",
      courseCode: "EXCEL",
    },
    {
      name: "Data Analysis",
      code: "EXCEL-DA",
      description: "Data analysis using pivot tables and charts.",
      courseCode: "EXCEL",
    },

    // Web Development Subjects
    {
      name: "HTML & CSS",
      code: "WEBDEV-HC",
      description: "HTML structure and CSS styling.",
      courseCode: "WEBDEV",
    },
    {
      name: "JavaScript",
      code: "WEBDEV-JS",
      description: "JavaScript programming for web interactivity.",
      courseCode: "WEBDEV",
    },
    {
      name: "Responsive Design",
      code: "WEBDEV-RD",
      description: "Creating responsive websites for different devices.",
      courseCode: "WEBDEV",
    },

    // Digital Marketing Subjects
    {
      name: "SEO Fundamentals",
      code: "DIGMKT-SEO",
      description: "Search engine optimization techniques.",
      courseCode: "DIGMKT",
    },
    {
      name: "Social Media Marketing",
      code: "DIGMKT-SMM",
      description: "Marketing strategies for social media platforms.",
      courseCode: "DIGMKT",
    },
    {
      name: "Digital Advertising",
      code: "DIGMKT-DA",
      description: "Creating and managing digital ad campaigns.",
      courseCode: "DIGMKT",
    },
  ]

  for (const subject of subjects) {
    const course = createdCourses[subject.courseCode]
    if (course) {
      const createdSubject = await prisma.subject.upsert({
        where: { code: subject.code },
        update: {},
        create: {
          name: subject.name,
          code: subject.code,
          description: subject.description,
          courseId: course.id,
        },
      })
      console.log(`Created subject: ${createdSubject.name} for course: ${course.name}`)
    }
  }

  // Create students
  const students = [
    {
      registrationNo: "KC-2023-1001",
      name: "Rahul Sharma",
      fatherName: "Ramesh Sharma",
      motherName: "Sunita Sharma",
      dob: new Date("2000-05-15"),
      gender: "MALE" as Gender,
      address: "123 Shyam Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302019",
      phone: "9876543001",
      email: "rahul.sharma@example.com",
      education: "12th Pass",
      centerCode: "KC-MAIN",
    },
    {
      registrationNo: "KC-2023-1002",
      name: "Priya Singh",
      fatherName: "Rajendra Singh",
      motherName: "Meena Singh",
      dob: new Date("2001-08-22"),
      gender: "FEMALE" as Gender,
      address: "456 Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      phone: "9876543002",
      email: "priya.singh@example.com",
      education: "Graduate",
      centerCode: "KC-VN",
    },
    {
      registrationNo: "KC-2023-1003",
      name: "Amit Kumar",
      fatherName: "Suresh Kumar",
      motherName: "Radha Kumar",
      dob: new Date("1999-03-10"),
      gender: "MALE" as Gender,
      address: "789 Malviya Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302017",
      phone: "9876543003",
      email: "amit.kumar@example.com",
      education: "Graduate",
      centerCode: "KC-MAIN",
    },
    {
      registrationNo: "KC-2023-1004",
      name: "Neha Gupta",
      fatherName: "Mahesh Gupta",
      motherName: "Sushila Gupta",
      dob: new Date("2002-11-05"),
      gender: "FEMALE" as Gender,
      address: "101 Mansarovar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302020",
      phone: "9876543004",
      email: "neha.gupta@example.com",
      education: "12th Pass",
      centerCode: "KC-MAN",
    },
    {
      registrationNo: "KC-2023-1005",
      name: "Vikram Joshi",
      fatherName: "Dinesh Joshi",
      motherName: "Kamla Joshi",
      dob: new Date("1998-07-18"),
      gender: "MALE" as Gender,
      address: "202 Civil Lines",
      city: "Ajmer",
      state: "Rajasthan",
      pincode: "305001",
      phone: "9876543005",
      email: "vikram.joshi@example.com",
      education: "Graduate",
      centerCode: "KC-AJM",
    },
  ]

  const createdStudents = {}

  for (const student of students) {
    const center = await prisma.center.findUnique({ where: { code: student.centerCode } })
    if (center) {
      const createdStudent = await prisma.student.upsert({
        where: { registrationNo: student.registrationNo },
        update: {},
        create: {
          registrationNo: student.registrationNo,
          name: student.name,
          fatherName: student.fatherName,
          motherName: student.motherName,
          dob: student.dob,
          gender: student.gender,
          address: student.address,
          city: student.city,
          state: student.state,
          pincode: student.pincode,
          phone: student.phone,
          email: student.email,
          education: student.education,
          centerId: center.id,
        },
      })
      createdStudents[student.registrationNo] = createdStudent
      console.log(`Created student: ${createdStudent.name}`)
    }
  }

  // Create enrollments
  const enrollments = [
    {
      studentRegNo: "KC-2023-1001",
      courseCode: "DCA",
      startDate: new Date("2023-01-15"),
      endDate: new Date("2023-07-15"),
      status: "ACTIVE" as EnrollmentStatus,
    },
    {
      studentRegNo: "KC-2023-1002",
      courseCode: "CCC",
      startDate: new Date("2023-02-01"),
      endDate: new Date("2023-05-01"),
      status: "ACTIVE" as EnrollmentStatus,
    },
    {
      studentRegNo: "KC-2023-1003",
      courseCode: "TALLY",
      startDate: new Date("2023-03-10"),
      endDate: new Date("2023-05-10"),
      status: "ACTIVE" as EnrollmentStatus,
    },
    {
      studentRegNo: "KC-2023-1004",
      courseCode: "WEBDEV",
      startDate: new Date("2023-02-15"),
      endDate: new Date("2023-06-15"),
      status: "ACTIVE" as EnrollmentStatus,
    },
    {
      studentRegNo: "KC-2023-1005",
      courseCode: "DIGMKT",
      startDate: new Date("2023-01-20"),
      endDate: new Date("2023-04-20"),
      status: "ACTIVE" as EnrollmentStatus,
    },
    {
      studentRegNo: "KC-2023-1001",
      courseCode: "TALLY",
      startDate: new Date("2023-08-01"),
      endDate: new Date("2023-10-01"),
      status: "ACTIVE" as EnrollmentStatus,
    },
  ]

  const createdEnrollments = {}

  for (const enrollment of enrollments) {
    const student = createdStudents[enrollment.studentRegNo]
    const course = createdCourses[enrollment.courseCode]

    if (student && course) {
      const enrollmentId = `${student.id}-${course.id}-${enrollment.startDate.getTime()}`

      const createdEnrollment = await prisma.enrollment.upsert({
        where: { id: enrollmentId },
        update: {},
        create: {
          id: enrollmentId,
          studentId: student.id,
          courseId: course.id,
          startDate: enrollment.startDate,
          endDate: enrollment.endDate,
          status: enrollment.status,
        },
      })

      createdEnrollments[enrollmentId] = createdEnrollment
      console.log(`Created enrollment for student: ${student.name} in course: ${course.name}`)
    }
  }

  // Create payments for enrollments
  for (const [enrollmentId, enrollment] of Object.entries(createdEnrollments)) {
    const course = await prisma.course.findUnique({
      where: { id: enrollment.courseId },
    })

    if (course) {
      // First payment (50% of fees)
      const firstPayment = await prisma.payment.upsert({
        where: { id: `${enrollmentId}-payment1` },
        update: {},
        create: {
          id: `${enrollmentId}-payment1`,
          enrollmentId: enrollment.id,
          amount: course.fees * 0.5,
          paymentDate: enrollment.startDate,
          paymentMethod: "CASH" as PaymentMethod,
          reference: `REF-${Math.floor(Math.random() * 10000)}`,
          status: "COMPLETED" as PaymentStatus,
        },
      })

      console.log(`Created first payment for enrollment: ${firstPayment.amount}`)

      // Second payment (remaining 50% of fees)
      const secondPaymentDate = new Date(enrollment.startDate)
      secondPaymentDate.setMonth(secondPaymentDate.getMonth() + 1)

      const secondPayment = await prisma.payment.upsert({
        where: { id: `${enrollmentId}-payment2` },
        update: {},
        create: {
          id: `${enrollmentId}-payment2`,
          enrollmentId: enrollment.id,
          amount: course.fees * 0.5,
          paymentDate: secondPaymentDate,
          paymentMethod: "ONLINE" as PaymentMethod,
          reference: `REF-${Math.floor(Math.random() * 10000)}`,
          status: "COMPLETED" as PaymentStatus,
        },
      })

      console.log(`Created second payment for enrollment: ${secondPayment.amount}`)
    }
  }

  // Create student payments (not related to enrollments)
  const studentPayments = [
    {
      studentRegNo: "KC-2023-1001",
      amount: 500,
      paymentDate: new Date("2023-02-10"),
      paymentType: "CERTIFICATE_FEE" as PaymentType,
      description: "Certificate fee for previous course",
      reference: `REF-${Math.floor(Math.random() * 10000)}`,
      status: "COMPLETED" as PaymentStatus,
    },
    {
      studentRegNo: "KC-2023-1003",
      amount: 300,
      paymentDate: new Date("2023-03-15"),
      paymentType: "EXAM_FEE" as PaymentType,
      description: "Additional exam fee",
      reference: `REF-${Math.floor(Math.random() * 10000)}`,
      status: "COMPLETED" as PaymentStatus,
    },
  ]

  for (const payment of studentPayments) {
    const student = createdStudents[payment.studentRegNo]

    if (student) {
      const createdPayment = await prisma.studentPayment.upsert({
        where: { id: `${student.id}-${payment.paymentDate.getTime()}` },
        update: {},
        create: {
          id: `${student.id}-${payment.paymentDate.getTime()}`,
          studentId: student.id,
          amount: payment.amount,
          paymentDate: payment.paymentDate,
          paymentType: payment.paymentType,
          description: payment.description,
          reference: payment.reference,
          status: payment.status,
        },
      })

      console.log(`Created student payment: ${createdPayment.amount} for ${student.name}`)
    }
  }

  // Create exams
  const exams = [
    {
      title: "DCA Mid-Term Examination",
      description: "Mid-term examination for DCA course",
      courseCode: "DCA",
      subjectCode: "DCA-CF",
      examDate: new Date("2023-04-15"),
      duration: 120,
      totalMarks: 100,
      passingMarks: 40,
      isOnline: false,
      centerCode: "KC-MAIN",
    },
    {
      title: "CCC Final Examination",
      description: "Final examination for CCC course",
      courseCode: "CCC",
      subjectCode: "CCC-OA",
      examDate: new Date("2023-04-30"),
      duration: 90,
      totalMarks: 50,
      passingMarks: 20,
      isOnline: true,
      centerCode: "KC-MAIN",
    },
    {
      title: "Tally Practical Examination",
      description: "Practical examination for Tally course",
      courseCode: "TALLY",
      subjectCode: "TALLY-TF",
      examDate: new Date("2023-05-10"),
      duration: 120,
      totalMarks: 100,
      passingMarks: 50,
      isOnline: false,
      centerCode: "KC-MAIN",
    },
  ]

  const createdExams = {}

  for (const exam of exams) {
    const course = createdCourses[exam.courseCode]
    const center = await prisma.center.findUnique({ where: { code: exam.centerCode } })

    if (course && center) {
      const subject = await prisma.subject.findUnique({ where: { code: exam.subjectCode } })

      const createdExam = await prisma.exam.upsert({
        where: { id: `${course.id}-${exam.examDate.getTime()}` },
        update: {},
        create: {
          id: `${course.id}-${exam.examDate.getTime()}`,
          title: exam.title,
          description: exam.description,
          courseId: course.id,
          subjectId: subject?.id,
          examDate: exam.examDate,
          duration: exam.duration,
          totalMarks: exam.totalMarks,
          passingMarks: exam.passingMarks,
          isOnline: exam.isOnline,
          centerId: center.id,
        },
      })

      createdExams[`${exam.courseCode}-${exam.examDate.getTime()}`] = createdExam
      console.log(`Created exam: ${createdExam.title}`)
    }
  }

  // Create questions for exams
  const questions = [
    // DCA Mid-Term Questions
    {
      examKey: "DCA-1681516800000",
      questionText: "What is the full form of CPU?",
      questionType: "MULTIPLE_CHOICE",
      options: JSON.stringify([
        "Central Processing Unit",
        "Central Program Unit",
        "Control Processing Unit",
        "Computer Processing Unit",
      ]),
      correctAnswer: "Central Processing Unit",
      marks: 5,
    },
    {
      examKey: "DCA-1681516800000",
      questionText: "MS Word is a word processing software.",
      questionType: "TRUE_FALSE",
      options: JSON.stringify(["True", "False"]),
      correctAnswer: "True",
      marks: 5,
    },
    {
      examKey: "DCA-1681516800000",
      questionText: "Explain the difference between RAM and ROM.",
      questionType: "DESCRIPTIVE",
      correctAnswer:
        "RAM is volatile memory used for temporary storage, while ROM is non-volatile memory used for permanent storage.",
      marks: 10,
    },

    // CCC Final Questions
    {
      examKey: "CCC-1682812800000",
      questionText: "Which of the following is not a valid Excel function?",
      questionType: "MULTIPLE_CHOICE",
      options: JSON.stringify(["SUM", "AVERAGE", "COUNT", "CALCULATE"]),
      correctAnswer: "CALCULATE",
      marks: 5,
    },
    {
      examKey: "CCC-1682812800000",
      questionText: "Ctrl+C is used to copy selected text.",
      questionType: "TRUE_FALSE",
      options: JSON.stringify(["True", "False"]),
      correctAnswer: "True",
      marks: 5,
    },

    // Tally Practical Questions
    {
      examKey: "TALLY-1683676800000",
      questionText: "Create a company in Tally with the following details...",
      questionType: "DESCRIPTIVE",
      correctAnswer: "Steps to create a company in Tally...",
      marks: 20,
    },
    {
      examKey: "TALLY-1683676800000",
      questionText: "Record a sales invoice in Tally.",
      questionType: "DESCRIPTIVE",
      correctAnswer: "Steps to record a sales invoice in Tally...",
      marks: 20,
    },
  ]

  for (const question of questions) {
    const exam = createdExams[question.examKey]

    if (exam) {
      const createdQuestion = await prisma.question.upsert({
        where: { id: `${exam.id}-${questions.indexOf(question)}` },
        update: {},
        create: {
          id: `${exam.id}-${questions.indexOf(question)}`,
          examId: exam.id,
          questionText: question.questionText,
          questionType: question.questionType as any,
          options: question.options,
          correctAnswer: question.correctAnswer,
          marks: question.marks,
        },
      })

      console.log(`Created question: ${createdQuestion.questionText.substring(0, 30)}...`)
    }
  }

  // Create exam attempts
  const examAttempts = [
    {
      examKey: "DCA-1681516800000",
      studentRegNo: "KC-2023-1001",
      startTime: new Date("2023-04-15T10:00:00"),
      endTime: new Date("2023-04-15T12:00:00"),
      totalMarks: 100,
      marksObtained: 75,
      status: "PASSED",
    },
    {
      examKey: "CCC-1682812800000",
      studentRegNo: "KC-2023-1002",
      startTime: new Date("2023-04-30T14:00:00"),
      endTime: new Date("2023-04-30T15:30:00"),
      totalMarks: 50,
      marksObtained: 35,
      status: "PASSED",
    },
  ]

  for (const attempt of examAttempts) {
    const exam = createdExams[attempt.examKey]
    const student = createdStudents[attempt.studentRegNo]

    if (exam && student) {
      const createdAttempt = await prisma.examAttempt.upsert({
        where: { id: `${exam.id}-${student.id}` },
        update: {},
        create: {
          id: `${exam.id}-${student.id}`,
          examId: exam.id,
          studentId: student.id,
          startTime: attempt.startTime,
          endTime: attempt.endTime,
          totalMarks: attempt.totalMarks,
          marksObtained: attempt.marksObtained,
          status: attempt.status as any,
        },
      })

      console.log(`Created exam attempt for student: ${student.name} in exam: ${exam.title}`)
    }
  }

  // Create certificates for completed enrollments
  const certificates = [
    {
      enrollmentKey: `${createdStudents["KC-2023-1002"].id}-${createdCourses["CCC"].id}-${new Date("2023-02-01").getTime()}`,
      certificateNo: "KC-CCC-2023-001",
      issueDate: new Date("2023-05-10"),
    },
  ]

  for (const certificate of certificates) {
    const enrollment = createdEnrollments[certificate.enrollmentKey]

    if (enrollment) {
      const createdCertificate = await prisma.certificate.upsert({
        where: { id: `${enrollment.id}-cert` },
        update: {},
        create: {
          id: `${enrollment.id}-cert`,
          certificateNo: certificate.certificateNo,
          issueDate: certificate.issueDate,
          enrollmentId: enrollment.id,
        },
      })

      // Update student with certificate ID
      const student = await prisma.student.update({
        where: { id: enrollment.studentId },
        data: {
          certificateId: createdCertificate.id,
        },
      })

      console.log(`Created certificate: ${createdCertificate.certificateNo} for student: ${student.name}`)
    }
  }

  console.log("Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
