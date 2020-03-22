const express = require("express");
const nunjucks = require ("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express:server,
  autoescape: false,
  noCache: true
})

server.get("/", (req, res) => {
  const about = {
    image_url : "https://miro.medium.com/max/383/1*co_1qORNdM0PI1nvCp7Iig.png",
    title : "Aprenda Git",
    description : "Git é um sistema de controle de versões distribuído, usado principalmente no desenvolvimento de software, mas pode ser usado para registrar o histórico de edições de qualquer tipo de arquivo.",
    link : { 
      name: "Site Oficial", 
      url: "https://git-scm.com/"
    }
  }

  return res.render("about", { about });
})

server.get("/tutorial", (req, res) => {
  return res.render("tutorial", { items: videos });
})

server.get("/video", (req, res) => {
  const id = req.query.id;

  const video = videos.find((video) => {
    return video.id == id;
  })

  if (!video) {
    return res.send("Video not found!");
  }

  res.render("video", { item: video });
})

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
