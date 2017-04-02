$( () => {

/*
   show modals
*/

   // show login modal
   $("#showLoginModal").click(() => {
      $('#LoginModal').modal('show');

      //handle sign in with post method
      $("#SigninSubmitBtn").click(function(e){
         e.preventDefault();

         const submitBtn = $(this).button('authenticating');
         const username = $("input[name='username']").val();
         const password = $("input[name='password']").val();

         $.post('/signin', {username, password}, result => {
            if ( result === null ) {
               $("#alertInfo").append(`
                  <div class="alert alert-danger alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>Authentication error: !</strong> username or password is not correct ....
                  </div>
               `);
               submitBtn.button('reset');
            } else {
               window.location = result.redirect;
            }
         })
      })
   })

   // show about modal
   $("#showAboutModal").click(() => {
      $('#AboutModal').modal('show');
   });
})
//
