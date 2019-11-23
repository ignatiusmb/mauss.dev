const db = require('faunadb');

const client = new db.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

module.exports = async (event, context) => {
  const id = event.id;
  console.log(`Function 'delete' invoked. delete id: ${id}`);
  return client
    .query(db.query.Delete(db.query.Ref(`classes/todos/${id}`)))
    .then(response => {
      console.log('success', response);
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      console.log('error', error);
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
