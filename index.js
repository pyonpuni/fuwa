const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() {
  const date = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - Successfully Logged On!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1283962483220025547')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/developer')
    .setState('きみを想うたび')
    .setName('冬芽')
    .setDetails(`I・LOVE・YOU!!`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1264746904365830184/1284305426862833735/Untitled1052_20240912203447.gif?ex=66e62623&is=66e4d4a3&hm=cc47dafdf998abaea425500b3aa36d13fa81e01317c06ed846cd574c9a5bd3f4&')
    .setAssetsLargeText('赤く色づくの♡')
    .addButton('大好き～!!', 'https://fuyume.bearblog.dev');

  try {
    client.user.setActivity(r);
    client.user.setPresence({ status: "idle" });

    let prevTime = null;
    setInterval(() => {
      const newTime = formatTime();
      if (newTime !== prevTime) {
        const newDetails = `I・LOVE・YOU!!`;
        r.setDetails(newDetails);
        client.user.setActivity(r);
        prevTime = newTime;
      }
    }, 1000); // Update every second
  } catch (error) {
    console.error('Error setting activity or presence:', error);
  }
});

const mySecret = process.env['TOKEN'];
client.login(mySecret).catch(err => console.error('Login error:', err));
