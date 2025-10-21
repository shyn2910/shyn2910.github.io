// fireworks.js - Hiệu ứng pháo hoa khi thắng
export function showFireworks(message = "CHÚC MỪNG!!!", color = "#ff0") {
  const container = document.createElement("div");
  container.className = "fireworks-container";
  container.innerHTML = `<h1 class="fireworks-text" style="color:${color}">${message}</h1>`;
  document.body.appendChild(container);

  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}vw`;
    p.style.backgroundColor = color;
    container.appendChild(p);
  }

  setTimeout(() => container.remove(), 5000);
}
