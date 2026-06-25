export const getApiErrorMessage = (error, fallback) => {
  const message = error?.response?.data?.message;

  if (Array.isArray(message)) {
    return message.join(" ");
  }

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  return fallback;
};
