import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // 1. Clean existing records
  console.log("Cleaning database...");
  await prisma.auditLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.payroll.deleteMany({});
  await prisma.leave.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.quotation.deleteMany({});
  await prisma.purchaseOrder.deleteMany({});
  await prisma.agent.deleteMany({});
  await prisma.supplier.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.role.deleteMany({});

  // 2. Create Permissions
  console.log("Creating Permissions...");
  const permissions = [
    { name: "READ_REPORTS", description: "View executive dashboard reports" },
    { name: "APPROVE_REQUESTS", description: "Approve leaves, invoices and purchase orders" },
    { name: "MANAGE_EMPLOYEES", description: "Create and update employee records" },
    { name: "MANAGE_PAYROLL", description: "Process payroll payments" },
    { name: "VIEW_ATTENDANCE", description: "View and verify presence logs" },
    { name: "MANAGE_CUSTOMERS", description: "Edit CRM customer profiles" },
    { name: "MANAGE_QUOTATIONS", description: "Create and modify proposals" },
    { name: "MANAGE_CONTRACTS", description: "Create and sign contracts" },
    { name: "MANAGE_SYSTEM", description: "Configure system modules" },
    { name: "MANAGE_USERS", description: "Assign roles and permissions" },
    { name: "SUBMIT_REPORTS", description: "Submit daily logs and documents" },
    { name: "UPDATE_TASKS", description: "Update task lists and checkmarks" },
    { name: "CLOCK_IN_OUT", description: "Punch shifting timers" },
  ];

  const dbPermissions: Record<string, any> = {};
  for (const perm of permissions) {
    dbPermissions[perm.name] = await prisma.permission.create({
      data: perm,
    });
  }

  // 3. Create Roles
  console.log("Creating Roles...");
  const rolesData = [
    {
      name: "MANAGER",
      description: "Executive operations manager with approval authorities",
      permissions: ["READ_REPORTS", "APPROVE_REQUESTS"],
    },
    {
      name: "HR",
      description: "Human resource officer managing employee life cycles",
      permissions: ["MANAGE_EMPLOYEES", "MANAGE_PAYROLL", "VIEW_ATTENDANCE"],
    },
    {
      name: "SALES",
      description: "Sales executive responsible for invoices and opportunities",
      permissions: ["MANAGE_CUSTOMERS", "MANAGE_QUOTATIONS", "MANAGE_CONTRACTS"],
    },
    {
      name: "IT",
      description: "System administrator managing permissions and logs",
      permissions: ["MANAGE_SYSTEM", "MANAGE_USERS"],
    },
    {
      name: "AGENT",
      description: "Field representative executing tasks and clocking sessions",
      permissions: ["SUBMIT_REPORTS", "UPDATE_TASKS", "CLOCK_IN_OUT"],
    },
  ];

  const dbRoles: Record<string, any> = {};
  for (const r of rolesData) {
    dbRoles[r.name] = await prisma.role.create({
      data: {
        name: r.name,
        description: r.description,
        permissions: {
          connect: r.permissions.map((pName) => ({ id: dbPermissions[pName].id })),
        },
      },
    });
  }

  // 4. Create Departments
  console.log("Creating Departments...");
  const depts = [
    { name: "Management", description: "Executive planning and operations team" },
    { name: "Human Resources", description: "Talent acquisition and payroll processing" },
    { name: "Sales & Marketing", description: "Lead generation and contracts closure" },
    { name: "Information Technology", description: "Servers, networks and ERP access administration" },
    { name: "Engineering Field Ops", description: "Purification plants and plumbing deployments" },
  ];

  const dbDepts: Record<string, any> = {};
  for (const d of depts) {
    dbDepts[d.name] = await prisma.department.create({
      data: d,
    });
  }

  // 5. Create Users & Employees
  console.log("Creating Users and Employees...");
  const hashedPassword = await bcrypt.hash("password", 10);

  const usersToCreate = [
    {
      email: "manager@erp.com",
      name: "Ahmed Manager",
      role: UserRole.MANAGER,
      roleName: "MANAGER",
      deptName: "Management",
      empId: "QA-2026-001",
      position: "General Manager",
      salary: 15500,
    },
    {
      email: "hr@erp.com",
      name: "Fatima HR",
      role: UserRole.HR,
      roleName: "HR",
      deptName: "Human Resources",
      empId: "QA-2026-002",
      position: "HR Director",
      salary: 9500,
    },
    {
      email: "sales@erp.com",
      name: "Zaid Sales",
      role: UserRole.SALES,
      roleName: "SALES",
      deptName: "Sales & Marketing",
      empId: "QA-2026-003",
      position: "Senior Sales Lead",
      salary: 8000,
    },
    {
      email: "it@erp.com",
      name: "Khalid IT",
      role: UserRole.IT,
      roleName: "IT",
      deptName: "Information Technology",
      empId: "QA-2026-004",
      position: "Infrastructure Architect",
      salary: 10500,
    },
    {
      email: "agent@erp.com",
      name: "Yasmin Agent",
      role: UserRole.AGENT,
      roleName: "AGENT",
      deptName: "Engineering Field Ops",
      empId: "QA-2026-005",
      position: "Water Operations Specialist",
      salary: 6200,
    },
  ];

  const dbUsers: Record<string, any> = {};
  const dbEmployees: Record<string, any> = {};

  for (const u of usersToCreate) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
        isActive: true,
        roleRef: {
          connect: { id: dbRoles[u.roleName].id },
        },
      },
    });

    dbUsers[u.email] = user;

    const employee = await prisma.employee.create({
      data: {
        userId: user.id,
        employeeId: u.empId,
        firstName: u.name.split(" ")[0],
        lastName: u.name.split(" ")[1] || "",
        email: u.email,
        phone: "+971 50 123 4567",
        position: u.position,
        salary: u.salary,
        status: "ACTIVE",
        hireDate: new Date("2025-01-15"),
        department: {
          connect: { id: dbDepts[u.deptName].id },
        },
      },
    });

    dbEmployees[u.email] = employee;
  }

  // Link Managers to Departments
  await prisma.department.update({
    where: { id: dbDepts["Management"].id },
    data: { managerId: dbEmployees["manager@erp.com"].id },
  });
  await prisma.department.update({
    where: { id: dbDepts["Human Resources"].id },
    data: { managerId: dbEmployees["hr@erp.com"].id },
  });
  await prisma.department.update({
    where: { id: dbDepts["Sales & Marketing"].id },
    data: { managerId: dbEmployees["sales@erp.com"].id },
  });
  await prisma.department.update({
    where: { id: dbDepts["Information Technology"].id },
    data: { managerId: dbEmployees["it@erp.com"].id },
  });
  await prisma.department.update({
    where: { id: dbDepts["Engineering Field Ops"].id },
    data: { managerId: dbEmployees["manager@erp.com"].id }, // Management manages field ops
  });

  // 6. Create Agent records
  console.log("Creating Agents...");
  const agentRecord = await prisma.agent.create({
    data: {
      employeeId: dbEmployees["agent@erp.com"].id,
      region: "Sharjah & Dubai",
      status: "ACTIVE",
    },
  });

  // 7. Create Customers & Suppliers
  console.log("Creating Customers and Suppliers...");
  const customers = [
    { name: "Al-Khaleej Water Assets", companyName: "Al Khaleej Group", email: "procurement@alkhaleej.ae", phone: "+971 4 999 8888", address: "Marina Towers, Dubai" },
    { name: "Sharjah Municipality Dept", companyName: "Sharjah Government", email: "info@shj-muni.gov.ae", phone: "+971 6 555 1234", address: "Government Square, Sharjah" },
    { name: "Emaar Properties PJSC", companyName: "Emaar", email: "contracts@emaar.ae", phone: "+971 4 367 3333", address: "Downtown Dubai, UAE" },
  ];

  const dbCustomers: Record<string, any> = {};
  for (const c of customers) {
    dbCustomers[c.name] = await prisma.customer.create({
      data: c,
    });
  }

  const suppliers = [
    { name: "HydroFlow Pumps Corp", companyName: "HydroFlow LLC", email: "orders@hydroflow.com", phone: "+966 1 123 4567", address: "Industrial Area 3, Riyadh" },
    { name: "Gulf Chemical Supplies", companyName: "GCS Ltd", email: "sales@gulfchem.com", phone: "+971 4 222 1111", address: "Jebel Ali Freezone, Dubai" },
  ];

  const dbSuppliers: Record<string, any> = {};
  for (const s of suppliers) {
    dbSuppliers[s.name] = await prisma.supplier.create({
      data: s,
    });
  }

  // 8. Create Projects
  console.log("Creating Projects...");
  const projects = [
    {
      name: "Sharjah Sewerage RO Installation",
      description: "Installation and telemetry mapping of Reverse Osmosis filtration systems.",
      status: "ACTIVE",
      startDate: new Date("2026-02-01"),
      budget: 450000,
      customerName: "Sharjah Municipality Dept",
    },
    {
      name: "Jebel Ali Industrial Filtration Upgrade",
      description: "Replacement of industrial carbon filters and SCADA controller upgrades.",
      status: "PLANNING",
      startDate: new Date("2026-09-10"),
      budget: 185000,
      customerName: "Al-Khaleej Water Assets",
    },
    {
      name: "Burj District Desalination Pipeline",
      description: "Laying 3km of steel core utility pipelines for irrigation distribution.",
      status: "COMPLETED",
      startDate: new Date("2025-05-01"),
      endDate: new Date("2026-01-20"),
      budget: 890000,
      customerName: "Emaar Properties PJSC",
    },
  ];

  const dbProjects: Record<string, any> = {};
  for (const p of projects) {
    dbProjects[p.name] = await prisma.project.create({
      data: {
        name: p.name,
        description: p.description,
        status: p.status,
        startDate: p.startDate,
        endDate: p.endDate,
        budget: p.budget,
        customer: {
          connect: { id: dbCustomers[p.customerName].id },
        },
        team: {
          connect: [
            { id: dbEmployees["manager@erp.com"].id },
            { id: dbEmployees["agent@erp.com"].id },
          ],
        },
      },
    });
  }

  // 9. Create Quotations, Invoices, Payments, POs
  console.log("Creating Finance elements...");
  const quoteItems = JSON.stringify([
    { desc: "RO Membrane Module 400GPD", qty: 4, unitPrice: 2200, total: 8800 },
    { desc: "High Pressure Feed Pump 5kW", qty: 2, unitPrice: 6500, total: 13000 },
    { desc: "Control Panel & Cabling", qty: 1, unitPrice: 4200, total: 4200 },
    { desc: "Engineering Commissioning", qty: 10, unitPrice: 250, total: 2500 },
  ]);

  const quotation = await prisma.quotation.create({
    data: {
      quotationNumber: "QT-2026-0001",
      customerId: dbCustomers["Al-Khaleej Water Assets"].id,
      projectId: dbProjects["Jebel Ali Industrial Filtration Upgrade"].id,
      expiryDate: new Date("2026-08-30"),
      totalAmount: 28500,
      status: "APPROVED",
      items: quoteItems,
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-0001",
      customerId: dbCustomers["Sharjah Municipality Dept"].id,
      projectId: dbProjects["Sharjah Sewerage RO Installation"].id,
      dueDate: new Date("2026-08-15"),
      totalAmount: 120000,
      paidAmount: 50000,
      status: "PARTIALLY_PAID",
      items: JSON.stringify([
        { desc: "Reverse Osmosis System Delivery", qty: 1, unitPrice: 90000, total: 90000 },
        { desc: "Piping works and installation", qty: 1, unitPrice: 30000, total: 30000 },
      ]),
    },
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoice.id,
      amount: 50000,
      method: "BANK_TRANSFER",
      reference: "TXN-99882200",
    },
  });

  await prisma.purchaseOrder.create({
    data: {
      poNumber: "PO-2026-0001",
      supplierId: dbSuppliers["HydroFlow Pumps Corp"].id,
      totalAmount: 18500,
      status: "SENT",
      items: JSON.stringify([
        { desc: "Industrial Water Filter Pack", qty: 5, unitPrice: 3700, total: 18500 },
      ]),
    },
  });

  // 10. Tasks
  console.log("Creating Tasks...");
  await prisma.task.create({
    data: {
      title: "Purification filter replacements at Site-04",
      description: "Change carbon blocks and run pressure test.",
      status: "TODO",
      priority: "HIGH",
      dueDate: new Date("2026-07-25"),
      assigneeId: dbUsers["agent@erp.com"].id,
      projectId: dbProjects["Sharjah Sewerage RO Installation"].id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Collect water pressure telemetry readings",
      description: "Gather telemetry output and post in report log.",
      status: "DONE",
      priority: "MEDIUM",
      dueDate: new Date("2026-07-15"),
      assigneeId: dbUsers["agent@erp.com"].id,
      projectId: dbProjects["Sharjah Sewerage RO Installation"].id,
    },
  });

  // 11. Attendance
  console.log("Creating Attendance records...");
  const dates = [
    new Date("2026-07-14"),
    new Date("2026-07-15"),
    new Date("2026-07-16"),
  ];

  for (const d of dates) {
    await prisma.attendance.create({
      data: {
        employeeId: dbEmployees["agent@erp.com"].id,
        date: d,
        clockIn: new Date(d.setHours(8, 0, 0)),
        clockOut: new Date(d.setHours(17, 0, 0)),
        status: "PRESENT",
        workHours: 9.0,
      },
    });
  }

  // 12. Leaves
  console.log("Creating Leave records...");
  await prisma.leave.create({
    data: {
      employeeId: dbEmployees["agent@erp.com"].id,
      type: "ANNUAL",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-05"),
      status: "PENDING",
      reason: "Family summer vacation travel.",
    },
  });

  // 13. Payroll
  console.log("Creating Payroll logs...");
  await prisma.payroll.create({
    data: {
      employeeId: dbEmployees["agent@erp.com"].id,
      month: 6,
      year: 2026,
      basicSalary: 6200,
      allowances: 350,
      deductions: 0,
      netSalary: 6550,
      status: "PAID",
      paymentDate: new Date("2026-06-30"),
    },
  });

  // 14. Documents
  console.log("Creating Documents...");
  await prisma.document.create({
    data: {
      name: "Sharjah_RO_Schematics.pdf",
      type: "DRAWING",
      fileUrl: "/mock-docs/Sharjah_RO_Schematics.pdf",
      fileSize: "2.4 MB",
      uploadedById: dbUsers["manager@erp.com"].id,
      projectId: dbProjects["Sharjah Sewerage RO Installation"].id,
    },
  });

  await prisma.document.create({
    data: {
      name: "Al_Khaleej_Proposal.docx",
      type: "CONTRACT",
      fileUrl: "/mock-docs/Al_Khaleej_Proposal.docx",
      fileSize: "1.1 MB",
      uploadedById: dbUsers["sales@erp.com"].id,
      projectId: dbProjects["Jebel Ali Industrial Filtration Upgrade"].id,
    },
  });

  // 15. Audit Logs & Notifications
  console.log("Creating Logs and notifications...");
  await prisma.notification.create({
    data: {
      title: "New Quotation Approved",
      message: "Quotation QT-2026-0001 has been approved by Al-Khaleej Water Assets.",
      userId: dbUsers["manager@erp.com"].id,
      isRead: false,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: dbUsers["it@erp.com"].id,
      action: "ROLE_UPDATE",
      details: "Assigned MANAGER role permissions mapping to user Ahmed Manager.",
      ipAddress: "192.168.1.100",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
