require("dotenv").config();

const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "scripthex_enterprise_suite",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminRole = await prisma.role.upsert({
    where: {
      name: "ADMIN",
    },
    update: {},
    create: {
      name: "ADMIN",
    },
  });

  const departments = ["IT", "HR", "Accounting", "Marketing", "Operations"];

  for (const name of departments) {
    await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const positions = [
    "Software Developer",
    "HR Officer",
    "Accountant",
    "Marketing Specialist",
    "Operations Staff",
  ];

  for (const name of positions) {
    await prisma.position.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Departments and positions seeded successfully.");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@scripthex.com",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@scripthex.com",
      password: hashedPassword,
      provider: "local",
      roleId: adminRole.id,
    },
  });

  console.log("✅ Admin account created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
