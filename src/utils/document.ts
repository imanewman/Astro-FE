/**
 * Creates a script element from the given source.
 *
 * @param src - The script source path.
 * @param position - The element position of the script.
 * @param id - The id of the script.
 */
export function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

/**
 * Loads and mounts a script.
 * @param src - The script source.
 * @param id - The element ID to use.
 */
export function mountScript(
  src: string,
  id: string,
) {
  if (typeof window !== "undefined" && !document.querySelector(`#${id}`)) {
    loadScript(
      src,
      document.querySelector("head"),
      id,
    );
  }
}

export default { loadScript, mountScript };
