import { mount } from 'svelte'
import App from './App.svelte'

import '../style/style.css'
import '../style/window.css'

const app = mount(App, {
  target: document.getElementById('game')!,
})

export default app