export const renderNav = (quantities, { currentPage, currentQuantity, version } = {}) => {
  const container = document.getElementById("navLinks");
  if (!container) return;

  const entries = [
    { href: "/home", label: "Home", active: currentPage === "home" },
    ...quantities.map((q) => ({
      href: `/quantity?q=${q.id}`,
      label: q.label,
      active: currentPage === "quantity" && currentQuantity === q.id
    })),
    { href: "/visual-tests", label: "Visual Tests", active: currentPage === "visual-tests" },
    { href: "/about", label: "About", active: currentPage === "about" }
  ];

  container.innerHTML = entries
    .map(({ href, label, active }) =>
      `<a href="${href}" class="nav-link${active ? " active-link" : ""}">${label}</a>`
    )
    .join("");

  const versionEl = document.getElementById("heroVersion");
  if (versionEl && version) versionEl.textContent = version;
};
