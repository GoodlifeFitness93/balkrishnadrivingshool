import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div"
}) {
  const ref = reactExports.useRef(null);
  const [shown, setShown] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  const Comp = Tag;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ref, className: `reveal ${shown ? "reveal-in" : ""} ${className}`, children });
}
function Counter({ to, suffix = "", duration = 1600 }) {
  const ref = reactExports.useRef(null);
  const [val, setVal] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const start = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - start) / duration);
          setVal(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    val.toLocaleString(),
    suffix
  ] });
}
export {
  Counter as C,
  Reveal as R
};
