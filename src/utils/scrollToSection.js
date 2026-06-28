export function scrollToSection(target) {
  const section = document.getElementById(target);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}