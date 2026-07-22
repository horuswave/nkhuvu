import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Helper to generate random dates
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to pick random item from array
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Sample data for realistic guests
const firstNames = [
  "João", "Maria", "José", "Ana", "Pedro", "Sofia", "Miguel", "Beatriz", "António", "Carolina",
  "Manuel", "Inês", "Francisco", "Mariana", "Tiago", "Laura", "Diogo", "Rita", "Ricardo", "Catarina",
  "Anderson", "Anastácia", "Carlos", "Elena", "Fernando", "Isabel", "Hugo", "Marta", "Paulo", "Sandra",
  "Nuno", "Patrícia", "Rui", "Cristina", "Bruno", "Daniela", "Filipe", "Tânia", "André", "Vera",
  "Marcelo", "Lúcia", "Sérgio", "Helena", "Vítor", "Cláudia", "Jorge", "Mónica", "Luís", "Raquel"
];

const lastNames = [
  "Silva", "Santos", "Ferreira", "Pereira", "Oliveira", "Costa", "Rodrigues", "Martins", "Jesus", "Sousa",
  "Fernandes", "Gonçalves", "Gomes", "Lopes", "Marques", "Alves", "Almeida", "Ribeiro", "Pinto", "Carvalho",
  "Teixeira", "Moreira", "Correia", "Mendes", "Nunes", "Vieira", "Monteiro", "Cardoso", "Rocha", "Raposo",
  "Macuche", "Muhongo", "Chissano", "Mondlane", "Dlakhama", "Muianga", "Timane", "Muchanga", "Nuvunga", "Matsinhe"
];

const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com", "live.com"];

const generateEmail = (firstName: string, lastName: string) => {
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
  return `${cleanFirst}.${cleanLast}@${randomItem(domains)}`;
};

const generatePhone = () => {
  const prefixes = ["+258", "258"];
  const prefix = randomItem(prefixes);
  const numbers = ["82", "83", "84", "85", "86", "87"];
  const number = randomItem(numbers) + Math.floor(10000000 + Math.random() * 90000000);
  return prefix + number;
};

