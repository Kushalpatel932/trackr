new TypeIt("#message", {
    strings: "Your freedom begins now!",
    speed: 70,
    waitUntilVisible: true,
    cursor: false
  }).go();

  setTimeout(()=>{

    new TypeIt("#message2", {
        speed: 60,
        waitUntilVisible: true,
        cursor: true
      }).type("Welcome to Trackr ")
      .type("An source", {delay: 100})
      .move(-6, {speed: 25, delay: 100})
      .type('open ')
      .move("END", {delay: 300})
      .type(" relapse tracker", {delay: 150})
      .go();

  }, 2100)

  if(localStorage.getItem("username")){
    document.getElementById("btn1").innerHTML = "Resume app";
  }