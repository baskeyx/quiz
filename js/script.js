var qs = [{
  q: "Question 1?",
  c: ["Answer 1a","Answer 1b","Answer 1c","Answer 1d"]
}, {
  q: "Question 2?",
  c: ["Answer 2a","Answer 2b","Answer 2c","Answer 2d"]
}, {
  q: "Question 3?",
  c: ["Answer 3a","Answer 3b","Answer 3c","Answer 3d"]
}, {
  q: "Question 4?",
  c: ["Answer 4a","Answer 4b","Answer 4c","Answer 4d"]
}, {
  q: "Question 5?",
  c: ["Answer 5a","Answer 5b","Answer 5c","Answer 5c"]
}, {
  q: "Question 6?",
  c: ["Answer 6a","Answer 6b","Answer 6c","Answer 6d"]
}];

var as = [
  {name: "a", total:0},
  {name: "b", total:0},
  {name: "c", total:0},
  {name: "d", total:0}
];

var htmlMarkup = "";
var currentQuestion = 0;
var totalQuestions = qs.length;
var quizAnswers = [0,0,0,0];


function printQuestion(){
  htmlMarkup += "<div class='question question-" + i + "'><span>" + qs[i].q + "</span>";
  for (j=0;j<qs[i].c.length;j++){
    htmlMarkup += "<div class='answer answer-" + j + "' data-value='" + j + "'> " + qs[i].c[j] + "</div>";
  }
  htmlMarkup += "</div>";
}

for (i=0;i<totalQuestions;i++){
  printQuestion();
}

var quizCon = document.querySelector(".quiz-con");
document.querySelector(".quiz-con .quiz").innerHTML = htmlMarkup;

var answers = document.querySelectorAll(".answer");
var questions = document.querySelectorAll(".question");

function answer(a){
  as[parseInt(a.getAttribute("data-value"))].total ++;

  for (j=0;j<questions.length;j++){
    questions[j].style.display = "none";
  }

  if (currentQuestion > (totalQuestions-2)){
    var x=Object.keys(as).reduce(function(a, b){ return as[a].total > as[b].total ? a : b });
    document.querySelector(".confirmation .output").innerHTML = as[x].name;
    quizCon.className += " complete";

  }
  else{
    currentQuestion++;
    questions[currentQuestion].style.display = "block";
  }
}

for (i=0;i<answers.length;i++){
  answers[i].addEventListener("click", function(){
    answer(this);
  });
}
