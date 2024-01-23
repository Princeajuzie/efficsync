
"use strict";
var animator = (()=>{
    var E = Object.defineProperty;
    var ue = Object.getOwnPropertyDescriptor;
    var le = Object.getOwnPropertyNames;
    var de = Object.prototype.hasOwnProperty;
    var xe = (e,t)=>{
        for (var r in t)
            E(e, r, {
                get: t[r],
                enumerable: !0
            })
    }
      , ge = (e,t,r,n)=>{
        if (t && typeof t == "object" || typeof t == "function")
            for (let i of le(t))
                !de.call(e, i) && i !== r && E(e, i, {
                    get: ()=>t[i],
                    enumerable: !(n = ue(t, i)) || n.enumerable
                });
        return e
    }
    ;
    var ye = e=>ge(E({}, "__esModule", {
        value: !0
    }), e);
    var Ne = {};
    xe(Ne, {
        animateAppearEffects: ()=>me,
        getActiveVariantHash: ()=>fe,
        spring: ()=>S,
        startOptimizedAppearAnimation: ()=>Y
    });
    var G = e=>e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    var C = "framerAppearId"
      , Fe = "data-" + G(C);
    var Ae = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
      , q = new Set(Ae);
    var z = (e,t,r)=>Math.min(Math.max(r, e), t);
    var V = e=>e;
    var H = V;
    var B = e=>e * 1e3
      , O = e=>e / 1e3;
    var U = e=>Array.isArray(e) && typeof e[0] == "number";
    var M = ([e,t,r,n])=>`cubic-bezier(${e}, ${t}, ${r}, ${n})`
      , he = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: M([0, .65, .55, 1]),
        circOut: M([.55, 0, 1, .45]),
        backIn: M([.31, .01, .66, -.59]),
        backOut: M([.33, 1.53, .69, .99])
    };
    function $(e) {
        if (e)
            return U(e) ? M(e) : Array.isArray(e) ? e.map($) : he[e]
    }
    function N(e, t, r, {delay: n=0, duration: i, repeat: a=0, repeatType: o="loop", ease: f, times: m}={}) {
        let s = {
            [t]: r
        };
        m && (s.offset = m);
        let p = $(f);
        return Array.isArray(p) && (s.easing = p),
        e.animate(s, {
            delay: n,
            duration: i,
            easing: Array.isArray(p) ? "linear" : p,
            fill: "both",
            iterations: a + 1,
            direction: o === "reverse" ? "alternate" : "normal"
        })
    }
    function _(e, t) {
        return t ? e * (1e3 / t) : 0
    }
    var Te = 5;
    function W(e, t, r) {
        let n = Math.max(t - Te, 0);
        return _(r - e(n), t - n)
    }
    var L = .001
      , be = .01
      , Q = 10
      , ve = .05
      , we = 1;
    function J({duration: e=800, bounce: t=.25, velocity: r=0, mass: n=1}) {
        let i, a;
        H(e <= B(Q), "Spring duration must be 10 seconds or less");
        let o = 1 - t;
        o = z(ve, we, o),
        e = z(be, Q, O(e)),
        o < 1 ? (i = s=>{
            let p = s * o
              , c = p * e
              , u = p - r
              , d = D(s, o)
              , l = Math.exp(-c);
            return L - u / d * l
        }
        ,
        a = s=>{
            let c = s * o * e
              , u = c * r + r
              , d = Math.pow(o, 2) * Math.pow(s, 2) * e
              , l = Math.exp(-c)
              , x = D(Math.pow(s, 2), o);
            return (-i(s) + L > 0 ? -1 : 1) * ((u - d) * l) / x
        }
        ) : (i = s=>{
            let p = Math.exp(-s * e)
              , c = (s - r) * e + 1;
            return -L + p * c
        }
        ,
        a = s=>{
            let p = Math.exp(-s * e)
              , c = (r - s) * (e * e);
            return p * c
        }
        );
        let f = 5 / e
          , m = Me(i, a, f);
        if (e = B(e),
        isNaN(m))
            return {
                stiffness: 100,
                damping: 10,
                duration: e
            };
        {
            let s = Math.pow(m, 2) * n;
            return {
                stiffness: s,
                damping: o * 2 * Math.sqrt(n * s),
                duration: e
            }
        }
    }
    var Oe = 12;
    function Me(e, t, r) {
        let n = r;
        for (let i = 1; i < Oe; i++)
            n = n - e(n) / t(n);
        return n
    }
    function D(e, t) {
        return e * Math.sqrt(1 - t * t)
    }
    var Se = ["duration", "bounce"]
      , Pe = ["stiffness", "damping", "mass"];
    function ee(e, t) {
        return t.some(r=>e[r] !== void 0)
    }
    function ke(e) {
        let t = {
            velocity: 0,
            stiffness: 100,
            damping: 10,
            mass: 1,
            isResolvedFromDuration: !1,
            ...e
        };
        if (!ee(e, Pe) && ee(e, Se)) {
            let r = J(e);
            t = {
                ...t,
                ...r,
                velocity: 0,
                mass: 1
            },
            t.isResolvedFromDuration = !0
        }
        return t
    }
    function S({keyframes: e, restDelta: t, restSpeed: r, ...n}) {
        let i = e[0]
          , a = e[e.length - 1]
          , o = {
            done: !1,
            value: i
        }
          , {stiffness: f, damping: m, mass: s, velocity: p, duration: c, isResolvedFromDuration: u} = ke(n)
          , d = p ? -O(p) : 0
          , l = m / (2 * Math.sqrt(f * s))
          , x = a - i
          , y = O(Math.sqrt(f / s))
          , w = Math.abs(x) < 5;
        r || (r = w ? .01 : 2),
        t || (t = w ? .005 : .5);
        let h;
        if (l < 1) {
            let g = D(y, l);
            h = A=>{
                let T = Math.exp(-l * y * A);
                return a - T * ((d + l * y * x) / g * Math.sin(g * A) + x * Math.cos(g * A))
            }
        } else if (l === 1)
            h = g=>a - Math.exp(-y * g) * (x + (d + y * x) * g);
        else {
            let g = y * Math.sqrt(l * l - 1);
            h = A=>{
                let T = Math.exp(-l * y * A)
                  , k = Math.min(g * A, 300);
                return a - T * ((d + l * y * x) * Math.sinh(k) + g * x * Math.cosh(k)) / g
            }
        }
        return {
            calculatedDuration: u && c || null,
            next: g=>{
                let A = h(g);
                if (u)
                    o.done = g >= c;
                else {
                    let T = d;
                    g !== 0 && (l < 1 ? T = W(h, g, A) : T = 0);
                    let k = Math.abs(T) <= r
                      , ce = Math.abs(a - A) <= t;
                    o.done = k && ce
                }
                return o.value = o.done ? a : A,
                o
            }
        }
    }
    var K = (e,t)=>`${e}: ${t}`;
    var b = new Map;
    var X;
    function te(e, t, r, n) {
        let i = q.has(t) ? "transform" : t
          , a = K(e, i)
          , o = b.get(a);
        if (!o)
            return null;
        let {animation: f, startTime: m} = o
          , s = ()=>{
            b.delete(a);
            try {
                f.cancel()
            } catch {}
        }
        ;
        return m === null || window.HandoffComplete ? (s(),
        null) : (X === void 0 && (X = performance.now()),
        X - m || 0)
    }
    var I, v;
    function Y(e, t, r, n, i) {
        if (window.HandoffComplete) {
            window.HandoffAppearAnimations = void 0;
            return
        }
        let a = e.dataset[C];
        if (!a)
            return;
        window.HandoffAppearAnimations = te;
        let o = K(a, t);
        v || (v = N(e, t, [r[0], r[0]], {
            duration: 1e4,
            ease: "linear"
        }),
        b.set(o, {
            animation: v,
            startTime: null
        }));
        let f = ()=>{
            v.cancel();
            let m = N(e, t, r, n);
            I === void 0 && (I = performance.now()),
            m.startTime = I,
            b.set(o, {
                animation: m,
                startTime: I
            }),
            i && i(m)
        }
        ;
        v.ready ? v.ready.then(f).catch(V) : f()
    }
    var F = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
      , Ve = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
    }
      , De = {
        translateX: "px",
        translateY: "px",
        translateZ: "px",
        x: "px",
        y: "px",
        z: "px",
        perspective: "px",
        transformPerspective: "px",
        rotate: "deg",
        rotateX: "deg",
        rotateY: "deg"
    };
    function re(e, t) {
        let r = De[e];
        return !r || typeof t == "string" && t.endsWith(r) ? t : `${t}${r}`
    }
    function R(e) {
        return F.includes(e)
    }
    var Ke = (e,t)=>F.indexOf(e) - F.indexOf(t);
    function oe({transform: e, transformKeys: t}, {enableHardwareAcceleration: r=!0, allowTransformNone: n=!0}, i, a) {
        let o = "";
        t.sort(Ke);
        for (let f of t)
            o += `${Ve[f] || f}(${e[f]}) `;
        return r && !e.z && (o += "translateZ(0)"),
        o = o.trim(),
        a ? o = a(e, o) : n && i && (o = "none"),
        o
    }
    function j(e, t) {
        let r = new Set(Object.keys(e));
        for (let n in t)
            r.add(n);
        return Array.from(r)
    }
    function Z(e, t) {
        let r = t - e.length;
        if (r <= 0)
            return e;
        let n = new Array(r).fill(e[e.length - 1]);
        return e.concat(n)
    }
    var ae = {
        duration: .001
    }
      , P = {
        opacity: 1,
        scale: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        x: 0,
        y: 0,
        z: 0,
        rotate: 0,
        rotateX: 0,
        rotateY: 0
    };
    function se(e, t, r, n, i) {
        return r.delay && (r.delay *= 1e3),
        r.type === "spring" ? Ee(e, t, r, n, i) : ze(e, t, r, n, i)
    }
    function Ie(e, t, r) {
        let n = {}
          , i = 0
          , a = 0;
        for (let o of j(e, t)) {
            let f = e[o] ?? P[o]
              , m = t[o] ?? P[o];
            if (f === void 0 || m === void 0 || o !== "transformPerspective" && f === m)
                continue;
            o === "transformPerspective" && (n[o] = [f, m]);
            let s = Be(f, m, r)
              , {duration: p, keyframes: c} = s;
            p === void 0 || c === void 0 || (p > i && (i = p,
            a = c.length),
            n[o] = c)
        }
        return {
            keyframeValuesByProps: n,
            longestDuration: i,
            longestLength: a
        }
    }
    function Ee(e, t, r, n, i) {
        let a = {}
          , {keyframeValuesByProps: o, longestDuration: f, longestLength: m} = Ie(e, t, r);
        if (!m)
            return a;
        let s = {
            ease: "linear",
            duration: f,
            delay: r.delay
        }
          , p = i ? ae : s
          , c = {};
        for (let[d,l] of Object.entries(o))
            R(d) ? c[d] = Z(l, m) : a[d] = {
                keyframes: Z(l, m),
                options: d === "opacity" ? s : p
            };
        let u = pe(c, n);
        return u && (a.transform = {
            keyframes: u,
            options: p
        }),
        a
    }
    function Ce(e) {
        let {type: t, duration: r, ...n} = e;
        return {
            duration: r * 1e3,
            ...n
        }
    }
    function ze(e, t, r, n, i) {
        let a = Ce(r);
        if (!a)
            return;
        let o = {}
          , f = i ? ae : a
          , m = {};
        for (let p of j(e, t)) {
            let c = e[p] ?? P[p]
              , u = t[p] ?? P[p];
            c === void 0 || u === void 0 || p !== "transformPerspective" && c === u || (R(p) ? m[p] = [c, u] : o[p] = {
                keyframes: [c, u],
                options: p === "opacity" ? a : f
            })
        }
        let s = pe(m, n);
        return s && (o.transform = {
            keyframes: s,
            options: f
        }),
        o
    }
    var ne = new Map
      , ie = 10;
    function Be(e, t, r) {
        let {damping: n, stiffness: i, mass: a} = r
          , o = `${e}-${t}-${n}-${i}-${a}`
          , f = ne.get(o);
        if (f)
            return f;
        let m = [e, t]
          , s = S({
            ...r,
            keyframes: m
        })
          , p = {
            done: !1,
            value: m[0]
        }
          , c = []
          , u = 0;
        for (; !p.done && u < 1e4; )
            p = s.next(u),
            c.push(p.value),
            u += ie;
        m = c;
        let d = u - ie
          , x = {
            keyframes: m,
            duration: d,
            ease: "linear"
        };
        return ne.set(o, x),
        x
    }
    function pe(e, t) {
        let r = []
          , n = Object.values(e)[0]?.length;
        if (!n)
            return;
        let i = Object.keys(e);
        for (let a = 0; a < n; a++) {
            let o = {}
              , f = !0;
            for (let[s,p] of Object.entries(e)) {
                let c = p[a];
                f && (f = c === void 0 || c === P[s]),
                c !== void 0 && (o[s] = re(s, c))
            }
            let m = oe({
                transform: o,
                transformKeys: i
            }, {}, f, t);
            r.push(m)
        }
        return r
    }
    function me(e, t, r, n, i, a) {
        for (let[o,f] of Object.entries(e)) {
            let {initial: m, animate: s, transformTemplate: p, variantHash: c} = f;
            if (!m || !s || c && a && c !== a)
                continue;
            let {transition: u, ...d} = s
              , l = se(m, d, u, $e(p, n), i);
            if (!l)
                continue;
            let x = {}
              , y = {};
            for (let[w,h] of Object.entries(l))
                x[w] = h.keyframes,
                y[w] = h.options;
            t(`[${r}="${o}"]`, x, y)
        }
    }
    function $e(e, t) {
        if (!(!e || !t))
            return (r,n)=>e.replace(t, n)
    }
    function fe(e) {
        return e ? e.find(r=>r.mediaQuery ? window.matchMedia(r.mediaQuery).matches === !0 : !1)?.hash : void 0
    }
    return ye(Ne);
}
)();
