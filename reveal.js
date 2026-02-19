
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const reveal = () => {
    for (const el of reveals) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add("visible");
    }
  };
  window.addEventListener("scroll", reveal);
  reveal();
});
