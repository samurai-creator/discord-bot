const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.');
  }

  else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`First argument: ${args[0]}`);
  }

  else if (command === 'kick') {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }
    // Grab the "first" mentioned user from the message
    // This will return a `User` object, just like `message.author`
    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
  }

  else if (command === 'beep') {
    // send back "Boop." to the channel the message was sent in
    message.channel.send('Boop.');
  }

  else if (command === 'server') {
    // send back server's name to the channel the message was send in
    message.channel.send(`This server's name is: ${message.guild.name}`);
  }

  else if (command === 'userinfo') {
    //sends back the user-info to the channel the message was sent in
    message.channel.send(`Your username is: ${message.author.username}\n Your user id is: ${message.author.id}`);
  }

  else if (command === 'avatar') {
    //sends back the avatar of the user (when no other user is pingged) to the channel the message was sent in
    if (!message.mentions.users.size) {
      return message.channel.send(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
    }
    const taggedUser = message.mentions.users.map(user => {
      return `${user.username}'s avatar is: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`
    });
    message.channel.send(taggedUser);
  }

  else if (command === 'purge'){
    const amount = parseInt(args[0]);

    if(isNaN(amount)){
      return message.channel.send('that doesn\'t seem to be a valid number.');
    }
    else if (amount < 2 || amount > 100) {
      return message.reply('You need to enter a number a from 2 and 100');
    }
    message.channel.bulkDelete(amount, true);
  }
});
client.login(token);