async function main() {
  console.log("🌱 Starting seed...\n");

  // ============================================
  // 1. SEED ADMIN USER
  // ============================================
  const adminEmail = "andersonmacuche@gmail.com";
  const adminPassword = "Macucha16";

  console.log("👤 Seeding admin user...");
  
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  let admin;
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    admin = await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash: passwordHash,
        name: "Anderson Macuche",
        isSuperAdmin: true,
      },
    });
    console.log(`✅ Admin created: ${admin.email}`);
  } else {
    if (!existingAdmin.isSuperAdmin) {
      admin = await prisma.adminUser.update({
        where: { id: existingAdmin.id },
        data: { isSuperAdmin: true },
      });
      console.log(`✅ Updated admin to superadmin: ${admin.email}`);
    } else {
      admin = existingAdmin;
      console.log(`✅ Admin already exists: ${admin.email}`);
    }
  }

  // ============================================
  // 2. SEED PACKAGES
  // ============================================
  console.log("\n📦 Seeding packages...");
  
  const packages = [
    {
      name: "Starter",
      price: 1500,
      currency: "MZN",
      maxEvents: 1,
      maxGuests: 50,
      features: ["1 Event", "Up to 50 guests", "Basic customization", "Email invitations", "RSVP tracking", "1 month support"],
    },
    {
      name: "Professional",
      price: 3000,
      currency: "MZN",
      maxEvents: 3,
      maxGuests: 200,
      features: ["3 Events", "Up to 200 guests", "Advanced customization", "Email & SMS invitations", "RSVP tracking", "Table management", "Gift registry", "3 months support"],
    },
    {
      name: "Enterprise",
      price: 6000,
      currency: "MZN",
      maxEvents: 99999,
      maxGuests: 99999,
      features: ["Unlimited Events", "Unlimited guests", "Full white-label customization", "Email, SMS & WhatsApp invitations", "Advanced RSVP analytics", "Table & seating management", "Gift registry", "Priority support", "Custom domain"],
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
    console.log(`  ✓ Package: ${pkg.name}`);
  }

  // ============================================
  // 3. CREATE SUBSCRIPTION FOR ADMIN
  // ============================================
  console.log("\n💳 Creating subscription for admin...");
  
  const professionalPackage = await prisma.package.findUnique({
    where: { name: "Professional" },
  });

  if (professionalPackage) {
    const existingSubscription = await prisma.subscription.findUnique({
      where: { adminUserId: admin.id },
    });

    if (!existingSubscription) {
      await prisma.subscription.create({
        data: {
          adminUserId: admin.id,
          packageId: professionalPackage.id,
          status: "ACTIVE",
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        },
      });
      console.log(`  ✅ Subscription created: Professional package`);
    } else {
      console.log(`  ✅ Subscription already exists`);
    }
  }

  // ============================================
  // 4. CREATE MOCK EVENT
  // ============================================
  console.log("\n🎉 Creating mock event...");
  
  const eventDate = new Date("2025-12-15");
  eventDate.setHours(14, 0, 0, 0); // 2:00 PM

  const event = await prisma.event.create({
    data: {
      title: "Wedding of Anderson & Anastácia",
      coupleNames: "Anderson & Anastácia",
      date: eventDate,
      time: "14:00",
      venue: "Grand Hotel Maputo",
      address: "Avenida Martires de Mueda, 707, Maputo, Mozambique",
      mapUrl: "https://maps.google.com/?q=Grand+Hotel+Maputo",
      dressCode: "Formal / Black Tie",
      message: "We are thrilled to invite you to celebrate our special day with us. Your presence will make this moment even more memorable as we begin our journey together.",
      rules: "Please RSVP by December 1st, 2025. Children are welcome. We look forward to sharing this beautiful day with you.",
      supportEmail: adminEmail,
      supportPhone: "+258829000000",
      primaryColor: "#c8890e",
      accentColor: "#0e0b07",
      backgroundStyle: "DARK",
      themeId: "classic",
      fontDisplay: "Cormorant Garamond",
      fontBody: "Jost",
      heroSubtitle: "Together with their families",
      anniversaryLabel: "Wedding Ceremony",
      heroFooterText: "Dinner, dancing, and celebration to follow",
      programTitle: "Wedding Program",
      programSubtitle: "A day filled with love, laughter, and celebration",
      programItems: [
        { id: "1", type: "ceremony", label: "Wedding Ceremony", time: "14:00", notes: "Please arrive 15 minutes early" },
        { id: "2", type: "cocktail", label: "Cocktail Reception", time: "15:30", notes: "Light refreshments served" },
        { id: "3", type: "dinner", label: "Dinner Service", time: "17:00", notes: "Three-course meal" },
        { id: "4", type: "speeches", label: "Speeches & Toasts", time: "19:00", notes: "Family and friends share their wishes" },
        { id: "5", type: "dancing", label: "First Dance & Celebration", time: "20:00", notes: "Dance the night away!" },
      ],
      giftListIntro: "Your presence is the greatest gift, but if you wish to honor us with a gift, we have registered at:",
      giftListPhysicalTitle: "Physical Gifts",
      giftListMonetaryTitle: "Monetary Gifts",
      giftList: [
        { id: "1", type: "physical", name: "Kitchen Appliances Set", description: "Help us set up our dream kitchen", store: "Various retailers" },
        { id: "2", type: "physical", name: "Bedroom Furniture", description: "A comfortable space to call home", store: "IKEA" },
        { id: "3", type: "monetary", name: "Honeymoon Fund", description: "Contribute to our dream honeymoon in Maldives", account: "Details provided separately" },
      ],
      rsvpTitle: "RSVP",
      rsvpSubtitle: "Kindly respond by December 1st, 2025",
      rsvpAttendingLabel: "Joyfully Accepts",
      rsvpNotAttendingLabel: "Regretfully Declines",
      rsvpCompanionsLabel: "Number of Guests",
      rsvpAddCompanionLabel: "Add Companion",
      rsvpDietaryLabel: "Dietary Restrictions",
      rsvpTransportLabel: "Transportation Needs",
      rsvpMessageLabel: "Message for the Couple",
      rsvpSubmitAttending: "Confirm Attendance",
      rsvpSubmitNotAttending: "Send Regrets",
      rsvpUpdateButton: "Update RSVP",
      rsvpAlreadyResponded: "You have already submitted your RSVP. You can update your response below.",
      detailsSectionTitle: "Event Details",
      detailsContactText: "For any questions, please contact us at",
    },
  });

  console.log(`  ✅ Event created: ${event.title} (ID: ${event.id})`);

  // Link admin to event
  await prisma.eventAdmin.create({
    data: {
      adminUserId: admin.id,
      eventId: event.id,
    },
  });
  console.log(`  ✅ Admin linked to event`);

  // ============================================
  // 5. CREATE 200 GUESTS (WITH COUPLES)
  // ============================================
  console.log("\n👥 Creating 200 guests (including couples)...");
  
  const guests: any[] = [];
  const companions: any[] = [];
  
  // We'll create approximately 150 primary guests
  // About 50 of them will be couples (bringing a companion)
  // This gives us roughly 200 total people
  
  const coupleCount = 50; // Number of couples
  const singleCount = 100; // Number of single guests
  const totalPrimary = coupleCount + singleCount; // 150 primary guests
  
  const rsvpStatuses: Array<"PENDING" | "ATTENDING" | "DECLINED" | "MAYBE"> = ["PENDING", "ATTENDING", "DECLINED", "MAYBE"];
  const contactMethods: Array<"EMAIL" | "WHATSAPP" | "SMS" | "MANUAL"> = ["EMAIL", "WHATSAPP", "SMS", "MANUAL"];

  for (let i = 0; i < totalPrimary; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const isCouple = i < coupleCount;
    const rsvpStatus = randomItem(rsvpStatuses);
    const contactMethod = randomItem(contactMethods);
    
    const guest = await prisma.guest.create({
      data: {
        eventId: event.id,
        primaryName: `${firstName} ${lastName}`,
        email: contactMethod === "EMAIL" ? generateEmail(firstName, lastName) : null,
        phone: contactMethod === "WHATSAPP" || contactMethod === "SMS" ? generatePhone() : null,
        preferredContact: contactMethod,
        maxAllowed: isCouple ? 2 : 1,
        rsvpStatus: rsvpStatus,
        isVip: Math.random() > 0.8, // 20% chance of being VIP
        notes: Math.random() > 0.7 ? randomItem([
          "Vegetarian meal preferred",
          "Allergic to nuts",
          "Requires wheelchair access",
          "Bringing children",
          "Special dietary requirements",
          null, null, null
        ]) : null,
      },
    });

    guests.push(guest);

    // If this is a couple, create a companion
    if (isCouple) {
      const companionFirstName = randomItem(firstNames);
      const companionLastName = lastName; // Same last name for couples
      
      const companion = await prisma.guestCompanion.create({
        data: {
          guestId: guest.id,
          name: `${companionFirstName} ${companionLastName}`,
          dietaryRestrictions: Math.random() > 0.8 ? randomItem([
            "Vegetarian",
            "Vegan",
            "Gluten-free",
            "No shellfish",
            null
          ]) : null,
        },
      });
      
      companions.push(companion);

      // If guest is attending, create RSVP
      if (rsvpStatus === "ATTENDING") {
        await prisma.rsvp.create({
          data: {
            guestId: guest.id,
            attending: true,
            totalAttending: 2,
            dietaryRestrictions: Math.random() > 0.7 ? randomItem([
              "Vegetarian",
              "Vegan",
              "Gluten-free",
              "Nut allergy",
              null
            ]) : null,
            transportNotes: Math.random() > 0.8 ? "Requires parking space" : null,
            coupleMessage: Math.random() > 0.5 ? "So excited to celebrate with you!" : null,
          },
        });
      } else if (rsvpStatus === "DECLINED") {
        await prisma.rsvp.create({
          data: {
            guestId: guest.id,
            attending: false,
            totalAttending: 0,
          },
        });
      }
    } else {
      // Single guest - if attending, create RSVP
      if (rsvpStatus === "ATTENDING") {
        await prisma.rsvp.create({
          data: {
            guestId: guest.id,
            attending: true,
            totalAttending: 1,
            dietaryRestrictions: Math.random() > 0.8 ? randomItem([
              "Vegetarian",
              "Vegan",
              "Gluten-free",
              null
            ]) : null,
            transportNotes: Math.random() > 0.9 ? "Will need shuttle service" : null,
          },
        });
      } else if (rsvpStatus === "DECLINED") {
        await prisma.rsvp.create({
          data: {
            guestId: guest.id,
            attending: false,
            totalAttending: 0,
          },
        });
      }
    }

    // Log progress every 50 guests
    if ((i + 1) % 50 === 0) {
      console.log(`  ✓ Created ${i + 1}/${totalPrimary} guests...`);
    }
  }

  console.log(`\n  ✅ Total guests created: ${guests.length}`);
  console.log(`  ✅ Couples created: ${companions.length}`);
  console.log(`  ✅ Total people: ${guests.length + companions.length}`);

  // ============================================
  // 6. CREATE TABLES
  // ============================================
  console.log("\n🪑 Creating tables...");
  
  const tableNames = [
    "Table 1 - Family", "Table 2 - Friends", "Table 3 - Colleagues", 
    "Table 4 - Neighbors", "Table 5 - Special Guests", "Table 6 - VIP"
  ];

  for (const tableName of tableNames) {
    await prisma.table.create({
      data: {
        eventId: event.id,
        name: tableName,
        capacity: 10,
        notes: `Assigned for ${tableName.split(" - ")[1] || "guests"}`,
      },
    });
    console.log(`  ✓ Created: ${tableName}`);
  }

  // ============================================
  // 7. SUMMARY
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("✨ SEED COMPLETED SUCCESSFULLY!");
  console.log("=".repeat(60));
  console.log("\n📊 Summary:");
  console.log(`  👤 Admin: ${admin.email}`);
  console.log(`  🎉 Event: ${event.title}`);
  console.log(`  📅 Date: ${event.date.toLocaleDateString("en-US", { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}`);
  console.log(`  📍 Venue: ${event.venue}`);
  console.log(`  👥 Total Guests: ${guests.length}`);
  console.log(`  💑 Couples: ${companions.length}`);
  console.log(`  👤👤 Total People: ${guests.length + companions.length}`);
  console.log(`  🪑 Tables: ${tableNames.length}`);
  console.log("\n🔐 Admin Login:");
  console.log(`  Email: ${adminEmail}`);
  console.log(`  Password: ${adminPassword}`);
  console.log("\n" + "=".repeat(60));
}

main()
  .catch((e) => {
    console.error("\n❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });