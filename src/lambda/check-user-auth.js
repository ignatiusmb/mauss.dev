exports.handler = async (event, context) => {
  const claims = context.clientContext && context.clientContext.user;
  console.log(`User claims: ${claims}`);
  if (!claims) {
    console.log('No claims!');
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'NOT ALLOWED!'
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'My message'
    })
  };
};
