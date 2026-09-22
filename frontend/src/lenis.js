export const lenisStore = { instance: null };

export function scrollToId(id) {
  const target = `#${id}`;
  if (lenisStore.instance) {
    lenisStore.instance.scrollTo(target, { offset: -72, duration: 1.4 });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}
