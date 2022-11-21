const { courseIndexes_V1, courseSchema_V1, collectionName } = require("./schema/courses/v1_schema");

module.exports = {
  async up(db) {
    const [collectionExists] = await db.listCollections({ name: collectionName }).toArray();

    if (!collectionExists) {
      await Promise.all([
        db.createCollection(collectionName, courseSchema_V1),
        courseIndexes_V1.map((prop) => db.collection(collectionName).createIndex(...prop)),
      ]);
    } else {
      await db.command({
        collMod: collectionName,
        validator: courseSchema_V1.validator,
      });
    }
  },

  async down(db) {
    await db.command({
      collMod: collectionName,
      validator: courseSchema_V1.validator,
    });
  },
};
