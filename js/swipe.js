const swiper = document.querySelector(".section-swipe-hexagon");
const like = document.querySelector("#like");
const dislike = document.querySelector("#dislike");
const urls = [
  "assets/icons/vector/swipe-hex.svg",
  "assets/icons/vector/swipe-hex.svg",
  "assets/icons/vector/swipe-hex.svg",
  "assets/icons/vector/swipe-hex.svg",
  "assets/icons/vector/swipe-hex.svg",
];
let cardCount = 0;
let lastUserIndex = -1; 
let usersData = null;

class Card {
  constructor({ imageUrl, onDismiss, onLike, onDislike }) {
    this.imageUrl = imageUrl;
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.init();
  }

  startPoint;
  offsetX;
  offsetY;

  isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  init = () => {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.src = this.imageUrl;
    card.append(img);
    this.element = card;
    if (this.isTouchDevice()) {
      this.listenToTouchEvents();
    } else {
      this.listenToMouseEvents();
    }
  };

  listenToTouchEvents = () => {
    this.element.addEventListener("touchstart", (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.startPoint = { x: clientX, y: clientY };
      document.addEventListener("touchmove", this.handleTouchMove);
      this.element.style.transition = "transform 0s";
    });
    document.addEventListener("touchend", this.handleTouchEnd);
    document.addEventListener("cancel", this.handleTouchEnd);
  };

  listenToMouseEvents = () => {
    this.element.addEventListener("mousedown", (e) => {
      const { clientX, clientY } = e;
      this.startPoint = { x: clientX, y: clientY };
      document.addEventListener("mousemove", this.handleMouseMove);
      this.element.style.transition = "transform 0s";
    });
    document.addEventListener("mouseup", this.handleMoveUp);
    this.element.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  };

  handleMove = (x, y) => {
    this.offsetX = x - this.startPoint.x;
    this.offsetY = y - this.startPoint.y;
    const rotate = this.offsetX * 0.1;
    this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${rotate}deg)`;

    if (Math.abs(this.offsetX) > this.element.clientWidth * 0.7) {
      this.dismiss(this.offsetX > 0 ? 1 : -1);
    }
  };

  handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.startPoint) return;
    const { clientX, clientY } = e;
    this.handleMove(clientX, clientY);
  };

  handleMoveUp = () => {
    this.startPoint = null;
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.element.style.transform = "";
  };

  handleTouchMove = (e) => {
    if (!this.startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.handleMove(clientX, clientY);
  };

  handleTouchEnd = () => {
    this.startPoint = null;
    document.removeEventListener("touchmove", this.handleTouchMove);
    this.element.style.transform = "";
  };

  dismiss = (direction) => {
    this.startPoint = null;
    document.removeEventListener("mouseup", this.handleMoveUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("touchend", this.handleTouchEnd);
    document.removeEventListener("touchmove", this.handleTouchMove);
    this.element.style.transition = "transform 1s";
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add("dismissing");
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === "function") {
      this.onDismiss();
    }
    if (typeof this.onLike === "function" && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === "function" && direction === -1) {
      this.onDislike();
    }
  };
}

function appendNewCard() {
  const card = new Card({
    imageUrl: urls[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = "running";
      like.classList.toggle("trigger");
    },
    onDislike: () => {
      dislike.style.animationPlayState = "running";
      dislike.classList.toggle("trigger");
    },
  });

  swiper.appendChild(card.element);
  cardCount++;
  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index) => {
    card.style.setProperty("--i", index);
  });

  if (!usersData || cardCount >= usersData.length) {
    fetch('https://raw.githubusercontent.com/marroe01284/NEXUS/main/data.json')
      .then(response => response.json()) 
      .then(data => {
          usersData = data.users;
          const nextUserIndex = getNextUserIndex();
          displayUserOptions(usersData[nextUserIndex], card);
      })
      .catch(error => console.error('Error fetching data:', error));
  } else {
    const nextUserIndex = getNextUserIndex();
    displayUserOptions(usersData[nextUserIndex], card);
  }
}

function displayUserOptions(user, card) {
  const userOptionsDiv = document.createElement('div');
  userOptionsDiv.classList.add('user-options');

  const usernameElement = document.createElement('h4');
  usernameElement.textContent = `${user.username}`;
  usernameElement.classList.add('section-swipe-hexagon-username');
  userOptionsDiv.appendChild(usernameElement);

  const userImageElement = document.createElement('img');
  userImageElement.src = user.userImg;
  userImageElement.alt = `Profile Image of ${user.username}`;

  const userImageContainer = document.createElement('div');
  userImageContainer.classList.add('section-swipe-hexagon-user-image');
  userImageContainer.appendChild(userImageElement);

  userOptionsDiv.appendChild(userImageContainer);

  const favoriteGenreElement = document.querySelector('.swipe-card-right-genre');
  favoriteGenreElement.innerHTML = '';
  user.genre.forEach(genre => {
    const genreSpan = document.createElement('span');
    genreSpan.textContent = genre;
    favoriteGenreElement.appendChild(genreSpan);
  });

  const platformImgContainer = document.querySelector('.swipe-card-right-platform-img');
  platformImgContainer.innerHTML = '';
  user.platform.forEach(platform => {
    const platformImg = document.createElement('img');
    platformImg.src = `assets/icons/${platform.toLowerCase()}.svg`;
    platformImg.alt = platform;
    platformImgContainer.appendChild(platformImg);
  });

  card.element.appendChild(userOptionsDiv);
}

function getNextUserIndex() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * usersData.length);
  } while (nextIndex === lastUserIndex); 
  lastUserIndex = nextIndex;
  return nextIndex;
}

for (let i = 0; i < 5; i++) {
  appendNewCard();
}
