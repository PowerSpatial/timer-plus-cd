const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// challenge, the bare html is boring!
// use what you've learned and make the timer 00:00:00 with red color when timer expires!
const giveAway = document.querySelector('.giveaway');
const deadLine = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2023, 2, 19, 11, 59, 0);
// add 10 days when application start
const futureDate = new Date(tempYear, tempMonth, tempDay - 10, 11, 59, 0)

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveAway.textContent = `giveaway ends on ${weekday}, ${month} ${date}, ${year}, ${hours}:${minutes} pm`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return item = `0${item}`
    }

    return item
  }

  // handles the pass deadline situation
  if (t < 0 ) {
    //  clear the clock
    clearInterval(countDown);
    // set the count down to repeated 0
    items.forEach(function (item, index) {
      item.classList.add('expired');
      item.innerHTML = format(0);
    })
    deadLine.innerHTML = deadLine.innerHTML + `<h5>sorry the deadline has passed!</h5>`;
  } else{
    items.forEach(function (item, index) {
      item.innerHTML = format(values[index]);
    })
  }
}

//  count down
let countDown = setInterval(getRemainingTime, 1000);