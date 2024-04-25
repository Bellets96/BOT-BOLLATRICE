const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const timbratriceEmbed = new EmbedBuilder()
  .setColor("#AB201D")
  .setTitle("Timbratrice Authentic Remastered")
  .setAuthor({
    name: "Timbratrice Authentic Remastered",
    iconURL:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSj5iXnRwfIcZtbFWvaYwtJd43NNzPN_jQbbdsPub6EYG4nQDUf",
  })
  .setDescription("Ricordati di timbrare entrate ed uscite!");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timbratrice")
    .setDescription("Crea il modulo della timbratrice."),
  async execute(interaction) {
    const entrata = new ButtonBuilder()
      .setCustomId("entrata")
      .setLabel("Timbra Ingresso")
      .setStyle(ButtonStyle.Success);

    const uscita = new ButtonBuilder()
      .setCustomId("uscita")
      .setLabel("Timbra Uscita")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(entrata, uscita);

    await interaction.reply({
      embeds: [timbratriceEmbed],
      components: [row],
    });
  },
};
