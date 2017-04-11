$( () => {
/*
  onload
*/
  var currentPage = 1;
  const cartList = [];
  getImageOnPage(currentPage);

/*
  handle view product & Add to cart
*/



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



/*
  handle pagination
*/
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
    $.get('/page', {page}, data => {
      console.log(`Product on page ${page}: `, data);
      $(imageList).empty(); //remove products in #imageList after append new products
      data.forEach(product => $(imageList).append(`
        <div class="col-xs-6 col-md-3">
          <div class="thumbnail" >
            <img src="/image/${product.imgsrc}" alt="chua co hinh" style="background-color:#ea4335;width:100px;height:100px;border-radius: 50%;">
            <div class="caption">
              <h3>${product.name}</h3>
              <p>${product.desc}</p>
              <p>
                <a href="./product/detail/${product.id}" class="btn btn-default" role="button">View</a>
                <button id=${product.id} class="btn btn-primary glyphicon glyphicon-shopping-cart addCartBtn" role="button"></button>
              </p>
            </div>
          </div>
        </div>
      `))
      $(".addCartBtn").click(e => {
        console.log(e.target.id);
        localStorage[e.target.id]= e.target.id;
        console.log(localStorage);
      })
    })
  }

/*
  handle Cart
*/
  let arrProductCart;


  $("#CartListModal").on("shown.bs.modal", function(e) {
    $("#CartListModal .modal-body").empty();
    arrProductCart = Object.keys(localStorage);
    console.log(arrProductCart);

    getProductOnCart(arrProductCart);
    $("#btnClearCart").click( e => {
      localStorage.clear();
      $("#CartListModal").modal('close');
    })
  })

  function getProductOnCart(arrProductCart){
    $.get('/cart', {arrProductCart}, arrProducts => {
      $("#CartListModal").modal('show');
      // console.log(e);
      arrProducts.forEach(product => {
        $("#CartListModal .modal-body").append(`
              <li>
                <img src="/image/${product.imgsrc}">
                <h2>${product.name}</h2>
                <p>${product.desc}</p>
              </li>
        `)
      })
    })
  }
})
