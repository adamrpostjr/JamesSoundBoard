<script>
    let remember = true
    
    const login = () =>{
        console.log('do login -- then redirect')
    }

</script>

<main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Login In</h1>
          <h2>JamesHaywood.wang</h2>
        </hgroup>
        <form on:submit|preventDefault={login} >
          <input type="text" name="email" placeholder="Email" aria-label="Login" autocomplete="nickname" required>
          <input type="password" name="password" placeholder="Password" aria-label="Password" autocomplete="current-password" required>
          <fieldset>
            <label for="remember">
              <input bind:checked={remember} type="checkbox" role="switch" id="remember" name="remember">
              Remember me
            </label>
          </fieldset>
          <button type="submit" class="contrast" >Login</button>
        </form>
      </div>
      <div></div>
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