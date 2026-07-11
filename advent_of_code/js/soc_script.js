
const rows = 25; 

const calendar = document.querySelector("#calendar");
const countdowns = [];

function renderCalendar(leaderboard) {
  
  calendar.innerHTML = "";
  for (let row = 1; row <= rows; row++) {

    let problemAvailable = false;
    let targetDate;
    let output;
    let nb_stars;

    if (row <= 10) {
      targetDate = new Date(2026, 6, 19 + row, 7, 59, 59);
    }
    else if (row <= 20) {
      let day = row - 10 
      targetDate = new Date(2026, 7, 3 + row, 7, 59, 59);
    }
    else {
      let day = row - 20 
      targetDate = new Date(2026, 7, 15 + row, 7, 59, 59);
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
      nb_stars = checkValid(leaderboard, row)
      output.textContent = "*".repeat(nb_stars);
      output.style.color = "#f65c0e";
    }

    if (diff > 0) {
      countdowns.push({
        targetDate,
        element: output,
        day: row
      });
    }

    // Drawing 
    if (nb_stars === 1) {
      filler.textContent = drawing[`day${row}`];
    }
    if (nb_stars === 2) {
      filler.innerHTML = colorize(drawing[`day${row}`]);
    }

    // const star = document.createElement("span");
    // star.classList.add("calendar-completion");
    // star.textContent = "**";

    link.append(filler, " ", dayLabel, " ", output);
    // link.append(filler, " ", dayLabel, " ", star);
    calendar.appendChild(link);
    calendar.appendChild(document.createElement("br"));
  }
}

function updateCountdowns() {
  countdowns.forEach(({ targetDate, element, day }) => {
    const now = new Date();
    const diff = targetDate - now;

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

function checkValid(leaderboard, day) {
  let starOne = false
  let starTwo = false
  if (leaderboard.members["1029538"].completion_day_level[day]?.[1] &&
      leaderboard.members["1522078"].completion_day_level[day]?.[1] &&
      leaderboard.members["4467264"].completion_day_level[day]?.[1]) {
        starOne = true
  }
  if (leaderboard.members["1029538"].completion_day_level[day]?.[2] &&
      leaderboard.members["1522078"].completion_day_level[day]?.[2] &&
      leaderboard.members["4467264"].completion_day_level[day]?.[2]) {
        starTwo = true
  }
  if (starOne && starTwo) {
    return 2
  } else if (starOne) {
    return 1
  } else {
    return 0
  }

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
      // échapper les caractères HTML sensibles
      const safe = ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '&' ? '&amp;' : ch;
      return `<span class="${cls}">${safe}</span>`;
    })
    .join('');
}


// render 
// Update every second
// leaderboardData = loadLeaderboard();
// console.log(leaderboardData); 

// renderCalendar();
// setInterval(updateCountdowns, 1000);
// updateCountdowns();

// 1029538 - Cyrille
// 1522078 - Aurélien 
// 4467264 - Hugues 

async function init() {
  leaderboardData = await loadLeaderboard();  
  // console.log(leaderboardData);   
  // console.log(leaderboardData.members)    
  // console.log(leaderboardData.members["1029538"].completion_day_level["12"])    
  // console.log(leaderboardData.members["1522078"].completion_day_level["12"])    
  // console.log(leaderboardData.members["4467264"].completion_day_level["12"])            
  renderCalendar(leaderboardData);
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

init();

// renderCalendar()
// setInterval(updateCountdowns, 1000);
// updateCountdowns();

// If succed one star -> switch star + drawing 
// If succed two stars -> switch stars + drawing in color

// import fs from 'fs'

// const SESSION = process.env.AOC_SESSION
// const URL = 'https://adventofcode.com/2025/leaderboard/private/view/1029538.json'

// async function main() {
//   const response = await fetch(URL, {
//     headers: { Cookie: `session=${SESSION}` }
//   })
//   if (!response.ok) {
//     throw new Error(`AoC returned ${response.status}`)
//   }
//   const data = await response.json()
//   fs.writeFileSync('assets/leaderboard.json', JSON.stringify(data, null, 2))
//   console.log('Leaderboard updated')
// }

// main().catch(err => {
//   console.error(err)
//   process.exit(1)
// })


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