$( () => {

/*
   show modals
*/
   // show login modal
   $( "#showLoginModal" ).click( e => {
      $( "#LoginModal" ).modal( 'show' );

      $( "#LoginForm" ).submit( function( e ){
         e.preventDefault();

         if( $( this )[ 0 ].reportValidity() ) {
            const submitBtn = $("#SigninSubmitBtn");
            const username = $("input[id=FormControlUsername]").val();
            const password = $("input[id=FormControlPassword]").val();

            submitBtn.button('authenticating');

            $.post('/signin', { username, password } ).done( data => {
               console.log( data ) ;

               if( data === null ) {
                  $( "#LoginAlert" ).alert( 'close' )
                  $( "#alertInfo" ).append(`
                     <div id="LoginAlert" class="alert alert-danger alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>Authentication error: !</strong> username or password is not correct ....
                     </div>
                  `);
                  submitBtn.button( 'reset' );
               } else {
                  $( "#LoginAlert" ).alert( 'close' )
                  window.location = data.redirect;
               }
            })
         }
      })
   })



   // show about modal
   $("#showAboutModal").click(() => {
      $('#AboutModal').modal('show');
   });
})
//
