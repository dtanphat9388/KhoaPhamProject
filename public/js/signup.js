$(() => {

   $("#SignupForm").submit( e => {
      e.preventDefault();

      const submitBtn = $("#SignupSubmitBtn");
      const username = $("input[id=signupUsername]").val();
      const password = $("input[id=signupPassword]").val();

      submitBtn.button('authenticating');

      $.post('/signup', {username, password}).done( data => {
         console.dir(data);

         if( data === null ) {
            $("#LoginAlert").alert('close')
            $("#alertInfo").append(`
               <div id="LoginAlert" class="alert alert-danger alert-dismissible" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
                  <strong>Error: !</strong> User da ton tai
               </div>
            `);
            submitBtn.button('reset');
         } else {
            $("#LoginAlert").alert('close');
            window.location = data.redirect;
         }
      })
   })
})
