

const rows = 25; 
const calendar = document.querySelector("#calendar");
const countdowns = [];
const refresh = document.querySelector(".title-event-wrap");
const textOriginal = "0x0000";
let isHovering = false;


function scrambleTo(newText) {
  gsap.to(refresh, {
    duration: 1.2,
    scrambleText: { text: newText, chars: "lowerCase", speed: 0.3 },
    overwrite: true
  });
}


function renderCalendar(leaderboard) {
  
  calendar.innerHTML = "";
  for (let row = 1; row <= rows; row++) {

    let problemAvailable = false;
    let targetDate;
    let output;
    let nb_stars;

    if (row <= 8) {
      targetDate = new Date(2026, 6, 19 + row, 7, 59, 59);
    }
    else if (row <= 9) {
      targetDate = new Date(2026, 6, 20 + row, 7, 59, 59);
    }
    else if (row <= 20) {
      let day = row - 10 
      targetDate = new Date(2026, 7, 5 + day, 7, 59, 59);
    }
    else { // Update later
      let day = row - 20 
      targetDate = new Date(2026, 7, 15 + day, 7, 59, 59);
    }

    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      problemAvailable = true;
    }

    const link = document.createElement("a");
    link.setAttribute("aria-label", `Day ${row}`);
    if (problemAvailable === true) {
      link.href = `https://adventofcode.com/2015/day/${row}`;
    }
    link.classList.add(`calendar-day${row}`, "calendar-row");
    link.dataset.day = row;

    const filler = document.createElement("span");
    filler.classList.add("calendar-filler");
    filler.textContent = " ".repeat(68);

    const dayLabel = document.createElement("span");
    dayLabel.classList.add("calendar-day");
    dayLabel.textContent = ` ${row}`;

    if (diff > 0) {
      output = document.createElement("span");
      output.classList.add("calendar-counter");
      // updateCountdown(targetDate, counter, row);
    }
    else {
      output = document.createElement("span");
      output.classList.add("calendar-stars");
      output.style.color = "#f65c0e";
      const [starsOne, starsTwo] = checkValid(leaderboard, row);
      
      if (starsOne > 0) {
        const star1 = document.createElement("span");
        star1.textContent = "*";
        star1.style.opacity = starsOne / 2;
        output.appendChild(star1);
      }

      if (starsTwo > 0) {
        const star2 = document.createElement("span");
        star2.textContent = "*";
        star2.style.opacity = starsTwo / 2;

        // In Progress -> Add some textShadow in addition

        // star2.style.fontWeight = 300 + starsTwo * 100;
        // text-shadow: rgb(255, 255, 255) 0px 0px 5px;
        // star2.style.textShadow = `0 0 ${starsTwo * 3}px #dcd3d1`;
        // star2.style.filter = `drop-shadow(0 0 ${starsTwo * 5}px #f65c0e)`;
        // star2.style.textShadow= `0 0 ${starsTwo/3}px #f65c0e, 0 0 5px #f65c0e`
        output.appendChild(star2);
      }
    }

    if (diff > 0) {
      countdowns.push({
        targetDate,
        element: output,
        day: row, 
        type: 'day'
      });
    }

    // Drawing 
    const [starsOne, starsTwo] = checkValid(leaderboard, row);
    if (starsOne > 0) {
      filler.textContent = drawing[`day${row}`];
      filler.style.opacity = starsOne / 2;
    }
    if (starsTwo > 0) {
      filler.innerHTML = colorize(drawing[`day${row}`]);
      filler.style.opacity = starsTwo / 2;
    }

    link.append(filler, " ", dayLabel, " ", output);
    calendar.appendChild(link);
    calendar.appendChild(document.createElement("br"));
  }
}


