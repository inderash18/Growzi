import { PrismaClient, Role, Difficulty, ResourceType, RequestStatus, TicketStatus, TicketCategory, ResumeTemplate, Theme } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgrespassword@localhost:5432/growzi?schema=public",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Student growth & marketplace platform...");

  // 1. Cleaning existing data in reverse order
  console.log("🧹 Cleaning tables...");
  await prisma.assistantSource.deleteMany({});
  await prisma.faqEntry.deleteMany({});
  await prisma.knowledgeArticle.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.download.deleteMany({});
  await prisma.contactSubmission.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.blogCategory.deleteMany({});
  await prisma.ticketMessage.deleteMany({});
  await prisma.supportTicket.deleteMany({});
  await prisma.websiteRequest.deleteMany({});
  await prisma.serviceRequest.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.resume.deleteMany({});
  await prisma.questionPaper.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.savedProject.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.projectCategory.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Tables cleared.");

  // 2. Create users
  console.log("👤 Creating seed users...");
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@growzi.com",
      role: Role.ADMIN,
      profile: {
        create: {
          name: "Growzi Admin Owner",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&q=80",
          bio: "Lead developer and administrator of the Growzi platform.",
        }
      }
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: "student@growzi.com",
      role: Role.STUDENT,
      profile: {
        create: {
          name: "Alex Carter",
          avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=128&h=128&fit=crop&q=80",
          college: "Apex Engineering College",
          department: "Computer Science",
          graduationYear: "2026",
          phone: "+1 (555) 019-2834",
          bio: "Aspiring full-stack engineer and React enthusiast.",
        }
      }
    },
  });

  console.log("✅ Users created.");

  // 3. Create Project Categories
  console.log("📂 Creating project categories...");
  const mernCat = await prisma.projectCategory.create({
    data: { name: "MERN Stack", slug: "mern-stack" }
  });
  const pythonCat = await prisma.projectCategory.create({
    data: { name: "Python", slug: "python" }
  });
  const flutterCat = await prisma.projectCategory.create({
    data: { name: "Flutter", slug: "flutter" }
  });
  const aiCat = await prisma.projectCategory.create({
    data: { name: "AI & ML", slug: "ai-ml" }
  });

  console.log("✅ Project categories created.");

  // 4. Create Projects
  console.log("🚀 Creating project guides...");
  const p1 = await prisma.project.create({
    data: {
      title: "Real-time Slack Clone",
      description: "A messaging app built with real-time socket connections, multiple chat channel listings, and private messages capability.",
      difficulty: Difficulty.BEGINNER,
      techStack: ["React", "Node.js", "Socket.io", "CSS"],
      screenshots: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60"],
      documentation: "Clone repository, run npm install in frontend and backend. Initialize server on port 5000 and setup state hooks.",
      resources: ["Socket.io rooms guide", "React Context docs"],
      categoryId: mernCat.id
    }
  });

  const p2 = await prisma.project.create({
    data: {
      title: "AI Resume Parser & Scraper",
      description: "Extract text structure from PDF resumes using OCR pipelines, parse experiences, and suggest scoring fits using LLM integrations.",
      difficulty: Difficulty.ADVANCED,
      techStack: ["Python", "FastAPI", "Tesseract OCR", "OpenAI API"],
      screenshots: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"],
      documentation: "Create a python virtualenv, configure OpenAI API keys in config, and run fastapi server on port 8000.",
      resources: ["FastAPI routing docs", "Tesseract layout analyzer guide"],
      categoryId: aiCat.id
    }
  });

  console.log("✅ Projects created.");

  // 5. Create Notes and resources
  console.log("📚 Creating course materials...");
  await prisma.resource.createMany({
    data: [
      {
        title: "Computer Networks Lecture Slides",
        description: "Study slides reviewing standard routing overlays, TCP sliding window, and socket configurations.",
        url: "https://www.w3.org/People/Frystyk/book/Overview.html",
        type: ResourceType.LINK,
        department: "Computer Science",
        semester: "Semester 5",
        subject: "Computer Networks"
      },
      {
        title: "Database System Internals PDF",
        description: "Guide covering query execution planner, index pages nodes structure, and write ahead log mechanics.",
        url: "https://example.com/db-internals.pdf",
        type: ResourceType.PDF,
        department: "Information Technology",
        semester: "Semester 6",
        subject: "DBMS"
      }
    ]
  });

  console.log("✅ Resources created.");

  // 6. Create Question Papers
  console.log("📝 Creating question papers...");
  await prisma.questionPaper.create({
    data: {
      department: "Computer Science",
      semester: "Semester 5",
      subject: "Computer Networks",
      year: 2025,
      url: "https://example.com/cn-paper-2025.pdf"
    }
  });

  console.log("✅ Question papers created.");

  // 7. Custom project & Website requests
  console.log("🛍️ Creating service requests...");
  await prisma.serviceRequest.create({
    data: {
      userId: studentUser.id,
      name: "Alex Carter",
      college: "Apex Engineering College",
      department: "Computer Science",
      projectTitle: "E-Commerce App with Payment",
      technology: "MERN Stack, Stripe",
      requirements: "Looking for a complete shopping cart build with stripe checkout and receipt mailing.",
      deadline: new Date("2026-07-15"),
      budget: 250,
      status: RequestStatus.IN_REVIEW,
      adminReply: "Reviewing tech stack requirements. We will match you with a technical guide shortly."
    }
  });

  await prisma.websiteRequest.create({
    data: {
      userId: studentUser.id,
      name: "Alex Carter",
      businessName: "Carter Consulting",
      websiteType: "Portfolio Consulting Website",
      featuresNeeded: "Static pages, testimonial slider, custom feedback form.",
      deadline: new Date("2026-08-01"),
      budget: 150,
      status: RequestStatus.PENDING
    }
  });

  console.log("✅ Service requests created.");

  // 8. Support Tickets
  console.log("🎫 Creating support ticket threads...");
  const ticket = await prisma.supportTicket.create({
    data: {
      userId: studentUser.id,
      subject: "Stuck on Socket connection configurations in Slack Clone",
      category: TicketCategory.DOUBT,
      status: TicketStatus.OPEN,
    }
  });

  await prisma.ticketMessage.createMany({
    data: [
      {
        ticketId: ticket.id,
        senderId: studentUser.id,
        message: "Hi, I have initialized Socket.io but message broadcast logs are not reflecting on the client screen. Any ideas?"
      },
      {
        ticketId: ticket.id,
        senderId: adminUser.id,
        message: "Double check your CORS options in the socket initialization block on the backend server. It must permit port 3000."
      }
    ]
  });

  console.log("✅ Support tickets created.");

  // 9. Resumes & Portfolios
  console.log("📄 Creating Resume & Portfolio presets...");
  await prisma.resume.create({
    data: {
      userId: studentUser.id,
      title: "Alex Carter software engineer resume",
      template: ResumeTemplate.SOFTWARE_ENGINEER,
      content: {
        personal: {
          fullName: "Alex Carter",
          email: "student@growzi.com",
          phone: "+1 (555) 019-2834",
          location: "San Francisco, CA",
          github: "github.com/alexcarter",
          linkedin: "linkedin.com/in/alexcarter",
        },
        education: [{ school: "Apex Engineering College", degree: "B.S. in CS", date: "2022 - 2026", gpa: "3.8/4.0" }],
        experience: [{ company: "Tech Startups Inc", role: "Intern", date: "2025", description: "React developer." }],
        skills: ["React", "Next.js", "TypeScript", "PostgreSQL"],
        projects: [{ name: "Slack Clone", description: "Messaging application." }]
      }
    }
  });

  await prisma.portfolio.create({
    data: {
      userId: studentUser.id,
      username: "alex-carter",
      theme: Theme.MINIMAL,
      isPublished: true,
      content: {
        heroTitle: "Building solutions that solve real-world problems",
        heroSubtitle: "Computer Science student at Apex Engineering College specializing in Next.js and PostgreSQL architectures.",
        aboutMe: "I am a passionate software developer eager to build scalable web applications. I focus on clean code and performance.",
        socials: {
          github: "https://github.com/alexcarter",
          linkedin: "https://linkedin.com/in/alexcarter",
          email: "mailto:student@growzi.com",
        }
      }
    }
  });

  console.log("✅ Resume & Portfolio created.");

  // 10. Blogs & categories
  console.log("📰 Creating blogs...");
  const bcat = await prisma.blogCategory.create({
    data: { name: "Career Prep", slug: "career-prep" }
  });

  await prisma.blog.create({
    data: {
      title: "A Complete Guide to Technical Placement Preparation",
      slug: "technical-placement-prep-guide",
      content: "Preparing for full stack engineer reviews requires standard structure coding prep, algorithm reviews, database SQL performance checkpoints, and building responsive personal portfolios.",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60",
      categoryId: bcat.id,
      tags: ["Placements", "Engineering", "Coding"],
      isPublished: true
    }
  });

  console.log("✅ Blogs created.");

  // 11. Future AI Assistant knowledge
  console.log("🧠 Seeding Future AI Assistant databases...");
  await prisma.knowledgeArticle.create({
    data: {
      title: "Resolving Socket.io connection errors",
      content: "Most socket connection failures result from mismatched ports or unconfigured CORS. Ensure server cors origins include client ports.",
      category: "Doubt Solving",
      tags: ["WebSockets", "Node.js", "React"]
    }
  });

  await prisma.faqEntry.createMany({
    data: [
      {
        question: "How do I request a custom coding project?",
        answer: "Navigate to the Custom Project Request system inside the dashboard workspace, submit requirements and budget, and await administrator review notes.",
        category: "General",
        order: 1
      },
      {
        question: "Is there a limit on portfolio theme selections?",
        answer: "No, students can configure their portfolios in the editor panel using Minimal, Vibrant, Dark, or Light themes at any time.",
        category: "Portfolios",
        order: 2
      }
    ]
  });

  await prisma.assistantSource.create({
    data: {
      title: "Growzi Project Guidelines Index",
      type: "TEXT",
      content: "This document describes project formats, difficulty definitions, technology options, and grading standards."
    }
  });

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
