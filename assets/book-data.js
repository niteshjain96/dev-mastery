/* Single source of truth for the book's structure.
   index.html renders from this; chapter pages use it for prev/next.
   `crit: true` marks the 30-day critical path.

   Every topic in every chapter is written as a Q-BLOCK:
     Q (interviewer's phrasing) -> SAY THIS (definition) ->
     EXAMPLE -> NOW YOU CODE (AI off, timer on) -> CROSS-QUESTIONS.
*/

const BOOK = {
  title: "Frontend Engineering: Interview-Ready",
  parts: [
    {
      n: "I", name: "JavaScript: The Gate",
      tag: "Every round starts here. Nothing else you know matters if this wobbles.",
      chapters: [
        { n:1, file:"ch01.html", sessions:5, ready:true, crit:true,
          title:"Scope, Closures & the Execution Model",
          blurb:"How JavaScript decides what a name means — and the closure questions that open nine out of ten rounds.",
          outline:["Execution context: creation vs execution phase","Hoisting, and why let/const are hoisted too","The temporal dead zone and typeof","Closures: persistence, privacy, per-instance state","The 3-3-3 loop puzzle and all four fixes","Closure memory leaks you can find in DevTools"] },
        { n:2, file:"ch02.html", sessions:5, ready:false, crit:true,
          title:"this, Prototypes, Objects & Classes",
          blurb:"The four binding rules, the prototype chain, and what class actually desugars to.",
          outline:["The four binding rules and their precedence","Arrow functions and lost this in React handlers","call / apply / bind, hand-written","__proto__ vs prototype; the lookup chain","What class desugars to: fields, #private, super","Mixins, Object.create, composition over inheritance","Symbol, Proxy, Reflect, WeakMap and WeakRef"] },
        { n:3, file:"ch03.html", sessions:5, ready:false, crit:true,
          title:"Async JavaScript: Event Loop, Promises, Generators",
          blurb:"Task vs microtask ordering, promise semantics, and the output puzzles that get asked on every whiteboard.",
          outline:["Call stack, macrotask queue, microtask queue, render step","Output-ordering puzzles, worked line by line","Promise states and the resolution procedure","async/await desugared; sequential vs parallel mistakes","all / allSettled / race / any and their failure semantics","Generators, iterators, async iterators","AbortController and why promises can't be cancelled"] },
        { n:4, file:"ch04.html", sessions:6, ready:false, crit:true,
          title:"The Polyfill Canon",
          blurb:"Twenty-three implementations you must be able to write cold, on a timer, with no autocomplete.",
          outline:["map, filter, reduce, flat","call, apply, bind (new-correct), new, Object.create","Promise.all / allSettled / race / any","debounce (leading, trailing, maxWait), throttle","memoize, curry, once, pipe, compose","EventEmitter, O(1) LRU cache, deepClone with cycles","Promise pool with concurrency limit, retry with backoff"] }
      ]
    },
    {
      n: "II", name: "DSA in JavaScript: The Screen",
      tag: "A gate, not a band-setter. Clear it fast, then get back to React.",
      chapters: [
        { n:5, file:"ch05.html", sessions:6, ready:false, crit:true,
          title:"Arrays, Strings, Pointers, Hashmaps & Stacks",
          blurb:"Around 32 problems, easy to medium, plus the script for narrating your thinking while you code.",
          outline:["Complexity you can state out loud without hedging","Two pointers and the problems it solves","Sliding window: fixed and variable","Hashmap patterns: frequency, seen-set, index map","Stacks and monotonic stacks","Narrating your approach before you type"] },
        { n:6, file:"ch06.html", sessions:6, ready:false,
          title:"Recursion, Trees, Graphs, Sorting & a Little DP",
          blurb:"Including the DOM-shaped tree problems that get asked far more often than binary search trees.",
          outline:["Recursion, call stack, base cases, backtracking","Binary trees: traversals, depth, LCA, paths","DOM-shaped problems: path to node, serialise, virtual DOM diff","BFS/DFS on grids and graphs","Binary search and its three variants","The four DP patterns that actually appear"] }
      ]
    },
    {
      n: "III", name: "Node & the Backend Round",
      tag: "Enough depth to be credible, not enough to pretend you are a backend engineer.",
      chapters: [
        { n:7, file:"ch07.html", sessions:4, ready:false,
          title:"The Node Runtime",
          blurb:"Node's event loop compared to the browser's, streams, buffers, and what actually blocks.",
          outline:["Event loop phases; setImmediate vs process.nextTick","libuv, the thread pool, what is truly blocking","Streams, buffers, backpressure, piping","CommonJS vs ESM in Node; the dual-package hazard","Cluster, worker threads, and when Node is wrong"] },
        { n:8, file:"ch08.html", sessions:5, ready:false,
          title:"Express, REST API Design & Error Handling",
          blurb:"Middleware as a pipeline, async error propagation, and API design you can defend.",
          outline:["Middleware ordering and next() semantics","Routers, params, validation layers","Error-handling middleware and async errors","REST: resources, status codes, pagination, versioning, idempotency","Request lifecycle, logging, graceful shutdown","Build a small API end to end, by hand"] },
        { n:9, file:"ch09.html", sessions:4, ready:false,
          title:"Auth, Security & MongoDB",
          blurb:"JWT vs sessions, the cookie-versus-localStorage answer, CORS explained properly, and Mongo schema design.",
          outline:["JWT structure, access vs refresh, rotation","httpOnly cookies vs localStorage: the honest answer","OAuth authorization-code flow in six steps","CORS, CSRF, XSS, injection, rate limiting, helmet","Mongo: embed vs reference, indexes, explain(), aggregation","Transactions and the five Mongoose mistakes"] }
      ]
    },
    {
      n: "IV", name: "TypeScript",
      tag: "On your resume by the end of this part — at interview depth, not tutorial depth.",
      chapters: [
        { n:10, file:"ch10.html", sessions:4, ready:false,
          title:"Types, Inference, Narrowing & Generics",
          blurb:"Structural typing, narrowing, guards, and the generics questions that separate users from readers.",
          outline:["Structural typing and what surprises people","Inference, widening, literals, as const","Narrowing: typeof, in, discriminated unions, guards","unknown vs any vs never; exhaustiveness","Generics, constraints, inference sites","satisfies vs annotation vs assertion; tsconfig flags that matter"] },
        { n:11, file:"ch11.html", sessions:5, ready:false,
          title:"Type-Level Programming & Typing React",
          blurb:"Conditional and mapped types, infer, and typing props, refs, hooks, Redux and Query end to end.",
          outline:["Conditional types, infer, distributivity","Mapped types, key remapping, template literal types","Re-implement Partial, Pick, Omit, Record, ReturnType, Awaited","Declaration merging, module augmentation, .d.ts","Typing props, children, refs, generic and polymorphic components","Typing custom hooks, Redux and React Query"] }
      ]
    },
    {
      n: "V", name: "React, Deeply",
      tag: "Ordered fifth. Started second. Do not confuse the two.",
      chapters: [
        { n:12, file:"ch12.html", sessions:4, ready:false, crit:true,
          title:"Reconciliation, Fiber & the Render/Commit Split",
          blurb:"What a render actually is, why keys matter, and what is legal in each phase.",
          outline:["What render means, and what it does not","Fiber nodes, the work loop, double buffering","Diffing rules and element identity","Keys: why index-as-key corrupts state","Render phase vs commit phase; StrictMode double-invoke","Mount, update, unmount traced end to end"] },
        { n:13, file:"ch13.html", sessions:5, ready:false, crit:true,
          title:"Hooks: Internals, Stale Closures & Dependencies",
          blurb:"Hooks as a linked list on the fiber — the mechanical reason every rule exists.",
          outline:["Why the rules of hooks exist, mechanically","useState: update queue, batching, functional updates","Stale closures: three canonical shapes and their fixes","Dependency arrays: bug vs lie","useReducer vs five useStates","Custom hook design: naming, return shape, composability"] },
        { n:14, file:"ch14.html", sessions:4, ready:false, crit:true,
          title:"Effects, Refs & the World Outside React",
          blurb:"Effects are synchronisation, not lifecycle — and most of yours should not exist.",
          outline:["You might not need an effect: the five replacements","Cleanup, fetch race conditions, the ignore flag","useRef for mutable values vs DOM nodes","forwardRef, ref-as-prop in React 19, useImperativeHandle","useSyncExternalStore and subscribing to a canvas","Error boundaries and portals"] },
        { n:15, file:"ch15.html", sessions:4, ready:false, crit:true,
          title:"Re-renders, Context & Performance You Can Prove",
          blurb:"The four reasons a component re-rendered, and profiling evidence you can quote in an interview.",
          outline:["The four causes of a re-render","memo, useMemo, useCallback: cost model and when they lose","What the React Compiler changes about this advice","Context re-renders, provider identity trap, context splitting","Lists: virtualisation, windowing, key stability","Profiling with React DevTools: before and after numbers"] },
        { n:16, file:"ch16.html", sessions:5, ready:false,
          title:"Concurrent React, Suspense, Routing & React 19",
          blurb:"Transitions, Suspense, Server Components, Actions — and what changed from 18 to 19.",
          outline:["useTransition, useDeferredValue, interruptibility","Suspense boundaries, lazy, streaming, fallback design","useId, useOptimistic, use(), Actions, useActionState","Server Components: the boundary and what cannot cross","React Router: nested routes, loaders, route-level splitting","React 18 to 19: the migration list"] }
      ]
    },
    {
      n: "VI", name: "Data & State",
      tag: "Server state is not client state. Most codebases still confuse the two.",
      chapters: [
        { n:17, file:"ch17.html", sessions:5, ready:false, crit:true,
          title:"TanStack Query v5",
          blurb:"The cache model, staleTime vs gcTime on one timeline, and optimistic updates that roll back correctly.",
          outline:["Query keys, key factories, structural sharing","staleTime vs gcTime: the pair that catches everyone","Invalidation vs setQueryData","select and derived data without re-render storms","Dependent, parallel and infinite queries; prefetching","Optimistic updates with rollback; SSR hydration"] },
        { n:18, file:"ch18.html", sessions:4, ready:false,
          title:"Redux Toolkit, Zustand, Jotai & a Decision Framework",
          blurb:"When React Query deletes 80% of your Redux — and the 20% it does not.",
          outline:["RTK: slices, immer, thunks, normalisation, selectors","RTK Query vs TanStack Query, honestly compared","Zustand and Jotai mental models","The five kinds of state and where each belongs","Arguing the decision out loud in a design round"] }
      ]
    },
    {
      n: "VII", name: "Next.js",
      tag: "Usually a conversation round, not a build round. Be conversational and correct.",
      chapters: [
        { n:19, file:"ch19.html", sessions:6, ready:false,
          title:"App Router, Server Components, Caching & Server Actions",
          blurb:"What runs where, the caching layers, and what changed in Next 15.",
          outline:["App Router vs Pages Router; file conventions","Server vs Client Components; the use client boundary","The caching layers, and what Next 15 changed","revalidate, revalidateTag, revalidatePath","Server Actions, route handlers, middleware","SSG, SSR, ISR, PPR; metadata, image and font optimisation"] }
      ]
    },
    {
      n: "VIII", name: "The Browser Platform",
      tag: "Where seven years of real experience should show — and usually does not, for lack of vocabulary.",
      chapters: [
        { n:20, file:"ch20.html", sessions:5, ready:false,
          title:"Semantic HTML, Forms & Accessibility",
          blurb:"WCAG 2.2, the accessibility tree, focus management — with your caption editor as the worked case.",
          outline:["Semantics as the accessibility tree","Native form behaviour and constraint validation","WCAG 2.2 AA: the criteria that actually fail audits","ARIA roles, accessible names, and when not to use ARIA","Focus management: modals, menus, roving tabindex","Screen reader testing on Windows with NVDA"] },
        { n:21, file:"ch21.html", sessions:4, ready:false,
          title:"CSS: Cascade, Layout, Tokens & Tailwind at Scale",
          blurb:"Specificity, stacking contexts, Grid decisions, and design tokens that survive a team.",
          outline:["Cascade, specificity, inheritance, @layer, :where()","Stacking contexts, containing blocks, position x transform","Flexbox vs Grid; intrinsic sizing; container queries","Custom properties as a real API","Tailwind at scale: tokens, extraction, avoiding class soup","Responsive and cross-browser strategy"] },
        { n:22, file:"ch22.html", sessions:6, ready:false,
          title:"Rendering Pipeline, Core Web Vitals, DevTools, Memory & Storage",
          blurb:"Reflow vs repaint, what actually moves LCP and INP, and finding a real leak in a heap snapshot.",
          outline:["Parse, style, layout, paint, composite; layout thrashing","Compositor-only properties and the 16.7ms budget","LCP, INP, CLS: what actually moves each","DevTools: flame charts, waterfall, coverage, heap snapshots","SPA memory leaks: detached DOM and listener retention","Storage: localStorage, IndexedDB, cookies, service workers","Canvas 2D and MediaRecorder API depth"] }
      ]
    },
    {
      n: "IX", name: "Testing",
      tag: "Your largest single gap. Thirteen sessions — more than anything outside React.",
      chapters: [
        { n:23, file:"ch23.html", sessions:6, ready:false, crit:true,
          title:"Testing Foundations: Vitest, Jest, Doubles & What's Worth Testing",
          blurb:"From zero. Your polyfills from Chapter 4 become your first real test suite.",
          outline:["Vitest vs Jest: config, ESM, environments","Anatomy of a test; one reason to fail","Mocks, stubs, spies, fakes; mocking as a design smell","vi.mock, module mocking, fake timers, fixed dates","What is worth testing, and what is theatre","Coverage as a signal, not a target"] },
        { n:24, file:"ch24.html", sessions:7, ready:false, crit:true,
          title:"Testing React: RTL, Hooks, React Query, MSW & Playwright",
          blurb:"Query priority and why it is ordered that way, user-event, async utilities, and three real E2E flows.",
          outline:["Test behaviour, not implementation","The query priority order and the reasoning behind it","user-event over fireEvent: what fireEvent does not simulate","waitFor vs findBy; act warnings decoded","Testing custom hooks and components that use React Query","MSW handlers and per-test overrides","Playwright: fixtures, trace viewer, when E2E is wrong"] }
      ]
    },
    {
      n: "X", name: "The Toolchain",
      tag: "Asked as a filter question. Cheap to learn, expensive to fumble.",
      chapters: [
        { n:25, file:"ch25.html", sessions:5, ready:false,
          title:"Modules, Vite, Bundling, Packages & Git at Depth",
          blurb:"ESM vs CJS, tree shaking and what defeats it, chunk strategy, and Git beyond the basics.",
          outline:["ESM vs CommonJS; interop; type: module","Vite: dev server, native ESM, HMR, build pipeline","Tree shaking, code splitting, chunk strategy, bundle analysis","npm vs yarn vs pnpm; lockfiles; semver; peer deps","Git: rebase, interactive rebase, cherry-pick, bisect, reflog","Branching strategy, commit conventions, PR hygiene"] }
      ]
    },
    {
      n: "XI", name: "Machine Coding: The Band-Setter",
      tag: "Ninety minutes. AI off. This is the round that decides the number.",
      chapters: [
        { n:26, file:"ch26.html", sessions:8, ready:false, crit:true,
          title:"Machine Coding I: Eight Timed Builds",
          blurb:"Typeahead, nested comments, infinite scroll, data table, tabs/modal/toast, OTP input, star rating, carousel.",
          outline:["Typeahead with debounce and keyboard navigation","Nested comments","Infinite scroll","Data table: sort, filter, paginate, resize","Tabs, accordion, modal and toast system","OTP input, star rating, carousel","The rubric interviewers actually score you on"] },
        { n:27, file:"ch27.html", sessions:7, ready:false, crit:true,
          title:"Machine Coding II: Seven Harder Builds",
          blurb:"Kanban with drag-and-drop, file explorer, calendar, form builder, chip input, virtualised list, gallery.",
          outline:["Kanban with drag-and-drop","File explorer tree","Calendar and date picker","Form builder and chip input","Virtualised list","Image gallery with lazy loading","Post-mortem protocol: what you say when the timer ends"] }
      ]
    },
    {
      n: "XII", name: "System Design & Your Own Work",
      tag: "Your strongest asset. Most candidates have nothing comparable to the pptx pipeline.",
      chapters: [
        { n:28, file:"ch28.html", sessions:7, ready:false,
          title:"Frontend System Design",
          blurb:"A repeatable framework plus eight worked designs, each with the cross-questions that follow.",
          outline:["The framework: requirements to edge cases","News feed, autocomplete at scale, image gallery, chat","Collaborative editor, analytics dashboard, PLP/PDP, design system","Caching layers: browser, HTTP, CDN, service worker, app","Real-time: polling vs long-polling vs SSE vs WebSocket","Micro-frontends and when they are a mistake"] },
        { n:29, file:"ch29.html", sessions:6, ready:false, crit:true,
          title:"Your Own Systems: The Ten-Minute Narrative",
          blurb:"Turning the canvas editor, the .pptx pipeline and the widget system into a whiteboard you can draw from memory.",
          outline:["The canvas slide editor as a system","The .pptx pipeline: OOXML, masters, EMU mapping, media","The widget system: registry, schema, extension model","The WCAG caption editor: timing model and a11y decisions","Whiteboard drills: each diagram from memory, on a timer","The narrative script and the eight follow-ups"] }
      ]
    },
    {
      n: "XIII", name: "The Offer",
      tag: "The part that converts everything above into money.",
      chapters: [
        { n:30, file:"ch30.html", sessions:3, ready:false, crit:true,
          title:"Behavioural, Your Story & Negotiation",
          blurb:"STAR stories from real work, the AI question answered as a strength, and scripts for the NIIT conversation.",
          outline:["Eight STAR stories mined from your own projects","Why are you leaving: true, and not a word against Techbliss","How do you use AI: judgement with receipts","Current CTC, anchoring, and the counter-offer decision tree","The NIIT conversion conversation: green, amber, red"] }
      ]
    }
  ]
};

/* flat chapter list, in order */
const CHAPTERS = BOOK.parts.flatMap(p => p.chapters.map(c => ({ ...c, part: p.n, partName: p.name })));
