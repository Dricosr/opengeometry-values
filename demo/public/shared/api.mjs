export const loadLibrary = async () => {
  const response = await fetch("/api/library");
  return response.json();
};

export const postPreview = async (payload) => {
  const response = await fetch("/api/preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
};
