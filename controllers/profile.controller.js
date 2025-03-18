const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create new profile
async function createProfile(req, res) {
  const { name, address, telp } = req.body;

  const findData = await prisma.profile.findFirst({ where: { name } });

  if (findData) {
    return res.status(409).json({
      status: false,
      message: "data already exist",
    });
  }

  const profile = await prisma.profile.create({
    data: {
      name,
      address,
      telp,
    },
  });

  return res.status(201).json({
    status: true,
    message: "created successfully",
    data: profile,
  });
}

module.exports = {
  createProfile,
};
