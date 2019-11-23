const db = require('faunadb');

const client = new db.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

module.exports = async (event, context) => {
  console.log('Function `read-all` invoked');
  return client
    .query(db.query.Paginate(db.query.Match(db.query.Ref('indexes/all_todos'))))
    .then(response => {
      const itemRefs = response.data;
      // create new query out of item refs. http://bit.ly/2LG3MLg
      const getAllItemsDataQuery = itemRefs.map(ref => {
        return db.query.Get(ref);
      });
      // then query the refs
      return client.query(getAllItemsDataQuery).then(ret => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        };
      });
    })
    .catch(error => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
