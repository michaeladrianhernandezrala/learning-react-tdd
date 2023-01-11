export const toContainText = (received, expectedText) => ({
  pass: received.textContent.includes(expectedText),
});

const stripTerminalColor = (text) => text.replace(/\x1B\[\d+m/g, "");
