module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION enforce_item_fk()
    RETURNS TRIGGER AS $$
    BEGIN
    IF NEW.item_type = 1 THEN
        IF NOT EXISTS (SELECT 1 FROM tracks WHERE track_id = NEW.item_id) THEN
            RAISE EXCEPTION 'Invalid item_id: % for type track', NEW.item_id;
        END IF;
    ELSIF NEW.item_type = 2 THEN
        IF NOT EXISTS (SELECT 1 FROM albums WHERE album_id = NEW.item_id) THEN
            RAISE EXCEPTION 'Invalid item_id: % for type album', NEW.item_id;
        END IF;
    ELSIF NEW.item_type = 3 THEN
        IF NOT EXISTS (SELECT 1 FROM artists WHERE artist_id = NEW.item_id) THEN
            RAISE EXCEPTION 'Invalid item_id: % for type artist', NEW.item_id;
        END IF;
    ELSE
        RAISE EXCEPTION 'Invalid item_type: %', NEW.item_type;
    END IF;

    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER enforce_item_fk_trigger
    BEFORE INSERT OR UPDATE ON "favorites"
    FOR EACH ROW
    EXECUTE FUNCTION enforce_item_fk();
    `);
  },

  down: async (queryInterface) => {}
};
