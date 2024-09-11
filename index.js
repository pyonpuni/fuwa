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
    .setApplicationId('1280906241501036544')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/discord')
    .setState('Streaming with Squad')
    .setName('Battlegrounds Mobile India')
    .setDetails(`Streaming BGMI [${formatTime()}]`)
    .setParty({
      max: 8130,
      current: 973,
      id: Discord.getUUID()
    })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66e30ddd&is=66e1bc5d&hm=1db0ed3ce3b1aec3aa1d8e31bbf38abe54780c36054876985b46493e8e74f8a1&=&format=webp&quality=lossless')
    .setAssetsLargeText('Battleground Mobile India')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66e32962&is=66e1d7e2&hm=823092bf32f499609b4b89651cfac6e0e449ed85e97cf7a8b6265edc13c5e223&=')
    .setAssetsSmallText('Verified')
    .addButton('Join My Discord', 'https://discord.gg/SVqQYEMp8m')
    .addButton('Follow My Instagram', 'https://www.instagram.com/kalpesh.___3080');

  try {
    client.user.setActivity(r);
    client.user.setPresence({ status: "idle" });

    let prevTime = null;
    setInterval(() => {
      const newTime = formatTime();
      if (newTime !== prevTime) {
        const newDetails = `BGMI Playing [${newTime}]`;
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
