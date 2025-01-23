<script lang="ts">
  // import * as game from './scripts/minigames';
  import { start } from './scripts/game';

  start();
</script>

<main>
  <div id="all-windows">
    <div class="window" id="main">
      <div class="tab">
        <p class="title">unfinished game project</p>
        <div class="btns">
          <p>—</p>
          <p>☐</p>
          <p class="close">✕</p>
        </div>
      </div>
      <div id="scene" class="content"></div>
    </div>
  </div>
</main>

<style>
</style>
