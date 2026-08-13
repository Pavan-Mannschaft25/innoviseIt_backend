const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");

const adminRepository = require("../repositories/admin.repository");
const emailService = require("./email.service");

const getAll = async (filters) => {
  return await adminRepository.findAll(filters);
};

const getById = async (id) => {
  const admin = await adminRepository.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  return admin;
};

// const create = async (data) => {
//   const existing = await adminRepository.findByEmail(data.email);

//   if (existing) {
//     throw new ApiError(409, "Email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   const id = await adminRepository.create({
//     ...data,
//     password: hashedPassword,
//   });

//   return await adminRepository.findById(id);
// };

const create = async (adminData) => {
  // Check existing email
  const existing = await adminRepository.findByEmail(adminData.email);

  if (existing) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(adminData.password, 10);

  // Save admin
  const id = await adminRepository.create({
    ...adminData,
    password: hashedPassword,
  });

  // Send welcome email
  try {
    await emailService.sendEmail({
      to: adminData.email,

      subject: "Welcome to Innovise IT",

      template: "welcome-admin",

      data: {
        name: adminData.full_name,

        email: adminData.email,

        role: adminData.role,

        login_url: `${process.env.ADMIN_URL}/login`,
      },
    });

    console.log("✅ Welcome email sent.");
  } catch (err) {
    console.error("Welcome Email Error:", err.message);
  }

  return {
    id,

    full_name: adminData.full_name,

    email: adminData.email,

    role: adminData.role,
  };
};

const update = async (id, data) => {
  const admin = await adminRepository.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  await adminRepository.update(id, data);

  return await adminRepository.findById(id);
};

const updateRole = async (id, role) => {
  const admin = await adminRepository.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  await adminRepository.updateRole(id, role);

  return await adminRepository.findById(id);
};

const updatePassword = async (id, password) => {
  const admin = await adminRepository.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const hashed = await bcrypt.hash(password, 10);

  await adminRepository.updatePassword(id, hashed);
};

const remove = async (id) => {
  const admin = await adminRepository.findById(id);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  if (admin.role === "Super Admin") {
    const admins = await adminRepository.findAll();

    const superAdmins = admins.filter((a) => a.role === "Super Admin");

    if (superAdmins.length === 1) {
      throw new ApiError(400, "Cannot delete last Super Admin");
    }
  }

  await adminRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateRole,
  updatePassword,
  remove,
};
