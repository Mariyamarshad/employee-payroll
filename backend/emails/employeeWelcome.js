const employeeWelcomeEmail = (name, email, password) => {
  return `
Hello ${name},

Welcome to TalentTrack!

Your account has been successfully created.

Here are your login credentials:
--------------------------------
Username: ${email}
Password: ${password}
--------------------------------

You can log in to the system and get updates.

Regards,
TalentTrack Team
`;
};

module.exports = employeeWelcomeEmail;
