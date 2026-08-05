require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test connection
    await pool.query("SELECT 1");

    // Show connected database
    const [db] = await pool.query("SELECT DATABASE() AS database_name");
    console.log("✅ MySQL Connected");
    console.log("📂 Database:", db[0].database_name);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
  }
}

startServer();
