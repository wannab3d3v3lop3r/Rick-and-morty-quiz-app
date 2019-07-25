'use strict';

//state where all data is stored
const state = {
  quiz: [
    {
      question: "What duo created Rick & Morty?",
      multipleChoices: ["Dan Harmon and Dan Schnider", "Dan Harmon and Justin Roiland","Justin Roiland and Tom Kenny", "Jack Black and Rob Schrab", "Harmon Dan and Roilan Justin"],
      correctAnswer: "Dan Harmon and Justin Roiland"
    },
    {
      question: "What move does Rick and Morty draw influence from?",
      multipleChoices: ["Allen", "Back to the Future", "Starship Troopers", "Willy Wonka & The Chocolate Factory", "Star Wars"],
      correctAnswer: "Back to the Future"
    },
    {
      question: "What does Beth do for a living?",
      multipleChoices: ["Security Officer", "Astronomer", "Horse Surgeon", "Embalmer", "Playboy"],
      correctAnswer: "Horse Surgeon"
    },
    {
      question: "What is Rick's \"Universal Number\"?",
      multipleChoices: ["C-137","C-138","C-142","C-133", "C-136"],
      correctAnswer: "C-137"
    },
    {
      question: "What item helps Rick travel between universes?",
      multipleChoices: ["Portal Disc","Portal Wand","Plumbus","Portal Gun", "Morty"],
      correctAnswer: "Portal Gun"
    },
    {
      question: "Which actress voices Summer Smith?",
      multipleChoices: ["Spencer Grammer","Tara Strong","Laura Baily", "Kari Wahlgren", "Rihanna"],
      correctAnswer: "Spencer Grammer"
    },
    {
      question: "Rick and Morty appeared in the opening scene for what popular cartoon??",
      multipleChoices: ["The Simpsons","Bob's Burgers","Family Guy","American Dad", "South Park"],
      correctAnswer: "The Simpsons"
    },
    {
      question: "What is the name of Rick's half-avian half-human best friend??",
      multipleChoices: ["Bird Person","Bird Man","Hawk Guy","Falcon Dude", "Falcon Punch"],
      correctAnswer: "Bird Person"
    },
    {
      question: "Beth Smith is originally from what town?",
      multipleChoices: ["Chicago, Illinois", "Salt Lake City, Utah", "Pocatello, Idaho", "Muskegon, Michigan", "Columbus, Ohio"],
      correctAnswer: "Muskegon, Michigan"
    },
    {
      question: "What is Rick Sancez's famous song?",
      multipleChoices: ["Wubbalubbadubdub!","And that's the way the news goes!","Get Schwifty", "None of the Above", "All of the above"],
      correctAnswer: "Get Schwifty"
    }
  ],
  userFeedback: {
    correct: 'you are correct',
    incorrect: 'you are not the father'
  },
  answeredCorrectly: false,
  finalFeedback: {
    morty: `Not as smart as Rick, but you're good enough to be the sidekick`,
    rick: `I see you're a genius just like Rick`,
    jerry: `The Picture explains itself`
  },
  route: 'start',
  currentQuestionIndex: 0,
  correct: 0,
  incorrect: 0,
  rickImg: 'rickSanchez.jpg',
  mortyImg: 'Morty.png',
  jerryImg: 'jerry.jpg'
}

//Modify state
function updateRoute(state, route){
  state.route = route;
}

function updateCurrentCount(state){

}

function updateAnsweredCorrecty(state){

}

function updateCorrectAnswer(state){

}

function updateIncorrectAnswer(state){

}

//Render state
function renderQuiz(state, elements){
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  elements[state.route].show();

  if(state.route === 'start'){
    renderStartPage(state, elements[state.route])
  }
  else if(state.route === 'question'){
    renderQuestionPage(state, elements[state.route])
  }
  else if(state.route === 'answer-feedback'){
    renderFeedbackPage(state, elements[state.route])
  }
  else if(state.route === 'final-feedback'){
    renderFinalPage(state, elements[state.route])
  }
}

function renderStartPage(state, element){

}

