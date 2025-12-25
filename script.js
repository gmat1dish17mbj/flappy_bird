//initialization for the flabby bird gothrough
const canvas = document.getElementById("gameCanvas");
const ctx = canvas?.getContext("2d");
const startButton = document.getElementById("startButton");
const overlay = document.getElementById("overlay");
const statusTitle = document.getElementById("status-title");
const statusSubtitle = document.getElementById("status-subtitle");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const bird={

}
if (!canvas || !ctx || !startButton || !overlay || !statusTitle || !statusSubtitle || !scoreEl || !bestScoreEl) {
	console.error("Flappy Bird UI elements are missing");
} else {
	const STAGE_WIDTH = canvas.width;
	const STAGE_HEIGHT = canvas.height;
	const BEST_SCORE_KEY = "flappy_bird_best";

	const variables = {
		gravity: 0.0019,
		jumpForce: -0.56,
		pipeGap: 150,
		pipeWidth: 70,
		pipeSpeed: 0.19,
		pipeFrequency: 1500,
		birdRadius: 18,
		maxFallSpeed: 0.8
	};
    //Define the game_sate object n which holds the current state of the game and then BirdImage object to load the bird image
    const gameSate={
        x:STAGE_WIDTH*0.25,
        y:STAGE_HEIGHT*0.5,
        velocity:0,
        score:0,
        bestScore:parseInt(localStorage.getItem(BEST_SCORE_KEY))||0,
        pipes:[],
        lastSpawn:0,
        isRunning:false,
        isGameOver:false
    };
    const BirdImage=new Image();
    BirdImage.src="bird.png";
    let birdLoaded=false;
    BirdImage.addEventListener("Load",()=>{
        birdLoaded=true;
    });
}
function init(){
    updateHud();
    showTittle();
    showOverlay();
    setOverlayTexts("Tap to fly","Press space,click, or tap to start")
    state.bestScore=readBestScore();
    attachEventListeners();
}