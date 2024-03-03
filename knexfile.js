// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "better-sqlite3",
  connection: {
    filename: "./date/dev.sqlite3",
  },
};
