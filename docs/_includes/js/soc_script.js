
const rows = 24; 


const calendar = document.querySelector("#calendar");
const countdowns = [];

function renderCalendar() {
  
  calendar.innerHTML = "";
  for (let row = 1; row <= rows; row++) {

    let problemAvailable = false;
    let targetDate;

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
    filler.textContent = " ".repeat(60);

    const dayLabel = document.createElement("span");
    dayLabel.classList.add("calendar-day");
    dayLabel.textContent = ` ${row}`;

    const counter = document.createElement("span");
    counter.classList.add("calendar-counter");
    // updateCountdown(targetDate, counter, row);

    countdowns.push({
      targetDate,
      element: counter,
      day: row
    });

    // const star = document.createElement("span");
    // star.classList.add("calendar-completion");
    // star.textContent = "**";

    link.append(filler, " ", dayLabel, " ", counter);
    // link.append(filler, " ", dayLabel, " ", star);
    calendar.appendChild(link);
    calendar.appendChild(document.createElement("br"));
  }
}

renderCalendar()

// const targetDate = new Date(2026, 11, 31, 23, 59, 59);

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

// Update everysecond
setInterval(updateCountdowns, 1000);
updateCountdowns();

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
