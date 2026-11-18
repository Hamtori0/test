const titleScreen = document.getElementById('title-screen');
const playScreen = document.getElementById('play-screen');
const playBg = document.getElementById('play-bg');
const startBtn = document.getElementById('start-btn');
const dialogueBox = document.getElementById('dialogue-box');
const speakerName = document.getElementById('speaker-name');
const dialogueText = document.getElementById('dialogue-text');
const choiceBox = document.getElementById('choice-box');
const choiceBtns = document.querySelectorAll('.choice-btn');
const ingredientStage = document.getElementById('ingredient-stage');
const ingBtns = document.querySelectorAll('.ing-img-btn');
const restartBtn = document.getElementById('restart-btn');
const backBtn = document.getElementById('back-btn');

// 🌐 게임 컨테이너 및 언어 전환 버튼 요소
const gameContainer = document.getElementById('game-container');
const langBtn = document.getElementById('lang-btn');
const langBtnText = document.getElementById('lang-btn-text');
let currentLang = 'kr';

// 📌 모바일 화면 전환 시 빈 배경(핑크색) 깜빡임 방지를 위한 이미지 사전 로드
const preloadImages = [
    'title-bg.jpg',
    'play-bg.jpg',
    'dialogue-bg.png',
    'title-bg-box.png',
    'bowl-empty.jpg',
    'bowl-butter.jpg',
    'bowl-sugar.jpg',
    'bowl-salt.jpg',
    'bowl-egg.jpg',
    'bowl-flour.jpg',
    'empty-desk.png',
    'roll-dough.png',
    'cookie-cut.png',
    'oven-in.png',
    'oven-bake.png',
    'package-end.png',
    'embarrassed-bg.jpg'
];

preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
});

