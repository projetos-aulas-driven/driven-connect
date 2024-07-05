import prisma from "../src/database";

async function main() {
  await prisma.contact.upsert({
    where: { fullname: "Polícia" },
    update: {},
    create: {
      fullname: "Polícia",
      phones: {
        create: {
          number: "190"
        }
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });