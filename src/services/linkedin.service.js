// const axios = require("axios");

// /**
//  * Post a job update to LinkedIn (Personal Profile or Company Page)
//  */
// const postJobToLinkedIn = async (job) => {
//   const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
//   const orgId = process.env.LINKEDIN_ORG_ID;
//   const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

//   if (!accessToken) {
//     console.warn("LinkedIn Access Token missing. Skipping social post.");
//     return null;
//   }

//   const jobUrl = `${frontendUrl}/careers/jobdetails/${job.id}`;

//   const shareText = `🚀 We are hiring!

// We are looking for a ${job.title} to join our ${job.department_name || "team"}.

// Location: ${job.location}
// Type: ${job.employment_type}

// Apply now: ${jobUrl}`;

//   const url = "https://api.linkedin.com/rest/posts";

//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     "X-Restli-Protocol-Version": "2.0.0",
//     "Content-Type": "application/json",
//     "LinkedIn-Version": "202608",
//   };

//   let authorUrn;

//   try {
//     if (orgId) {
//       authorUrn = `urn:li:organization:${orgId}`;
//     } else {
//       // Use userinfo endpoint (requires openid scope)
//       const profileRes = await axios.get(
//         "https://api.linkedin.com/v2/userinfo",
//         { headers },
//       );
//       authorUrn = `urn:li:person:${profileRes.data.sub}`;
//     }
//   } catch (error) {
//     console.error(
//       "Error fetching LinkedIn author ID:",
//       error.response?.data || error.message,
//     );
//     return null;
//   }

//   const body = {
//     author: authorUrn,
//     lifecycleState: "PUBLISHED",
//     visibility: "PUBLIC",
//     commentary: shareText,
//     distribution: {
//       feedDistribution: "MAIN_FEED",
//       targetEntities: [],
//       thirdPartyDistributionChannels: [],
//     },
//   };

//   try {
//     const response = await axios.post(url, body, { headers });
//     console.log(
//       "✅ Successfully posted to LinkedIn! Post ID:",
//       response.headers["x-restli-id"],
//     );
//     return response.headers["x-restli-id"];
//   } catch (error) {
//     console.error(
//       "❌ Error posting to LinkedIn:",
//       error.response?.data || error.message,
//     );
//     return null; // We return null so the job creation doesn't fail if LinkedIn fails
//   }
// };

// module.exports = {
//   postJobToLinkedIn,
// };

const axios = require("axios");

/**
 * Post a job update to LinkedIn (Personal Profile or Company Page)
 */
const postJobToLinkedIn = async (job) => {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORG_ID;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  if (!accessToken) {
    console.warn("LinkedIn Access Token missing. Skipping social post.");
    return null;
  }

  const jobUrl = `${frontendUrl}/careers/jobdetails/${job.id}`;

  // Enhanced, eye-catching LinkedIn post format
  const shareText = `🚀 We are hiring a ${job.title}!

🏢 Department: ${job.department_name || "General"}
📍 Location: ${job.location}
💼 Type: ${job.employment_type}
⏳ Experience: ${job.experience_level || "N/A"}

Join our team and be part of something great! If you or someone you know is looking for a new opportunity, we'd love to hear from you.

👉 Apply directly here: ${jobUrl}`;

  const url = "https://api.linkedin.com/rest/posts";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "X-Restli-Protocol-Version": "2.0.0",
    "Content-Type": "application/json",
    "LinkedIn-Version": "202608",
  };

  let authorUrn;

  try {
    if (orgId) {
      authorUrn = `urn:li:organization:${orgId}`;
    } else {
      // Use userinfo endpoint (requires openid scope)
      const profileRes = await axios.get(
        "https://api.linkedin.com/v2/userinfo",
        { headers },
      );
      authorUrn = `urn:li:person:${profileRes.data.sub}`;
    }
  } catch (error) {
    console.error(
      "Error fetching LinkedIn author ID:",
      error.response?.data || error.message,
    );
    return null;
  }

  const body = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    visibility: "PUBLIC",
    commentary: shareText,
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log(
      "✅ Successfully posted to LinkedIn! Post ID:",
      response.headers["x-restli-id"],
    );
    return response.headers["x-restli-id"];
  } catch (error) {
    console.error(
      "❌ Error posting to LinkedIn:",
      error.response?.data || error.message,
    );
    return null; // We return null so the job creation doesn't fail if LinkedIn fails
  }
};

module.exports = {
  postJobToLinkedIn,
};