// ==========================================
// 📜 언어별 대사 및 텍스트 데이터셋 (KR / EN)
// ==========================================
const textData = {
    kr: {
        langButton: "English / KR",
        name: "원희",
        intro: [
            { name: "원희", text: "이제 베이킹을 시작해 볼까? 어떤 걸 만들지 고민인데..." },
            { name: "원희", text: "역시 첫 도전이니까 가장 무난한 버터 쿠키가 좋겠어!" },
            { name: "원희", text: "근데 어떡하지... 혼자 만들기는 어려울 것 같은데 글릿한테 도움을 청해볼까?" },
            { name: "원희", text: "저기... 쿠키 만드는 걸 도와줄 수 있을까?" }
        ],
        noRoute: [
            { name: "원희", text: "아, 그렇구나... 바쁘지? 갑자기 부탁해서 미안해!" },
            { name: "원희", text: "그래도 혼자서 열심히 만들어 볼게! 다음엔 꼭 같이 만들자!" }
        ],
        bakingScenes: [
            {
                bg: "url('empty-desk.png')",
                lines: [
                    "깨끗하게 정리된 작업대 세팅 완료!",
                    "이제 작업대 위로 반죽을 올려서 반듯하게 펴볼까~?"
                ]
            },
            {
                bg: "url('roll-dough.png')",
                lines: [
                    "작업대 위로 반죽을 예쁘게 펴줬어!",
                    "이제 귀여운 모양틀로 쿠키 반죽을 콕콕 찍어보자!"
                ]
            },
            {
                bg: "url('cookie-cut.png')",
                lines: [
                    "귀여운 모양틀로 쿠키 반죽도 콕콕 찍어냈지!",
                    "이제 쿠키 모양도 다 찍었으니 오븐에 넣어볼까~?"
                ]
            },
            {
                bg: "url('oven-in.png')",
                lines: [
                    "자, 틀에 찍은 반죽을 조심스럽게 오븐에 쏙 넣었어!",
                    "타지 않게 온도를 잘 맞춰서 노릇노릇하게 구워보자!"
                ]
            },
            {
                bg: "url('oven-bake.png')",
                lines: [
                    "와, 오븐 안쪽에서 노릇노릇하게 구워지는 거 봐! 달콤한 버터 냄새가 진동해~",
                    "이제 다 구워진 쿠키를 꺼내서 예쁘게 포장해 볼까?"
                ]
            },
            {
                bg: "url('package-end.png')",
                lines: [
                    "짜잔~ 리본까지 묶어서 예쁘게 포장 완료!",
                    "오늘 쿠키 만드는 거 도와줘서 정말 고마워! 다음에도 나랑 맛있는 쿠키 만들러 와줄 거지?"
                ]
            }
        ],
        reactions: {
            askHelp: "고마워! 먼저 볼에 버터를 넣고 부드럽게 풀어 줘!",
            butter: "좋아, 버터가 부드럽게 잘 풀렸어! 다음엔 설탕을 넣어 줘!",
            sugar: "달콤한 설탕이 들어갔네! 이제 소금을 한 꼬집 넣어 줘!",
            salt: "좋았어! 단짠 밸런스 완벽해! 이제 달걀을 넣어 줘!",
            egg: "달걀도 분리되지 않게 잘 섞였다! 마지막으로 체 친 밀가루를 넣어 줘!",
            flour: "와아! 드디어 뽀얗고 완벽한 쿠키 반죽이 완성됐어!",
            wrong: "어라? 지금 그 재료를 넣을 순서가 아닌 것 같아! 레시피를 다시 생각해볼까?"
        }
    },
    en: {
        langButton: "한국어 / EN",
        name: "Wonhee",
        intro: [
            { name: "Wonhee", text: "Hmm… What should we bake today? I’m so excited to get started!" },
            { name: "Wonhee", text: "Since this is my first time, I think I’ll start with some classic butter cookies!" },
            { name: "Wonhee", text: "But… I’m not sure I can do this all by myself. Maybe I should ask GLLIT for help?" },
            { name: "Wonhee", text: "Hey… Could you help me make some cookies?" }
        ],
        noRoute: [
            { name: "Wonhee", text: "Oh, that’s okay! Are you busy right now? Sorry for asking all of a sudden!" },
            { name: "Wonhee", text: "It’s okay! I’ll give it my best shot on my own! Let’s bake together next time, okay?" }
        ],
        bakingScenes: [
            {
                bg: "url('empty-desk.png')",
                lines: [
                    "All done! Our workspace is nice and tidy!",
                    "Now, let’s put the dough on the counter and roll it out nice and flat!"
                ]
            },
            {
                bg: "url('roll-dough.png')",
                lines: [
                    "There we go! The dough is all rolled out!",
                    "Now comes the fun part! Let’s cut out some cute shapes with our cookie cutters!"
                ]
            },
            {
                bg: "url('cookie-cut.png')",
                lines: [
                    "Look at all these cute little cookie shapes! We did it!",
                    "Okay, I think we’re ready! Let’s pop them into the oven!"
                ]
            },
            {
                bg: "url('oven-in.png')",
                lines: [
                    "Alright! Let’s carefully slide the tray into the oven!",
                    "Now, let’s make sure the temperature is just right so they come out perfectly golden!"
                ]
            },
            {
                bg: "url('oven-bake.png')",
                lines: [
                    "Wow! Look at them turning all golden and yummy! I wish you could smell that buttery goodness!",
                    "They look ready! Let’s take them out and get them all dressed up!"
                ]
            },
            {
                bg: "url('package-end.png')",
                lines: [
                    "Ta-da! All wrapped up with a pretty little ribbon! Aren’t they adorable?",
                    "Thank you so much for helping me today! I had so much fun baking with you. You’ll come bake with me again next time, right?"
                ]
            }
        ],
        reactions: {
            askHelp: "Yay! Thank you! Let’s start by putting the butter in a bowl. Give it a good mix until it’s nice and creamy!",
            butter: "Perfect! The butter is all smooth and creamy now! Okay, let’s add the sugar!",
            sugar: "Ooh, looking good! Now, let’s add just a pinch of salt!",
            salt: "Nice! A little sweet, a little salty. Perfect! Now, it’s time for the egg!",
            egg: "Great! Everything’s mixed together nicely! We’re almost there. Just add the sifted flour!",
            flour: "Whoa! Look at that! Our cookie dough is all ready! It looks so soft and smooth!",
            wrong: "Huh? Wait a second! I don’t think that’s the right ingredient just yet. Let’s take another look at the recipe!"
        }
    }
};

let currentList = textData[currentLang].intro; 
let currentDialogueIndex = 0; 
let isTyping = false;         
let timer = null;             
let currentText = "";         
let canClickDialogue = false; 
let gameState = 'intro'; 

let bakingStep = 0; 
let sceneIndex = 0;
let sceneLineIndex = 0;

// 🌐 우측 상단 언어 전환 버튼 클릭 이벤트
if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = (currentLang === 'kr') ? 'en' : 'kr';
        
        // 영어 모드일 때만 컨테이너에 'lang-en' 클래스 토글
        if (currentLang === 'en') {
            gameContainer.classList.add('lang-en');
        } else {
            gameContainer.classList.remove('lang-en');
        }

        updateUIText();
    });
}

