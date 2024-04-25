/* const { Events } = require("discord.js");
const fetch = require("node-fetch");
const { apiUri } = require("../config.json");

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
        try {
          const timbraturaResponse = await fetch(apiUri + "/timbratrice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: interaction.customId,
              userId: interaction.user.id,
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
          console.log(error);
        }
      } else {
        return;
      }
    }
  },
};
 */

const { Events } = require("discord.js");
const fetch = require("node-fetch");
const { apiEndpoints } = require("../config.json");

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
        const userPermissions = interaction.member.roles.cache.map(
          (role) => role.id
        );
        let endpoint;

        for (const permission of userPermissions) {
          if (apiEndpoints[permission]) {
            endpoint = apiEndpoints[permission];
            break;
          }
        }

        if (!endpoint) {
          console.error(
            `No endpoint found for permissions: ${userPermissions}`
          );
          return;
        }

        try {
          const timbraturaResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: interaction.customId,
              userId: interaction.user.id,
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
      } else {
        return;
      }
    }
  },
};