function renderQuestionPage(state, element){
  renderQuestionText(state, element.find('.question'))
  renderQuestionOptions(state, element.find('.choice'))
  renderQuestionCount(state, element.find('.question-index'))
  renderScore(state, element.find('.correct-score'), element.find('.incorrect-score'))
}

function renderQuestionText(state, element){
  element.text(state.quiz[state.currentQuestionIndex].question);
}

function renderQuestionOptions(state, element){
  console.log(element);
  let questionOptions = state.quiz[state.currentQuestionIndex].multipleChoices.map(item => {
    return `<li>
              <input type="radio" name="user-answer" id="${item}" value="${item}" required/>
              <label for="${item}">${item}</label>
            </li>`
  })
  element.html(questionOptions);
}

function renderQuestionCount(state, element){
  element.text(`${state.currentQuestionIndex + 1} out of ${state.quiz.length} questions`)
}

function renderScore(state, correctElement, incorrectElement){
  correctElement.text(`${state.correct}`)
  incorrectElement.text(`${state.incorrect}`)
}

function compareAnswer(state, answer){
  if(answer === state.quiz[state.currentQuestionIndex].correctAnswer){
    state.correct++;
    state.answeredCorrectly = true;
  }
  else {
    state.incorrect++;
    state.answeredCorrectly = false;
  }
}

function renderFeedbackPage(state, element){
  renderFeedbackText(state, element.find('.feedback-text'))
}

function renderFeedbackText(state, element){
  state.answeredCorrectly ? element.text(`${state.userFeedback.correct}`) : element.text(`Correct answer is: ${state.quiz[state.currentQuestionIndex].correctAnswer}`)
  state.currentQuestionIndex++;
}

function renderFinalPage(state,element){
  renderFinalScore(state, element.find('.correct-score'), element.find('.incorrect-score'))
  renderFinalImage(state, element);

  let finalStatement = '';

  if(state.correct >= 7){
    finalStatement = state.finalFeedback.rick;
  }
  else if(state.correct >= 6)
    finalStatement = state.finalFeedback.morty;
  else {
    finalStatement = state.finalFeedback.jerry;
  }

  element.find('.final-statement').text(finalStatement);
}

function renderFinalScore(state, correctElement, incorrectElement){
  correctElement.text(`${state.correct}`)
  incorrectElement.text(`${state.incorrect}`)
}

function renderFinalImage(state, element){
  let src = ''
  if(state.correct >= 7){
    src = state.rickImg;
  }
  else if(state.correct >= 6)
    src = state.mortyImg;
  else {
    src = state.jerryImg;
  }

  element.find('.final-pic').attr('src',src);
}

function renderReset(state){
  state.currentQuestionIndex = 0;
  state.correct = 0;
  state.incorrect = 0;
  state.route = 'start';
}

//Event Listeners
const PAGE_ELEMENTS = {
  'start': $('.start-page'),
  'question': $('.question-page'),
  'answer-feedback': $('.answer-feedback-page'),
  'final-feedback': $('.final-feedback-page')
}

$("button[name='enter']").click(function(){
  updateRoute(state, 'question');
  renderQuiz(state, PAGE_ELEMENTS)
})

$(".choices").submit(function(e){
  e.preventDefault();
  let answer = $(`input[name='user-answer']:checked`).val();
  compareAnswer(state, answer);
  updateRoute(state, 'answer-feedback');
  renderQuiz(state, PAGE_ELEMENTS);
})

$('.next').click(function(){
  if(state.currentQuestionIndex === 10){
    updateRoute(state, 'final-feedback');
  }
  else{
    updateRoute(state, 'question');
  }

  renderQuiz(state, PAGE_ELEMENTS);
})

$("button[name='reset']").click(function(){
  updateRoute(state, 'start');
  renderReset(state)
  renderQuiz(state, PAGE_ELEMENTS);
})


$(function(){
  let height = $(document).height();
  let width = $(document).width();
  
  $('.container').css('height',height).css('width',width);
  renderQuiz(state, PAGE_ELEMENTS)
})