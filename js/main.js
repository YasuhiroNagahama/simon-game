const config = {
  topPage: document.getElementById("topScreen"),
  gamePage: document.getElementById("gameScreen"),
  overPage: document.getElementById("gameOverScreen"),
};

class Element {
  static createGameOverImg() {
    const gameOverImgWrap = document.createElement("div");
    gameOverImgWrap.classList.add(
      "game-over_img-wrapper",
      "border",
      "border-4",
      "border-white"
    );
    const userLevelImg = Game.getUserLevelImg(Game.getUserLevel());

    gameOverImgWrap.innerHTML = `
      <img
        src="${userLevelImg}"
        alt="userLevel"
        id="userLevelImg"
        class="game-over_img"
        width="200"
        height="120"
      />
    `;

    return gameOverImgWrap;
  }

  static createGameOverAbout() {
    const gameOverAboutWrap = document.createElement("div");
    gameOverAboutWrap.classList.add(
      "game-over_about-wrapper",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "gap-5",
      "mt-5"
    );
    const userLevel = Game.getUserLevel();

    gameOverAboutWrap.innerHTML = `
      <p
        class="game-over_user-level-wrapper h1 fw-bold text-white text-center"
      >
        Your level is
        <span id="userLevel" class="border-bottom border-3 border-white">
          ${userLevel}
        </span>
      </p>
      <div
        class="game_restart-btn-wrapper d-flex justify-content-center align-items-center bg-white"
        id="gameRestartBtn"
      >
        <button class="game_reset-btn h1 fw-bold text-dark">Restart</button>
      </div>
        `;

    return gameOverAboutWrap;
  }

  static appendGameOverScreen() {
    config.overPage.append(Element.createGameOverImg());
    config.overPage.append(Element.createGameOverAbout());
  }

  static createUserInfoWrap() {
    const userName = document.getElementById("userName").value;
    let userOrigin = document.getElementById("userOrigin").value;

    const userInfoWrap = document.createElement("div");
    userInfoWrap.classList.add("game_user-info-wrapper");

    userOrigin = userOrigin == "" ? "Namek" : userOrigin;

    userInfoWrap.innerHTML = `
      <ul
      class="game_user-info_list d-flex justify-content-center align-items-center gap-5"
      >
        <li
          id="gameUserName"
          class="game_user-info_item h2 fw-bold border-bottom border-4 border-dark pb-2"
        >
        ${userName}
        </li>
        <li
          id="userOrigin"
          class="game_user-info_item h2 fw-bold border-bottom border-4 border-dark pb-2"
        >
        ${userOrigin}
        </li>
      </ul>
    `;

    return userInfoWrap;
  }

  static createSimonBtn() {
    const simonBtnWrap = document.createElement("div");
    simonBtnWrap.classList.add(
      "game_simon-btn_list",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "flex-wrap",
      "gap-2",
      "mt-5"
    );

    simonBtnWrap.innerHTML = `
    <div class="game_simon-btn_item d-flex justify-content-center align-items-center gap-2">
      <div id="greenBtn" class="game_simon-btn-wrapper bg-success" data-color="green">
        <button class="game_simon-btn"></button>
      </div>
      <div id="redBtn" class="game_simon-btn-wrapper bg-danger" data-color="red">
        <button class="game_simon-btn"></button>
      </div>
    </div>
    <div class="game_simon-btn_item d-flex justify-content-center align-items-center gap-2">
      <div id="yellowBtn" class="game_simon-btn-wrapper bg-warning" data-color="yellow">
        <button class="game_simon-btn"></button>
      </div>
      <div id="blueBtn" class="game_simon-btn-wrapper bg-primary" data-color="blue">
        <button class="game_simon-btn"></button>
      </div>
    </div>
    `;

    return simonBtnWrap;
  }

  static createCountBox() {
    const countBox = document.createElement("div");
    countBox.classList.add(
      "game_count-box",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "h2",
      "mt-4",
      "fw-bold"
    );

    const count = document.createElement("p");
    count.innerHTML = "0";
    count.classList.add(
      "game_count",
      "border",
      "border-4",
      "border-dark",
      "py-2",
      "px-3"
    );
    count.id = "gameCount";

    countBox.append(count);

    return countBox;
  }

  static appendGameScreen() {
    config.gamePage.append(Element.createUserInfoWrap());
    config.gamePage.append(Element.createSimonBtn());
    config.gamePage.append(Element.createCountBox());
  }
}

class Animation {
  static changeSimonBtn(color) {
    const simonBtncolors = {
      green: document.getElementById("greenBtn"),
      red: document.getElementById("redBtn"),
      yellow: document.getElementById("yellowBtn"),
      blue: document.getElementById("blueBtn"),
    };

    simonBtncolors[color].style.opacity = 0.3;
    simonBtncolors[color].style.transform = "scale(0.8)";

    const audio = new Audio(Sound.getSimonSounds(color));
    audio.play();

    setTimeout(() => {
      audio.pause();

      simonBtncolors[color].style.opacity = null;
      simonBtncolors[color].style.transform = null;
    }, 500);
  }