// UI 텍스트 및 대사 언어 반영 함수
function updateUIText() {
    const data = textData[currentLang];
    if (langBtnText) langBtnText.textContent = data.langButton;

    // HTML 내 data-kr / data-en 속성 일괄 변경
    document.querySelectorAll('[data-kr]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // 현재 진행 중인 대사 리스트 갱신
    if (gameState === 'intro') {
        currentList = data.intro;
        showDialogue(currentDialogueIndex);
    } else if (gameState === 'no_route') {
        currentList = data.noRoute;
        showDialogue(currentDialogueIndex);
    } else if (gameState === 'ingredient' && bakingStep === 0) {
        speakerName.textContent = data.name;
        showFullDialogue(data.reactions.askHelp);
    }
}

// [게임 시작] 버튼 클릭 시
startBtn.addEventListener('click', () => {
    titleScreen.classList.add('hidden');
    playScreen.classList.remove('hidden');
    
    playBg.style.backgroundImage = "url('play-bg.jpg')";
    playBg.classList.remove('blurred');
    dialogueBox.classList.remove('hidden');
    choiceBox.classList.add('hidden');
    ingredientStage.classList.add('hidden');
    restartBtn.classList.add('hidden');
    backBtn.classList.add('hidden');

    currentList = textData[currentLang].intro;
    currentDialogueIndex = 0;
    gameState = 'intro';
    bakingStep = 0;
    sceneIndex = 0;
    sceneLineIndex = 0;
    
    let bgm = document.getElementById('bgm');
    if (!bgm) {
        bgm = document.createElement('audio');
        bgm.id = 'bgm';
        bgm.src = 'bgm.mp3';
        bgm.loop = true;
        document.body.appendChild(bgm);
    }
    
    bgm.volume = 0.4;
    bgm.play().catch(error => {
        console.log("오디오 재생 차단:", error);
    });

    showDialogue(currentDialogueIndex);

    canClickDialogue = false;
    setTimeout(() => {
        canClickDialogue = true;
    }, 300);
});

// [대화창(#dialogue-box)] 클릭 시
dialogueBox.addEventListener('click', () => {
    if (!canClickDialogue || gameState === 'choice' || gameState === 'ingredient' || gameState === 'end' || gameState === 'end_no') return; 

    // 타이핑 중일 때 클릭하면 대사 즉시 완성
    if (isTyping) {
        clearInterval(timer);
        dialogueText.textContent = currentText;
        isTyping = false;
        return;
    }

    const bakingScenes = textData[currentLang].bakingScenes;
    const charName = textData[currentLang].name;

    // 👇 반죽 완성 직후(bowl-flour.jpg) 상태에서 클릭 시 작업대 컷씬으로 진입!
    if (gameState === 'dough_complete') {
        gameState = 'baking_process';
        sceneIndex = 0;
        sceneLineIndex = 0;
        
        playBg.style.backgroundImage = bakingScenes[0].bg; 
        speakerName.textContent = charName;
        showFullDialogue(bakingScenes[0].lines[0]);
        return;
    }

    // 👇 반죽 완성 후 공정 컷씬 단계
    if (gameState === 'baking_process') {
        sceneLineIndex++;

        if (sceneLineIndex < bakingScenes[sceneIndex].lines.length) {
            speakerName.textContent = charName;
            showFullDialogue(bakingScenes[sceneIndex].lines[sceneLineIndex]);
        } else {
            sceneIndex++;
            sceneLineIndex = 0;

            if (sceneIndex < bakingScenes.length) {
                playBg.style.backgroundImage = bakingScenes[sceneIndex].bg;
                speakerName.textContent = charName;
                showFullDialogue(bakingScenes[sceneIndex].lines[sceneLineIndex]);
            }
        }

        if (sceneIndex === bakingScenes.length - 1 && sceneLineIndex === bakingScenes[sceneIndex].lines.length - 1) {
            gameState = 'end';
            setTimeout(() => {
                restartBtn.classList.remove('hidden');
            }, 1200);
        }
        return;
    }

    // 👇 일반 인트로 & '아니요' 루트 대사 진행
    currentDialogueIndex++;
    if (currentDialogueIndex < currentList.length) {
        showDialogue(currentDialogueIndex);
    } else {
        if (gameState === 'intro') {
            speakerName.textContent = "";
            dialogueText.textContent = "";
            dialogueBox.classList.add('hidden');
            playBg.classList.add('blurred'); // 배경 블러 처리
            choiceBox.classList.remove('hidden');
            gameState = 'choice';
        } else if (gameState === 'no_route') {
            backBtn.classList.remove('hidden');
            gameState = 'end_no';
        }
    }
});

// 리스트 기반 타이핑 효과 함수
function showDialogue(index) {
    if (timer) clearInterval(timer);
    const data = currentList[index];
    speakerName.textContent = data.name;
    currentText = data.text;
    dialogueText.textContent = ""; 
    
    let charIndex = 0;
    isTyping = true;
    
    timer = setInterval(() => {
        if (charIndex < currentText.length) {
            dialogueText.textContent += currentText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(timer);
            isTyping = false;
        }
    }, 30);
}

// 단일 텍스트용 타이핑 효과 함수
function showFullDialogue(text) {
    if (timer) clearInterval(timer);
    currentText = text;
    dialogueText.textContent = "";
    let charIndex = 0;
    isTyping = true;
    
    timer = setInterval(() => {
        if (charIndex < currentText.length) {
            dialogueText.textContent += currentText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(timer);
            isTyping = false;
        }
    }, 30);
}

// [예 / 아니요 선택지 버튼] 클릭 시
choiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const selectedChoice = e.currentTarget.getAttribute('data-choice');
        choiceBox.classList.add('hidden');
        playBg.classList.remove('blurred'); // 블러 해제
        dialogueBox.classList.remove('hidden');

        const data = textData[currentLang];

        if (selectedChoice === 'yes') {
            gameState = 'ingredient';
            bakingStep = 1; 
            
            playBg.style.backgroundImage = "url('bowl-empty.jpg')";
            
            speakerName.textContent = data.name;
            showFullDialogue(data.reactions.askHelp);
            ingredientStage.classList.remove('hidden');

        } else {
            gameState = 'no_route';
            playBg.style.backgroundImage = "url('embarrassed-bg.jpg')";
            
            currentList = data.noRoute;
            currentDialogueIndex = 0;
            showDialogue(currentDialogueIndex);
        }
    });
});

