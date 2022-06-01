# Testability of pages

It seems that `<q-page>` is tightly coupled to Quasar's layout, and testing
anything here with `@vue/test-utils` will throw an error:

```
FAIL  src/pages/projects/my-projects-page.vue.spec.ts > MyProjectsPage > renders
TypeError: Cannot read properties of undefined (reading 'header')
 ❯ ReactiveEffect.fn ../node_modules/.pnpm/quasar@2.7.1/node_modules/quasar/src/components/page/QPage.js:25:20
     23|     const style = computed(() => {
     24|       const offset
     25|         = ($layout.header.space === true ? $layout.header.size : 0)
       |                    ^
     26|         + ($layout.footer.space === true ? $layout.footer.size : 0)
```
