$( () => {
/*
  onload
*/
  var currentPage = 1;
  getImageOnPage(currentPage);

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

  // handle pagination
  const imageList = document.querySelector("#imageList");
  const pageList = document.querySelector(".pagination");
  const pageListNumber = pageList.childElementCount - 2 ; // -2 button Prev && Next

  pageList.onclick = e => {
    switch (e.target.text) {
      case "Prev":
        if (currentPage == 1) break;
        getImageOnPage(--currentPage);
        break;
      case "Next":
        if (currentPage == pageListNumber) break;
        getImageOnPage(++currentPage);
        break;
      default:
        getImageOnPage(e.target.text)
    }
  }

  function getImageOnPage(page = 1) {
    $.get('/imgs', {page}, data => {
      console.log(8, data);
      $(imageList).empty();
      data.forEach(image => $(imageList).append(`
        <div class="col-xs-6 col-md-3">
          <div class="thumbnail" >
            <img id="${image.id}" src="./image/${image.imgsrc}" alt="chua co hinh" style="background-color:#ea4335;width:100px;height:100px;border-radius: 50%;">
            <div class="caption">
              <h3>${image.name}</h3>
              <p>${image.desc}</p>
              <p>
                <a href="#" class="btn btn-primary" role="button">View</a>
                <a href="#" class="btn btn-default" role="button">Add to cart</a>
              </p>
            </div>
          </div>
        </div>
      `))
    })
  }

})
