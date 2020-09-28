export default [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "/Users/gao/Documents/demo/amplifytest/src/pages/about/index.vue"
      ),
    children: [
      {
        path: "about2",
        name: "about2",
        component: () =>
          import(
            /* webpackChunkName: "about2" */ "/Users/gao/Documents/demo/amplifytest/src/pages/about/pages/about2/index.vue"
          ),
        children: []
      }
    ]
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "/Users/gao/Documents/demo/amplifytest/src/pages/home/index.vue"
      ),
    children: []
  }
];
