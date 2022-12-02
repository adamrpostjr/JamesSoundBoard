<script>
    import { enhance } from '$app/forms';
    let remember = true

    export let form;


</script>

<main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Login In</h1>
          <h2>JamesHaywood.wang</h2>
        </hgroup>
        <form method="POST" use:enhance>
          <input type="text" name="email" placeholder="Email" aria-label="Email" autocomplete="nickname" required>
          <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required>
          <fieldset>
            <label for="remember">
              <input bind:checked={remember} type="checkbox" role="switch" id="remember" name="remember">
              Remember me
            </label>
          </fieldset>
          <!-- <button type="submit" class="contrast">Login</button> -->
          <button>Login</button>
        </form>
      </div>
    </article>
  </main>

  <style>
    main{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
  
    }

  </style>