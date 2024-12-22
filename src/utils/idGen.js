// Function to generate a unique ID
function generateCustomId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

module.exports = { generateCustomId };
