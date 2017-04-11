$(() => {
  $(".addCartBtn").click( e => {
    console.log(e.target.id);
    localStorage[e.target.id]= e.target.id;
    console.log(localStorage);
  })
})
