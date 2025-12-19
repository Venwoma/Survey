var R = Object.defineProperty;
var _ = (e, t, r) => t in e ? R(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var d = (e, t, r) => _(e, typeof t != "symbol" ? t + "" : t, r);
const j = Object.keys, m = (e, t) => (r) => t(e[r], r, e), p = (e) => (t, r) => {
  var n, o;
  return (o = (n = j(t))[e]) == null ? void 0 : o.call(n, m(t, r));
}, x = ["forEach", "map", "some", "every"], h = x.reduce((e, t) => (e[t] = p(t), e), {});
h.find = (e, t) => {
  const r = p("find")(e, t);
  return r ? { key: r, value: e[r] } : void 0;
};
h.filter = (e, t) => {
  const r = p("filter")(e, t), n = /* @__PURE__ */ Object.create({
    keys() {
      return Object.keys(this);
    },
    values() {
      return Object.values(this);
    },
    get size() {
      var o;
      return ((o = this.keys()) == null ? void 0 : o.length) || 0;
    }
  });
  return Object.assign(
    n,
    r.reduce((o, u) => (o[u] = e[u], o), {})
  ), n;
};
globalThis.auxiliaryVars = globalThis.auxiliaryVars || {
  onloaded: !1,
  watchProperties: {}
  // 需要共享的数据集合
};
const { auxiliaryVars: y } = globalThis;
class O {
  constructor(t) {
    this.value = t;
  }
  toString() {
    return (this == null ? void 0 : this.value) || "";
  }
  toOrigin() {
    return JSON.parse(JSON.stringify(y.watchProperties));
  }
}
d(O, "name", "ObserverData");
const b = (e, t, r = !1) => {
  let n = y.watchProperties[e];
  return n && !r ? n : (n = typeof t == "function" ? t() : t, y.watchProperties[e] = new Proxy(new O(n), {
    get(o, u) {
      return Reflect.get(o, u);
    },
    set(...o) {
      return Reflect.set(...o);
    }
  }));
}, P = (e) => Reflect.deleteProperty(y.watchProperties, e), S = (e) => {
  var t;
  return ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.name) === "ObserverData";
}, $ = (e = "localStorage") => (t, r, n) => {
  const o = globalThis[e];
  let u = "";
  return o[t] && !n ? u = o[t] : u = o[t] = typeof r == "function" ? r() : r, new Proxy(new O(u), {
    get(i, s) {
      return i[s];
    },
    set(i, s, c) {
      return s === "value" && (c === null ? o.removeItem(i, s) : o.setItem(i, s, c)), Reflect.set(i, s, c);
    }
  });
}, T = $(), I = $("sessionStorage"), M = (e = () => {
}, t = !1) => (...r) => {
  try {
    return t ? Promise[e(...r) ? "resolve" : "reject"] : e(...r);
  } catch (n) {
    console.warn(n);
  }
}, E = (e, t) => (r, n, ...o) => {
  const u = typeof r == "function" ? r() : r;
  return u === e || (e = u, t = n(...o)), t;
}, v = function(e, t = 300, r) {
  return function(...n) {
    return e.$beDaley && clearTimeout(e.$beDaley), new Promise((o) => {
      e.$beDaley = setTimeout((u) => {
        var i;
        r == null || r(e.call(this, ...n)), o((i = e == null ? void 0 : e.call) == null ? void 0 : i.call(e, this, ...n)), e.$beDaley = void 0;
      }, t);
    });
  };
}, D = (e, t) => {
  typeof e == "object" && (t = e, e = null);
  const r = /* @__PURE__ */ new WeakMap();
  let n = null;
  const o = (s) => {
    s.close = () => {
      s.disconnect();
    }, s.add = (c) => c ? (s.observe(c), n = c, r.set(c, null), s) : n = null, s.then = (c) => {
      if (n)
        return r.set(n, c), s;
    }, s.remove = (c) => (s.unobserve(c), r.delete(c), s), s.finally = function(c) {
      return r.finally = c, s;
    }, s.show = function() {
      return console.log(r, "mapList"), s;
    }, s.map = function(c) {
      return (Array.isArray(c) ? c : Array.from(c)).forEach((l) => s.add(l)), s;
    };
  }, u = {
    threshold: [0, 0.1, 0.99],
    type: "intersection",
    ...t
  }, i = {
    intersection: IntersectionObserver,
    resize: ResizeObserver,
    mutation: MutationObserver
  }[u.type];
  try {
    if (!i) throw { errorMessage: "createObserver:构造函数不存在" };
    const s = new i((c) => {
      var a;
      c.forEach((l) => {
        var g;
        (g = r.get(l.target)) == null || g(l.isIntersecting || l.contentRect, l);
      }), typeof e == "function" && e(c), r.finally && ((a = r.finally) == null || a.call(r, c));
    }, u);
    return o(s), Object.create(s);
  } catch (s) {
    console.error(s.errorMessage || s);
  }
}, L = (e) => Object.prototype.toString.call(e).slice(8, -1).toLowerCase(), C = (...e) => (...t) => {
  try {
    return e.reduceRight((r, n, o) => {
      if (typeof n != "function") throw new Error("Each parameter of the 'compose' function must be a function.");
      return e.length - 1 === o ? n(...t) : n(r);
    }, t);
  } catch (r) {
    console.log("error source: compose function", r);
  }
}, z = (...e) => async (...t) => {
  try {
    const r = e.reverse();
    let n = 0, o = "";
    for await (const u of r)
      o = await (n === 0 ? u(...t) : u(o)), n++;
    return o;
  } catch (r) {
    console.log("error source: compose function", r);
  }
}, A = (...e) => (...t) => {
  let r = 0;
  const n = e.reduce((u, i, s) => (typeof i == "object" ? (u = Object.assign(i, u), r = 1) : u[i] = t[s], u), {}), o = (t == null ? void 0 : t[e.length - r]) || {};
  return {
    ...n,
    ...o
  };
}, f = "use", H = (e, t = {}) => {
  const [r, n] = [e, t == null ? void 0 : t.getCurrentInstance];
  Object.assign(r, {
    [`${f}Instance`]: () => n().proxy,
    [`${f}Router`]: () => n().proxy.$router,
    [`${f}Route`]: () => n().proxy.$route,
    [`${f}State`]: () => {
      var o;
      return (o = n().proxy.$store) == null ? void 0 : o.state;
    },
    [`${f}Refs`]: () => n().proxy.$refs,
    [`${f}Options`]: (o) => Object.assign(n().proxy.$options, o),
    [`${f}ReplaceRoute`]() {
      const o = ({ path: i = "", query: s = {} } = {}) => `${i}${i.includes("?") ? "&" : Object.keys(s).length ? "?" : ""}${Object.keys(s).reduce(
        (c, a, l) => `${c}${l ? "&" : ""}${a}=${s[a]}`,
        ""
      )}`, u = (i) => Promise.resolve(history.replaceState(null, null, o(i)));
      try {
        const { useRouter: i } = e, s = i();
        return (c) => {
          const {
            currentRoute: { path: a = "/" }
          } = s, { path: l } = c;
          return l === a ? s.replace(c).catch((g) => {
          }) : u(c);
        };
      } catch {
        return u;
      }
    }
  });
}, w = {
  composeSync: z,
  compose: C,
  curryFactory: A,
  useLocal: T,
  useSession: I,
  isRef: S,
  delRef: P,
  useRef: b,
  usePipe: M,
  getType: L,
  createObserver: D,
  useMemo: E,
  curryDalay: v
}, J = () => Object.assign(Object, h) && Object.assign(Function, w);
globalThis.$kyol = {
  ...w,
  ...h,
  vue2Hooks: H,
  useFastExtend: J
};
const N = globalThis.$kyol;
export {
  O as ObserverData,
  C as compose,
  z as composeSync,
  D as createObserver,
  v as curryDalay,
  A as curryFactory,
  N as default,
  P as delRef,
  L as getType,
  S as isRef,
  J as useFastExtend,
  T as useLocal,
  E as useMemo,
  h as useObject,
  M as usePipe,
  b as useRef,
  I as useSession,
  H as vue2Hooks
};
