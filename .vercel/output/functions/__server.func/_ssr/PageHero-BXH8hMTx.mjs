import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
function PageHero({
  title,
  subtitle,
  breadcrumb,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-navy pt-28 pb-16 text-white md:pt-36 md:pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_70%_30%,rgb(232_35_10/0.6),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 md:px-8", children: [
      breadcrumb && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 text-xs uppercase tracking-[0.3em] text-white/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white", children: "Home" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "/" }),
        " ",
        breadcrumb
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-3xl font-display text-4xl font-black leading-[1.05] md:text-6xl", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-base text-white/75 md:text-lg", children: subtitle }),
      children
    ] })
  ] });
}
export {
  PageHero as P
};
