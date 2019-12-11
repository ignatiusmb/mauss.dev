const db = require('faunadb');

const client = new db.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

module.exports = async (event, context) => {
  const data = JSON.parse(event.body);
  const id = event.id;
  console.log(`Function 'update' invoked. update id: ${id}`);
  return client
    .query(db.query.Update(db.query.Ref(`classes/todos/${id}`), { data }))
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
