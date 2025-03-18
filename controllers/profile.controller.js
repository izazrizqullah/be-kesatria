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

// get all new profile
async function getAllProfile(req, res) {
  const findData = await prisma.profile.findMany();

  if (!findData) {
    return res.status(404).json({
      status: false,
      message: "data profile not found",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "get data profile successfully",
    data: findData,
  });
}

// get profile by id
async function getProfileById(req, res) {
  const { id } = req.params;

  const findData = await prisma.profile.findFirst({
    where: { id: Number(id) },
  });

  if (!findData) {
    return res.status(404).json({
      status: false,
      message: "data profile not found",
    });
  }

  return res.status(200).json({
    status: true,
    message: "get profile by id successfull",
    data: findData,
  });
}

// update data profile by id
async function updateProfileById(req, res) {
  const { id } = req.params;
  const { name, address, telp } = req.body;

  const findData = await prisma.profile.findFirst({
    where: { id: Number(id) },
  });

  if (!findData) {
    return res.status(404).json({
      status: false,
      message: "data profile not found",
    });
  }

  const profile = await prisma.profile.update({
    where: { id: Number(id) },
    data: {
      name: name || findData.name,
      address: address || findData.address,
      telp: telp || findData.telp,
    },
  });

  return res.status(200).json({
    status: true,
    message: "updated successfully",
    data: profile,
  });
}

// delete profile by id
async function deleteProfileById(req, res) {
  const { id } = req.params;

  const findData = await prisma.profile.findFirst({
    where: { id: Number(id) },
  });

  if (!findData) {
    return res.status(404).json({
      status: false,
      message: "data profile not found",
    });
  }

  const profile = await prisma.profile.delete({ where: { id: Number(id) } });

  return res.status(200).json({
    status: true,
    message: "deleted successfully",
    data: profile,
  });
}

module.exports = {
  createProfile,
  getAllProfile,
  getProfileById,
  updateProfileById,
  deleteProfileById,
};
