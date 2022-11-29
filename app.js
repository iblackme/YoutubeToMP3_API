const express = require("express");
const youtubeMp3Converter = require("youtube-mp3-converter");

const convertLinkToMp3 = youtubeMp3Converter("./music");
let videotitle = "";

const myfunc = async (vlink, res) => {
  console.log(`RESIVED URL : ${vlink}`);
  const pathToMp3 = await convertLinkToMp3(vlink);
  videotitle = pathToMp3.slice(2);
  console.log("downloaded sending jeson data");
  res.json({ link: videotitle });
};

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/download/:url", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let link = "https://www.youtube.com/watch?v=" + req.params.url;
  myfunc(link, res);
});

app.get("/get/:link", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let link = req.params.link;
  res.download(`./music/${link}`);
});

app.listen(8000, (e) => {
  if (!e) {
    console.log("running on port 8000");
  } else {
    console.log("error occoured , ", e);
  }
});
