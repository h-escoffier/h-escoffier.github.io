const box = document.getElementById("displayBox");
const links = document.querySelectorAll(".nav-links a");
const defaultColor = "#111";
const defaultAnim = document.getElementById("defaultAnimation");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    const newColor = link.getAttribute("data-color");
    box.style.backgroundColor = newColor;
    defaultAnim.style.opacity = "0";
    defaultAnim.style.transform = "scale(0.9)";
  });

  link.addEventListener("mouseleave", () => {
    box.style.backgroundColor = defaultColor;
    defaultAnim.style.opacity = "1";
    defaultAnim.style.transform = "scale(1)";
  });
});