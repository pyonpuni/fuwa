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
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1011444419838353429/1284314070933311589/Untitled1057_20240913193949.gif?ex=66e62e2f&is=66e4dcaf&hm=2f5e80b51e638aa8273fa6e2b901d118386e825a64f51c510ccaeb2ec55c5aa5&')
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
