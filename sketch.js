// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */
let count = 0
let resultLabelArray = [];
let resultValueArray = [];
var link;
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/uVw9N3OQy/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(720, 480, CENTER);
  // Create the video
  video = createCapture(video);
  video.size(720, 480, CENTER);
  video.hide();


  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  attachClickListener();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(400);
  textSize(18);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!

  resultValueArray[count] = results[0].confidence;
  resultLabelArray[count++] = label;
  classifyVideo();
  // console.log(resultValueArray);



}

// console.log(document);

// document.getElementById("submitVideo").addEventListener("click",()=>{window.location.href =  link;});

function attachClickListener() {
  document.getElementById("submitVideo").addEventListener("click", () => {
    const encodedData1 = encodeURIComponent(JSON.stringify(resultLabelArray));
    const encodedData2 = encodeURIComponent(JSON.stringify(resultValueArray));
    link = `https://localhost:3000/Summary?data1=${encodedData1}&data2=${encodedData2}&type=video`;
    window.location.href = link;
  });
}