  static clickSimonBtn() {
    const simonBtns = document.querySelectorAll(".game_simon-btn-wrapper");

    for (let i = 0; i < simonBtns.length; i++) {
      simonBtns[i].addEventListener("mousedown", function () {
        if (!Game.notClickable) simonBtns[i].style.opacity = 0.3;
      });

      simonBtns[i].addEventListener("mouseup", function () {
        if (!Game.notClickable) simonBtns[i].style.opacity = null;
      });
    }
  }
}

class Sound {
  static getSimonSounds(key) {
    const sounds = {
      start: "sound/スタート.mp3",
      green: "sound/ホイッスル_normal.mp3",
      red: "sound/ホイッスル_low.mp3",
      yellow: "sound/ホイッスル_high.mp3",
      blue: "sound/ホイッスル_lowest.mp3",
    };

    return sounds[key];
  }

  static startSound() {
    const startAudio = new Audio(Sound.getSimonSounds("start"));
    startAudio.play();
    return startAudio;
  }
}

class Game {
  static gameColorList = ["green"];
  static notClickable = true;
  static isAITurn = true;

  static changeScreen(removeScreen, addScreen) {
    removeScreen.classList.remove("d-block");
    removeScreen.classList.add("d-none");

    addScreen.classList.add("d-block");
    addScreen.classList.remove("d-none");
  }

  static resetGameInfo() {
    Game.gameColorList = ["green"];
    Game.notClickable = true;
  }

  static clickRestartBtn() {
    const restartBtn = document.getElementById("gameRestartBtn");

    restartBtn.addEventListener("click", function () {
      config.overPage.innerHTML = "";
      Game.resetGameInfo();
      Game.changeScreen(config.overPage, config.topPage);
    });
  }

  static gameOverProcess() {
    config.gamePage.innerHTML = "";
    Game.clickRestartBtn();
    Game.changeScreen(config.gamePage, config.overPage);
  }

  static getUserLevelImg(level) {
    const levelImg = {
      Beginner: "img/Beginner.png",
      Intermediate: "img/Intermediate.png",
      Advanced: "img/Advanced.png",
      Expert: "img/Expert.png",
      Master: "img/Master.png",
    };

    return levelImg[level];
  }

  static getUserLevel() {
    const levelList = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert",
      "Master",
    ];

    const gameScore = document.getElementById("gameCount").innerHTML;
    const level =
      gameScore < 8
        ? levelList[0]
        : gameScore < 14
        ? levelList[1]
        : gameScore < 18
        ? levelList[2]
        : gameScore < 22
        ? levelList[3]
        : levelList[4];

    return level;
  }

  static addCountBox() {
    const gameCount = document.getElementById("gameCount");
    gameCount.innerHTML = Number(gameCount.innerHTML) + 1;
  }

  static addNewColor() {
    const colorList = ["green", "red", "yellow", "blue"];
    const randomNum = Math.floor(Math.random() * 4);

    Game.gameColorList.push(colorList[randomNum]);
  }

  static gameUpdate() {
    Game.addNewColor();
    Game.addCountBox();
  }

  static userTurn() {
    Game.isAITurn = false;

    let count = 0;
    const simonBtns = document.querySelectorAll(".game_simon-btn-wrapper");

    for (let i = 0; i < simonBtns.length; i++) {
      simonBtns[i].addEventListener("click", function () {
        if (Game.notClickable) return false;

        const maxCount = Game.gameColorList.length;
        const dataColor = simonBtns[i].getAttribute("data-color");

        if (dataColor == Game.gameColorList[count]) {
          count++;

          if (count >= maxCount) {
            count = 0;

            Game.gameUpdate();
            Game.notClickable = true;
            Game.aiTurn();
          }
        } else {
          Element.appendGameOverScreen();
          Game.gameOverProcess();
        }
      });
    }
  }

  static aiTurn() {
    Game.isAITurn = true;

    let counter = 0;
    const maxCount = Game.gameColorList.length;

    const intervalId = setInterval(function () {
      Animation.changeSimonBtn(Game.gameColorList[counter]);

      counter++;
      if (counter >= maxCount) {
        clearInterval(intervalId);
        Game.notClickable = false;
      }
    }, 700);
  }

  static startGame() {
    Element.appendGameScreen();

    Animation.clickSimonBtn();

    const startAudio = Sound.startSound();

    startAudio.addEventListener("ended", function () {
      Game.aiTurn();
      Game.userTurn();
    });
  }

  static confirmGameStart() {
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", function () {
      const userName = document.getElementById("userName").value;

      if (userName == "") {
        alert("名前を入力してください。");
      } else if (userName.length > 8) {
        alert("名前は8文字以下にしてください。");
      } else if (confirm("ゲームを開始する。")) {
        Game.changeScreen(config.topPage, config.gamePage);
        Game.startGame();
      }
    });
  }
}

Game.confirmGameStart();
