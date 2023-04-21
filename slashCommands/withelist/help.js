const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "help",
  description: "🎡Komutları listeler",
  default_permission: true,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle(`${client.user.username} > Help Commands`)
    .addFields(
    {name: '> /users', value: 'Total member count', inline: true},
    {name: '> /greet', value: 'config greet', inline: true},
    {name: '> /joinall', value: 'Join all the members', inline: true},
    {name: '> /join [Montant]', value: 'Join the members with selected amount', inline: true},
    {name: '> /refresh', value: 'Refresh DB (owner)', inline: true},
    {name: '> /clean', value: 'Clean DB (owner)', inline: true},
    {name: '> /wl [add/remove/list]', value: 'Whitelist ', inline: true},
    {name: '> /leave', value: 'Leave from server', inline: true},
    {name: '> /links', value: 'Links Bot/Oauth', inline: true},
    {name: '> /giveaway', value: 'Verify Giveaway', inline: true},
    {name: '> /nsfw', value: 'Verify NSFW', inline: true},
    {name: '> /help', value: 'commands', inline: true},)
    .setFooter({ text: ' Coder By BruhlsShhhh#0001'})
    await interaction.reply({embeds: [embed]})
  }
}