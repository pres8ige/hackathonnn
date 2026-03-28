const form = document.getElementById("complaint-form");
const statusLabel = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    statusLabel.textContent = "Processing complaint...";

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed.");
      }

      statusLabel.textContent = "Complaint stored successfully. Reloading dashboard...";
      window.location.reload();
    } catch (error) {
      statusLabel.textContent = error.message;
    }
  });
}
