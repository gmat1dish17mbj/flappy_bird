const canvas = document.getElementById("gameCanvas");
const ctx = canvas?.getContext("2d");
const startButton = document.getElementById("startButton");
const overlay = document.getElementById("overlay");
const statusTitle = document.getElementById("status-title");
const statusSubtitle = document.getElementById("status-subtitle");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const titleWrapper = document.querySelector(".title-wrapper");

if (!canvas || !ctx || !startButton || !overlay || !statusTitle || !statusSubtitle || !scoreEl || !bestScoreEl || !titleWrapper) {
	console.error("Flappy Bird UI elements are missing");
} else {
	const STAGE_WIDTH = canvas.width;
	const STAGE_HEIGHT = canvas.height;
	const BEST_SCORE_KEY = "flappy_bird_best";

	const config = {
		gravity: 0.0019,
		jumpForce: -0.56,
		pipeGap: 150,
		pipeWidth: 70,
		pipeSpeed: 0.19,
		pipeFrequency: 1500,
		birdRadius: 18,
		maxFallSpeed: 0.8
	};

	const state = {
		mode: "idle",
		birdX: STAGE_WIDTH * 0.25,
		birdY: STAGE_HEIGHT * 0.5,
		velocity: 0,
		pipes: [],
		score: 0,
		best: 0,
		lastSpawn: 0
	};
    
    const birdSprite = new Image();
	let birdReady = false;
	birdSprite.src = "images/bird.png";
	birdSprite.addEventListener("load", () => {
		birdReady = true;
	});

    const bgSprite = new Image();
	let bgReady = false;
	bgSprite.src = "images/bg.png";
	bgSprite.addEventListener("load", () => {
		bgReady = true;
	});

	let animationFrame = null;
	let lastTimestamp = 0;

	init();

	function init() {
		state.best = readBestScore();
		updateHud();
		setOverlayTexts("Tap to fly", "Press space, click, or tap to start");
		showTitle();
		showOverlay();
		attachEventListeners();
	}

	function attachEventListeners() {
		startButton.addEventListener("click", handleControl);
		canvas.addEventListener("pointerdown", handleControl);
		window.addEventListener("keydown", (event) => {
			if (event.code !== "Space") {
				return;
			}
			event.preventDefault();
			handleControl(event);
		});

		window.addEventListener("visibilitychange", () => {
			if (document.hidden && state.mode === "running") {
				endGame();
			}
		});
	}
    function handleControl(e){
        e?.preventDefault();
        if(state.mode!=="running"){
            startGame();
        }
        state.velocity=config.jumpForce;
    }
    function startGame(){
        state.mode="running";
        resetGame();
        hideTitle();
        hideOverlay();
        lastTimestamp=0;
        if (animationFrame){
            cancelAnimationFrame(animationFrame);
        }
        animationFrame=requestAnimationFrame(gameLoop);
    }
    function resetGame(){
        state.birdY=STAGE_HEIGHT*0.5;
        state.birdX=STAGE_WIDTH*0.25;
        state.velocity=0;
        state.pipes=[];
        state.score=0;
        state.lastSpawn=0;
        updateHud();
    }
}