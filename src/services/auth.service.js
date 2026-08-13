const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");
const { generateToken } = require("../utils/jwt");
const emailService = require("./email.service");
const { generateResetToken } = require("../utils/token.util");

const login = async (email, password) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.full_name,
      email: admin.email,
      role: admin.role,
    },
  };
};

const forgotPassword = async (email) => {
  const admin = await authRepository.findAdminByEmail(email);

  if (!admin) {
    throw new Error("Admin account not found");
  }

  const token = generateResetToken();

  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  await authRepository.saveResetToken(email, token, expiry);

  const resetUrl = `${process.env.ADMIN_URL}/reset-password?token=${token}`;

  try {
    await emailService.sendEmail({
      to: email,

      subject: "Reset Your Innovise IT Password",

      template: "forgot-password",

      data: {
        name: admin.full_name,

        reset_url: resetUrl,
      },
    });

    console.log("✅ Password reset email sent.");
  } catch (err) {
    console.error("Reset Email Error:", err.message);
  }

  return true;
};

const resetPassword = async (token, newPassword) => {
  const admin = await authRepository.findByResetToken(token);

  if (!admin) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await authRepository.updatePassword(admin.id, hashedPassword);

  // Optional but recommended: invalidate the reset token
  await authRepository.clearResetToken(admin.id);

  console.log("✅ Password updated successfully.");

  return {
    id: admin.id,
    full_name: admin.full_name,
    email: admin.email,
    role: admin.role,
  };
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