// [재료 이미지 버튼] 클릭 시
ingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const clickedIng = btn.getAttribute('data-ing'); 
        const data = textData[currentLang];
        
        if (bakingStep === 1) {
            if (clickedIng === 'butter') {
                playBg.style.backgroundImage = "url('bowl-butter.jpg')";
                speakerName.textContent = data.name;
                showFullDialogue(data.reactions.butter);
                bakingStep = 2; 
            } else { wrongOrderAlert(); }
        }
        else if (bakingStep === 2) {
            if (clickedIng === 'sugar') {
                playBg.style.backgroundImage = "url('bowl-sugar.jpg')";
                speakerName.textContent = data.name;
                showFullDialogue(data.reactions.sugar);
                bakingStep = 3; 
            } else { wrongOrderAlert(); }
        }
        else if (bakingStep === 3) {
            if (clickedIng === 'salt') {
                playBg.style.backgroundImage = "url('bowl-salt.jpg')";
                speakerName.textContent = data.name;
                showFullDialogue(data.reactions.salt);
                bakingStep = 4; 
            } else { wrongOrderAlert(); }
        }
        else if (bakingStep === 4) {
            if (clickedIng === 'egg') {
                playBg.style.backgroundImage = "url('bowl-egg.jpg')";
                speakerName.textContent = data.name;
                showFullDialogue(data.reactions.egg);
                bakingStep = 5; 
            } else { wrongOrderAlert(); }
        }
        else if (bakingStep === 5) {
            if (clickedIng === 'flour') {
                ingredientStage.classList.add('hidden');
                
                playBg.style.backgroundImage = "url('bowl-flour.jpg')"; 
                speakerName.textContent = data.name;
                showFullDialogue(data.reactions.flour);
                
                gameState = 'dough_complete';
            } else { wrongOrderAlert(); }
        }
    });
});

// 순서가 틀렸을 때 반응 대사 함수
function wrongOrderAlert() {
    const data = textData[currentLang];
    speakerName.textContent = data.name;
    showFullDialogue(data.reactions.wrong);
}

// [처음으로 돌아가기] 버튼 클릭 시
restartBtn.addEventListener('click', () => {
    playScreen.classList.add('hidden');
    titleScreen.classList.remove('hidden');
    restartBtn.classList.add('hidden');
    playBg.classList.remove('blurred');
    playBg.style.backgroundImage = "url('play-bg.jpg')";
});

// [이전으로 돌아가기] 버튼 클릭 시 (예, 아니요 선택창으로 복귀)
backBtn.addEventListener('click', () => {
    backBtn.classList.add('hidden');
    playBg.style.backgroundImage = "url('play-bg.jpg')";
    playBg.classList.add('blurred'); // 다시 블러 적용
    
    dialogueBox.classList.add('hidden');
    choiceBox.classList.remove('hidden');
    gameState = 'choice';
});