import { boot } from 'quasar/wrappers'
import localforage from 'localforage'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
  localforage.config({
    driver: localforage.LOCALSTORAGE,
    name: 'Sophies Demo',
    version: 1,
    storeName: 'sophies_demo',
    description: 'Sophies Demo Local Forage',
  })
})
