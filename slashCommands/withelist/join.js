const discord = require('discord.js')
const users = require('../../models/users');
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "join",
  description: "🎗Girilen sayıda kullanıcıyı sunucuya çeker",
  default_permission: true,
  options: [{
    name: 'amount',
    type: 'INTEGER',
    description: "Kaç kişiyi sunucuya girdirmek istiyorsun ?",
    required: true,
  }, {
    name: 'time',
    description: "Kullanıcı başına bekleme süresi.",
    type: "INTEGER",
    required: false
  },
  ],
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const amount = interaction.options.getInteger('amount');
    const time = interaction.options.getInteger('time')
    const data = await users.find()

    let error = 0;
    let success = 0;
    let already_joined = 0;
    const array_of_members = data;

    await interaction.reply(`**Users...** \`0\`/\`${amount}\``)

    for (let i = 0; i < parseInt(amount); i++) {
      time ? await sleep(time) : ""
      const user = await client.users.fetch(array_of_members[i].userId).catch(() => { });
      if (interaction.guild.members.cache.get(array_of_members[i].userId)) {
        already_joined++
        console.log(`✔️ ${user.tag}`)
      } else {
        await interaction.guild.members.add(user, { accessToken: array_of_members[i].accessToken }).catch(() => {
          error++
          console.log(`❌ ${user.tag}`)
        })
        success++
        console.log(`✔️ ${user.tag}`)
      }
      var inter = setInterval(async () => {
        interaction.editReply(`**Users...** \`${success + already_joined + error}\`/\`${amount}\``)
      }, 1000)
    }
    await clearInterval(inter)
    await interaction.editReply({
      content: 'Done!', embeds: [{
        title: `${client.user.username} > Join ${amount} Members`,
        description: `**Member already on the server**: ${already_joined}\n**Succes**: ${success}\n**Error**: ${error}`,
      }]
    })
  }
}