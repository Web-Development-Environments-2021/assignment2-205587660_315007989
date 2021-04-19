const database = [
  {
    username: "BarackObamaOfficial",
    password: "44thpresident",
  },
  {
    username: "HillaryClintonOfficial",
    password: "secretary ",
  },
  {
    username: "DonaldTrumpOfficial",
    password: "45thpresident",
  },
  {
    username: "JoeBidenOfficial",
    password: "46thpresident",
  },
];

const newsfeed = [
  {
    username: "DonaldTrumpOfficial",
    timeline: "Make America great again!",
  },
  {
    username: "BarackObamaOfficial",
    timeline: "Yes we can!",
  },
  {
    username: "JoeBidenOfficial",
    timeline: "God bless America.",
  },
];

let userNamePrompt = prompt("What's your username?");
let passwordPrompt = prompt("What's your password?");

// ---------- Option A ----------
function isUserValid(user, pass) {
  for (let i = 0; i < database.length; i++) {
    if (database[i].username === user && database[i].password === pass) {
      return true;
    }
  }
  return false;
}

function signIn(user, pass) {
  if (isUserValid(user, pass)) {
    console.log(newsfeed);
  } else {
    alert("Sorry, wrong username and password!");
  }
}

// ---------- Option B ----------
// function signIn(user, pass) {
//   if (database.find((e) => e.username == user && e.password == pass)) {
//     console.log(newsfeed);
//   } else {
//     alert("Sorry, wrong username and password!");
//   }
// }

signIn(userNamePrompt, passwordPrompt);
