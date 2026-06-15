import { PrismaClient, Role, TenantType, ResourceType, Difficulty, AssessmentType, SubmissionStatus, ResumeTemplate, Theme } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgrespassword@localhost:5432/growzi?schema=public",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seeding database...");

  // 1. Clean existing data in reverse order
  console.log("🧹 Cleaning existing database tables...");
  await prisma.analytics.deleteMany({});
  await prisma.activityLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.resume.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.assessment.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.membership.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Database tables cleared.");

  // 2. Create users
  console.log("👤 Creating seed users...");
  const superAdmin = await prisma.user.create({
    data: {
      email: "superadmin@growzi.com",
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
    },
  });

  const apexAdmin = await prisma.user.create({
    data: {
      email: "admin@apex.edu",
      name: "Dr. Rajesh Kumar",
      role: Role.ADMIN,
    },
  });

  const apexFaculty = await prisma.user.create({
    data: {
      email: "faculty@apex.edu",
      name: "Prof. Sarah Miller",
      role: Role.FACULTY,
    },
  });

  const apexStudent = await prisma.user.create({
    data: {
      email: "student@apex.edu",
      name: "Alex Carter",
      role: Role.STUDENT,
    },
  });

  const communityStudent = await prisma.user.create({
    data: {
      email: "student@devsunited.org",
      name: "Sophia Wang",
      role: Role.STUDENT,
    },
  });

  console.log("✅ Users created.");

  // 3. Create tenants
  console.log("🏢 Creating seed tenants...");
  const apexCollege = await prisma.tenant.create({
    data: {
      name: "Apex Engineering College",
      slug: "apex-engineering",
      type: TenantType.COLLEGE,
      primaryColor: "#0f172a", // slate-900
      secondaryColor: "#3b82f6", // blue-500
      logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop&q=80",
    },
  });

  const devsUnited = await prisma.tenant.create({
    data: {
      name: "DevsUnited Community",
      slug: "devsunited",
      type: TenantType.STUDENT_COMMUNITY,
      primaryColor: "#09090b", // zinc-950
      secondaryColor: "#10b981", // emerald-500
      logoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&h=128&fit=crop&q=80",
    },
  });

  console.log("✅ Tenants created.");

  // 4. Create memberships
  console.log("🤝 Creating memberships linking users to tenants...");
  await prisma.membership.createMany({
    data: [
      { userId: apexAdmin.id, tenantId: apexCollege.id, role: Role.ADMIN },
      { userId: apexFaculty.id, tenantId: apexCollege.id, role: Role.FACULTY },
      { userId: apexStudent.id, tenantId: apexCollege.id, role: Role.STUDENT },
      { userId: communityStudent.id, tenantId: devsUnited.id, role: Role.STUDENT },
    ],
  });

  console.log("✅ Memberships created.");

  // 5. Create subscriptions for tenants
  console.log("💳 Creating tenant subscriptions...");
  await prisma.subscription.create({
    data: {
      tenantId: apexCollege.id,
      plan: "ENTERPRISE",
      status: "ACTIVE",
    },
  });

  await prisma.subscription.create({
    data: {
      tenantId: devsUnited.id,
      plan: "FREE",
      status: "ACTIVE",
    },
  });

  console.log("✅ Subscriptions configured.");

  // 6. Create Resources
  console.log("📚 Seeding resources...");
  await prisma.resource.createMany({
    data: [
      {
        title: "Computer Networks Fundamentals",
        description: "Comprehensive study guide covering TCP/IP stack, routing protocols, and HTTP protocol mechanics.",
        url: "https://www.w3.org/People/Frystyk/book/Overview.html",
        type: ResourceType.LINK,
        department: "Computer Science",
        semester: "Semester 5",
        subject: "Computer Networks",
        tenantId: apexCollege.id,
        createdById: apexFaculty.id,
      },
      {
        title: "SQL Performance Tuning Cheatsheet",
        description: "Hands-on cheat sheet for indexing strategies, query execution plans, and optimization tips in PostgreSQL.",
        url: "https://example.com/resources/sql-performance.pdf",
        type: ResourceType.PDF,
        department: "Information Technology",
        semester: "Semester 6",
        subject: "Database Management Systems",
        tenantId: apexCollege.id,
        createdById: apexFaculty.id,
      },
      {
        title: "Building Microservices with Go",
        description: "Introductory tutorial video demonstrating grpc setup and containerization of simple Go microservices.",
        url: "https://www.youtube.com/watch?v=mockGoVideo",
        type: ResourceType.VIDEO,
        department: "Computer Science",
        semester: "Semester 8",
        subject: "Distributed Systems",
        tenantId: apexCollege.id,
        createdById: apexFaculty.id,
      },
      {
        title: "Introduction to React and Zustand",
        description: "Modern state management patterns inside React applications using Zustand. Shared for the student group.",
        url: "https://zustand-demo.pmnd.rs",
        type: ResourceType.LINK,
        department: "Web Development",
        semester: "N/A",
        subject: "Frontend Engineering",
        tenantId: devsUnited.id,
        createdById: communityStudent.id,
      },
    ],
  });

  console.log("✅ Resources seeded.");

  // 7. Create Projects
  console.log("🚀 Seeding projects...");
  await prisma.project.createMany({
    data: [
      {
        title: "Enterprise SaaS Analytics Portal",
        description: "A comprehensive project involving full-stack implementation of a multi-tenant dashboard displaying active logs, user activity graphs, and subscription billing summaries.",
        difficulty: Difficulty.ADVANCED,
        techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts", "Tailwind CSS"],
        githubUrl: "https://github.com/apex-students/saas-analytics",
        videoUrl: "https://youtube.com/watch?v=mockSaaSVideo",
        screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60"],
        resources: ["Prisma docs", "Tailwind CSS docs", "Next.js routing guidelines"],
        tenantId: apexCollege.id,
        createdById: apexFaculty.id,
      },
      {
        title: "AI Resume Scanner & Parser",
        description: "An open source project to extract information from resumes using Python, OCR engine, and Open Source LLM APIs.",
        difficulty: Difficulty.INTERMEDIATE,
        techStack: ["Python", "FastAPI", "Tesseract", "OpenAI API", "React"],
        githubUrl: "https://github.com/devsunited/ai-resume-parser",
        screenshots: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"],
        resources: ["FastAPI documentation", "LangChain parsing guidelines"],
        tenantId: devsUnited.id,
        createdById: communityStudent.id,
      },
    ],
  });

  console.log("✅ Projects seeded.");

  // 8. Create Assessments & Questions
  console.log("📝 Seeding assessments and questions...");
  const assessment1 = await prisma.assessment.create({
    data: {
      title: "Core Web Technologies Quiz",
      description: "Evaluate your understanding of CSS Grid, JavaScript event loop, and DOM manipulation basics.",
      durationMinutes: 15,
      passingScore: 60,
      type: AssessmentType.MCQ,
      tenantId: apexCollege.id,
      createdById: apexFaculty.id,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        assessmentId: assessment1.id,
        type: AssessmentType.MCQ,
        text: "Which of the following is true about JavaScript's event loop?",
        options: [
          "It executes blocking synchronous tasks in the background.",
          "It continuously checks the call stack and event callback queues.",
          "It operates on multi-threaded parallel processes.",
          "It bypasses standard CPU thread allocations entirely."
        ],
        correctAnswer: "1", // Second option (index 1)
        points: 10,
        order: 0,
      },
      {
        assessmentId: assessment1.id,
        type: AssessmentType.MCQ,
        text: "What does CSS Grid's 'fr' unit represent?",
        options: [
          "A fixed ratio multiplier.",
          "A fraction of the free space in the grid container.",
          "A frame boundary constraint.",
          "A font-responsive height reference."
        ],
        correctAnswer: "1", // Second option (index 1)
        points: 10,
        order: 1,
      },
      {
        assessmentId: assessment1.id,
        type: AssessmentType.MCQ,
        text: "Which array method returns a new array with all elements that pass a test?",
        options: [
          "map()",
          "forEach()",
          "filter()",
          "reduce()"
        ],
        correctAnswer: "2", // Third option (index 2)
        points: 10,
        order: 2,
      },
    ],
  });

  const assessment2 = await prisma.assessment.create({
    data: {
      title: "Algorithms & Logic Prep",
      description: "Write code to solve standard dynamic programming and string parsing tasks.",
      durationMinutes: 30,
      passingScore: 50,
      type: AssessmentType.CODING,
      tenantId: apexCollege.id,
      createdById: apexFaculty.id,
    },
  });

  await prisma.question.create({
    data: {
      assessmentId: assessment2.id,
      type: AssessmentType.CODING,
      text: "Write a function `isPalindrome(str)` that accepts a string and returns `true` if the string reads the same backward as forward (ignoring casing and non-alphanumeric characters), and `false` otherwise.",
      correctAnswer: "function isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}",
      points: 20,
      order: 0,
    },
  });

  console.log("✅ Assessments and Questions created.");

  // 9. Create Submissions
  console.log("📊 Seeding submission logs...");
  await prisma.submission.create({
    data: {
      assessmentId: assessment1.id,
      studentId: apexStudent.id,
      score: 30, // 3/3 correct
      answers: {
        "0": "1",
        "1": "1",
        "2": "2",
      },
      status: SubmissionStatus.EVALUATED,
      feedback: "Perfect work! Strong understanding of frontend internals.",
    },
  });

  console.log("✅ Submissions created.");

  // 10. Create Resume & Portfolio for student
  console.log("📄 Seeding Resumes & Portfolios...");
  await prisma.resume.create({
    data: {
      studentId: apexStudent.id,
      title: "Alex Carter Software Engineer Resume",
      template: ResumeTemplate.SOFTWARE_ENGINEER,
      content: {
        personal: {
          fullName: "Alex Carter",
          email: "alex.carter@apex.edu",
          phone: "+1 (555) 019-2834",
          location: "San Francisco, CA",
          github: "github.com/alexcarter",
          linkedin: "linkedin.com/in/alexcarter",
        },
        education: [
          {
            school: "Apex Engineering College",
            degree: "Bachelor of Science in Computer Science",
            date: "2022 - 2026",
            gpa: "3.8/4.0",
          },
        ],
        experience: [
          {
            company: "Tech Startups Inc",
            role: "Software Engineering Intern",
            date: "Summer 2025",
            description: "Developed frontend interface for customer management dashboard using React and Tailwind CSS. Optimized database queries in PostgreSQL, achieving a 20% reduction in API response times.",
          },
        ],
        skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Git"],
        projects: [
          {
            name: "Enterprise SaaS Analytics Portal",
            description: "Built a fully-featured client billing and logs display module. Integrated Recharts visualization overlays.",
          },
        ],
      },
    },
  });

  await prisma.portfolio.create({
    data: {
      studentId: apexStudent.id,
      slug: "alex-carter",
      title: "Alex Carter | Full Stack Developer Portfolio",
      description: "Showcasing computer science engineering projects, skills, and assessment scores.",
      theme: Theme.MINIMAL,
      isPublished: true,
      content: {
        heroTitle: "Building solutions that solve real-world problems",
        heroSubtitle: "Computer Science student at Apex Engineering College specializing in Next.js and PostgreSQL architectures.",
        aboutMe: "I am a passionate software developer eager to build scalable web applications. I focus on clean code and performance.",
        socials: {
          github: "https://github.com/alexcarter",
          linkedin: "https://linkedin.com/in/alexcarter",
          email: "mailto:alex.carter@apex.edu",
        },
      },
    },
  });

  console.log("✅ Resumes & Portfolios seeded.");

  // 11. Create Notifications & Activity Logs
  console.log("🔔 Seeding logs and notifications...");
  await prisma.notification.createMany({
    data: [
      {
        userId: apexStudent.id,
        title: "New Resource Available",
        message: "Prof. Sarah Miller uploaded 'Computer Networks Fundamentals'. Check the Resource Hub.",
      },
      {
        userId: apexStudent.id,
        title: "Assessment Scored",
        message: "Your submission for 'Core Web Technologies Quiz' has been evaluated: Score 30/30.",
      },
    ],
  });

  await prisma.activityLog.createMany({
    data: [
      {
        userId: apexFaculty.id,
        tenantId: apexCollege.id,
        action: "RESOURCE_UPLOAD",
        details: "Uploaded resource: 'Computer Networks Fundamentals'",
      },
      {
        userId: apexStudent.id,
        tenantId: apexCollege.id,
        action: "ASSESSMENT_SUBMIT",
        details: "Submitted assessment: 'Core Web Technologies Quiz'",
      },
    ],
  });

  // 12. Create Analytics data
  console.log("📈 Seeding analytics...");
  await prisma.analytics.createMany({
    data: [
      { tenantId: apexCollege.id, metric: "active_students", value: 124 },
      { tenantId: apexCollege.id, metric: "resource_downloads", value: 482 },
      { tenantId: apexCollege.id, metric: "assessment_average_score", value: 78.5 },
      { tenantId: apexCollege.id, metric: "placement_readiness_rate", value: 82.0 },
      { tenantId: devsUnited.id, metric: "active_students", value: 42 },
      { tenantId: devsUnited.id, metric: "resource_downloads", value: 15 },
    ],
  });

  console.log("✅ Analytics seeded.");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
