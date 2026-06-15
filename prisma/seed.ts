import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";
async function main() {
  const superadminEmail = "andersonmacuche@gmail.com";
  const superadminPassword = "Macucha16";

  // Check if superadmin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: superadminEmail },
  });

  if (!existingAdmin) {
    // Hash the password (match your app's hashing method)
    const passwordHash = await bcrypt.hash(superadminPassword, 10);

    // Create superadmin
    const superadmin = await prisma.adminUser.create({
      data: {
        email: superadminEmail,
        passwordHash: passwordHash,
        name: "Super Administrator",
        isSuperAdmin: true,
      },
    });

    console.log("Superadmin created:", superadmin.email);
  } else {
    // Optionally update existing admin to superadmin
    if (!existingAdmin.isSuperAdmin) {
      await prisma.adminUser.update({
        where: { id: existingAdmin.id },
        data: { isSuperAdmin: true },
      });
      console.log("Updated existing admin to superadmin");
    } else {
      console.log("Superadmin already exists");
    }
  }

  // Seed Packages
  const packages = [
    {
      name: "Starter",
      price: 1500,
      currency: "MZN",
      maxEvents: 1,
      maxGuests: 50,
      features: [
        "1 Event",
        "Up to 50 guests",
        "Basic customization",
        "Email invitations",
        "RSVP tracking",
        "1 month support",
      ],
    },
    {
      name: "Professional",
      price: 3000,
      currency: "MZN",
      maxEvents: 3,
      maxGuests: 200,
      features: [
        "3 Events",
        "Up to 200 guests",
        "Advanced customization",
        "Email & SMS invitations",
        "RSVP tracking",
        "Table management",
        "Gift registry",
        "3 months support",
      ],
    },
    {
      name: "Enterprise",
      price: 6000,
      currency: "MZN",
      maxEvents: 99999,
      maxGuests: 99999,
      features: [
        "Unlimited Events",
        "Unlimited guests",
        "Full white-label customization",
        "Email, SMS & WhatsApp invitations",
        "Advanced RSVP analytics",
        "Table & seating management",
        "Gift registry",
        "Priority support",
        "Custom domain",
      ],
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {
        price: pkg.price,
        currency: pkg.currency,
        maxEvents: pkg.maxEvents,
        maxGuests: pkg.maxGuests,
        features: pkg.features,
      },
      create: {
        name: pkg.name,
        price: pkg.price,
        currency: pkg.currency,
        maxEvents: pkg.maxEvents,
        maxGuests: pkg.maxGuests,
        features: pkg.features,
      },
    });
    console.log(`Upserted package: ${pkg.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
