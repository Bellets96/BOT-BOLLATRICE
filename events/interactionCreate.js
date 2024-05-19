const { Events } = require("discord.js");
const fetch = require("node-fetch");
const { apiUri, allowedRoles } = require("../config.json");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.isButton()) {
      if (
        interaction.customId === "entrata" ||
        interaction.customId === "uscita"
      ) {
        const userRoles = interaction.member.roles.cache.map((role) => role.id);

        const userAllowedRoles = userRoles.filter((roleId) =>
          allowedRoles.includes(roleId)
        );

        if (userAllowedRoles.length === 0) {
          console.error(`User does not have a role included in allowedRoles.`);
          return;
        }

        const userRole = interaction.member.roles.cache.find(
          (role) => role.id === userAllowedRoles[0]
        );

        try {
          const timbraturaResponse = await fetch(apiUri + "/timbratrice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: interaction.customId,
              userId: interaction.user.id,
              role: userRole.id,
            }),
          });

          const res = await timbraturaResponse.json();
          if (timbraturaResponse.ok) {
            await interaction.reply({
              content: res,
              ephemeral: true,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
};
