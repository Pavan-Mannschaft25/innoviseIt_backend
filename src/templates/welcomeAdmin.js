// module.exports = (name) => `

// <h2>Welcome</h2>

// <p>

// Hello ${name},

// </p>

// <p>

// Your administrator account has been created.

// </p>

// `;

module.exports = (name) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to Innovise IT</title>
</head>

<body style="font-family: Arial, sans-serif; background:#f4f6f9; padding:40px;">

<div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; padding:30px;">

<h2 style="color:#0B2A4A;">
Welcome to Innovise IT
</h2>

<p>Hello <strong>${name}</strong>,</p>

<p>
Your administrator account has been successfully created.
</p>

<p>
You can now log in to the Innovise Careers Admin Portal using your registered email address.
</p>

<p>
If you did not expect this account, please contact the system administrator immediately.
</p>

<br>

<p>
Regards,<br>
<strong>Innovise IT Team</strong>
</p>

</div>

</body>
</html>
`;
