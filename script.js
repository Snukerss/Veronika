document.addEventListener("DOMContentLoaded", () => {
  // 1. Якщо фото не знайдено — показуємо ініціали замість нього
  const photo = document.getElementById("photo");
  if (photo) {
    photo.addEventListener("error", () => {
      const holder = photo.parentElement;
      photo.remove();
      holder.style.display = "flex";
      holder.style.alignItems = "center";
      holder.style.justifyContent = "center";
      holder.style.color = "#54483e";
      holder.style.fontSize = "56px";
      holder.style.fontWeight = "700";
      holder.textContent = "ГВ";
    });
  }

  // 2. Плавна поява блоків
  const blocks = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    blocks.forEach((el, i) => {
      el.style.transitionDelay = `${i * 120}ms`;
      observer.observe(el);
    });
  } else {
    blocks.forEach((el) => el.classList.add("visible"));
  }

  // 3. Кнопка «Зберегти як PDF»
  const printBtn = document.getElementById("printBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
});