function updateCountdowns() {
  countdowns.forEach((countdownObj) => {
    const { targetDate, element, type } = countdownObj;
    const now = new Date();
    const diff = targetDate - now;

    if (type === 'day') {
      if (diff <= 0) {
        element.textContent = ``;
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      element.textContent =
        `${String(days).padStart(2, "0")}:` +
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;

    } else if (type === 'refresh') {
      let text;
      if (diff <= 0) {
        text = `---now`;
      } else {
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        text = `-${String(minutes).padStart(2, "0")}'${String(seconds).padStart(2, "0")}`;
      }
      countdownObj.currentText = text; 
      if (isHovering) refresh.textContent = text;;
    }
  });
}


let leaderboard = null;
async function loadLeaderboard() {
  try {
    const res = await fetch('https://aoc-proxy.h-esc.workers.dev');
    if (!res.ok) throw new Error(`Worker error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
    return null;
  }
}


function checkIfFinish(leaderboard, usr, day, part) {
  if (leaderboard.members[usr].completion_day_level[day]?.[part]) {
    return 1
  }
  return 0
}


function checkValid(leaderboard, day) {
  let starOne = 0
  let starTwo = 0

  starOne += checkIfFinish(leaderboard, "1029538", day, 1)
  starOne += checkIfFinish(leaderboard, "1522078", day, 1)
  starOne += checkIfFinish(leaderboard, "4467264", day, 1)

  starTwo += checkIfFinish(leaderboard, "1029538", day, 2)
  starTwo += checkIfFinish(leaderboard, "1522078", day, 2)
  starTwo += checkIfFinish(leaderboard, "4467264", day, 2)

  return [starOne, starTwo]
}


function classify(ch) {
  if (ch === 'a' || ch === 'A') return 'sail';
  if (ch === '8') return 'hull';
  if ('PYX"\''.includes(ch)) return 'hull';
  if ('/\\|;'.includes(ch)) return 'rig';
  if (':.,_-`='.includes(ch)) return 'water';
  return 'default';
}


function colorize(line) {
  return line
    .split('')
    .map(ch => {
      if (ch === ' ') return ' ';
      const cls = classify(ch);
      const safe = ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '&' ? '&amp;' : ch;
      return `<span class="${cls}">${safe}</span>`;
    })
    .join('');
}


// 1029538 - Cyrille
// 1522078 - Aurélien 
// 4467264 - Hugues 


async function init() {
  leaderboardData = await loadLeaderboard();  

  const leaderbordDataStars = JSON.parse(leaderboardData.data)
  
  // hidden counter setup
  const fetchTime = new Date(leaderboardData.fetchedAt)
  const nextFetch = new Date(fetchTime.getTime()); nextFetch.setMinutes(nextFetch.getMinutes() + 15);
  const countdownObj = document.createElement("span")
  countdownObj.classList.add(".title-event-wrap")
  const refreshCountdown = {targetDate: nextFetch, element: countdownObj, day: '', type: 'refresh'};
  countdowns.push(refreshCountdown);
  
  refresh.addEventListener("mouseenter", () => {
    isHovering = true;
    scrambleTo(refreshCountdown.currentText);
  });

  refresh.addEventListener("mouseleave", () => {
    isHovering = false;
    scrambleTo(textOriginal);
  });
  
  renderCalendar(leaderbordDataStars);
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}


init();


// ASCII Drawing (Andreas Freise)
const drawing = {
  day1  : String.raw`       \  / t         ,a8   _/  _____                               `,
  day2  : String.raw`  \__   "c   \  ___/  "Y8  a8\      ---__________                   `,
  day3  : String.raw`     \_       \        a \/  |   _________       __________         `,
  day4  : String.raw`      a  ._  _/_      a8a   /;                      _____           `,
  day5  : String.raw`   __/P8    \  '8a. ./Y'8-__a:.    |*>                              `,
  day6  : String.raw`  /a'' \.   a.    a66a'    88:     |                                `,
  day7  : String.raw`       /8a  Y8a    6P_  _  a8.:    |                                `,
  day8  : String.raw` --., / "878/88a._./8:\____a;; .   |                                `,
  day9  : String.raw`    a__   \:::.::.::.::.;;;...     |                          ____  `,
  day10 : String.raw` -_  (|\__/:.: ,:.. .    .   .     |                                `,
  day11 : String.raw`  \.   /:.:. . .                   | =>.-.                          `,
  day12 : String.raw`   \_ /::. ,                     .-|| |]- ]                         `,
  day13 : String.raw`     |:.                      .-\ aa'-'.-'/___                      `,
  day14 : String.raw` .   \:  .                  .'\ '   .-'  /                          `,
  day15 : String.raw` \.   /.                   [ _/\_.-'  _:'   .8888.                  `,
  day16 : String.raw`  \:_/.  .              ___ \ |  _..:='  .:8888P                    `,
  day17 : String.raw`   \:.                    ---\| /:='___-.88888P'                    `,
  day18 : String.raw`    |: .                      "''  ...:88888P'                      `,
  day19 : String.raw`    /. .       ___                 888888P' . .                     `,
  day20 : String.raw`  ----_                            "8P''                        ___ `,
  day21 : String.raw`    _  \                                                            `,
  day22 : String.raw`   /   /                       ___                                  `,
  day23 : String.raw`      a:                                                            `,
  day24 : String.raw`     ./ \_                                                          `,
  day25 : String.raw`   <     \ -.                                 ______                `
}