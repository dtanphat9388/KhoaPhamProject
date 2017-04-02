$(

   $("#SigninSubmitBtn").click(function(e){
      e.preventDefault();
      const submitBtn = $(this).button('authenticating');
      const username = $("input[name='username']").val();
      const password = $("input[name='password']").val();

      $.post('/signin', {username, password}, result => {
         if(result === null) {
            console.log(result)
            $("#alertInfo").appendTo('
                  <div id="info" class="alert alert-danger alert-dismissible" role="alert">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
                  <strong>Error: </strong> da co loi xay ra
               </div>
               '');
            
            submitBtn.button('reset');
         } else {
            console.log(result)
            
         }
      })
   })
)
