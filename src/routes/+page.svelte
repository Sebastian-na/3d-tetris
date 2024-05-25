<script lang="ts">
  import App from '$lib/components/App.svelte'
</script>

<div>
  <App />
</div>

<style>
  :global(body) {
    margin: 0;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }
  /*
  Use a more-intuitive box-sizing model.
    */
    :global(*,
    *::before,
    *::after)
      {
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      color: white;
    }

  
    
</style>
