let gameStarted = false;
let time = 180;
  let timer = 0;
  score = 0; 
  let minLabel =document.getElementById("min");
  let secLabel = document.getElementById("sec");
  let showDiv = document.getElementById("show");
  let information = document.getElementById("information");
function Start(){
  gameStarted = true;
  showDiv.style.display = "block";
  information.style.display = "none";
 gameStarted = true;  
    if(gameStarted){
      App()
      Time()
    }
}
function App(){
  let user = [];
  let currentIndex = 0;
  let counter = 0;
  let result = document.querySelector(".guess");
  let lastTextNode = document.getElementById("word");
  const sentences = [
    {sentences_1:"the cat slept"},
    {sentences_1:"he smiled wide"},
    { sentences_1: "the sun is shining brightly today" },
    {sentences_1: "the sun was shining brightly"},
    {sentences_1: "they laughed and danced all night"},
    {sentences_1:"the more i learn about this topic, the more fascinated i become"},
    {sentences_1:"the concert last night was amazing and the band played all of their best songs"},
    { sentences_1: "the more i learn about this topic the more fascinated i become" },
    {sentences_1: "when i was younger i used to love playing video games for hours on end"},
    { sentences_1: "learning a new skill or hobby can be challenging at first but it is also very rewarding in the end" },
  ];
  result.innerHTML = sentences[currentIndex]["sentences_1"];
  const word = sentences[currentIndex]["sentences_1"];
  let split = word.split("");
  function keydownHandler(e) {
    const key = e.key.toLowerCase();
    const currentLetter = split[user.length];
    if (e.code === "Space") {
      whiteSpace();
      return;
    }
      if(/^[a-z]$/.test(key)){
        score++;
        user.push(key)
        let modifiedSentence = user.join("").replace(/ /g, "_");
        document.getElementById("word").textContent = modifiedSentence
        if(modifiedSentence.length ==split.length){
          checkAnswer()
        }
        if(currentLetter !==key){
          counter++;
          let lastLetterIndex = user.lastIndexOf(key)
          user.splice(lastLetterIndex , 1);
          let modifiedSentence = user.join("").replace(/ /g, "_");
          document.getElementById("word").textContent = modifiedSentence
          alert("wrong")
        }
      }
    function whiteSpace() {
      user.push(" ");
      let modifiedSentence = user.join("").replace(/ /g, "_");
      document.getElementById("word").textContent = modifiedSentence;
    }
    
    function checkAnswer(){
  window.removeEventListener("keydown", keydownHandler);
  user = [];
  if (currentIndex < sentences.length - 1) {
    currentIndex++;
    split = sentences[currentIndex]["sentences_1"].split("");
    result.innerHTML = sentences[currentIndex]["sentences_1"];
    lastTextNode.innerHTML = null;
    window.addEventListener("keydown", keydownHandler);
  } else {
    alert("count typo is" + counter);
    document.getElementById("show").style.display = "none";
  document.getElementById("information").style.display = "block";
  }
  }
  }
  window.addEventListener("keydown", keydownHandler);
}
function uptadeTimer(){
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  let formattedMinutes = ('0' + minutes).slice(-2);
  let formattedSeconds = ('0' + seconds).slice(-2);

  minLabel.textContent = formattedMinutes + ":";
  secLabel.textContent = formattedSeconds;
  if(time ==0){
    clearInterval(timer)
    alert(`Game over your score is ${score} `);
    setInterval(() =>{
      End()
    } , 500)
    

  }
  time--;
}
function Time(){
  timer = setInterval(uptadeTimer , 1000)
}
function End(){
  window.location.reload();
}