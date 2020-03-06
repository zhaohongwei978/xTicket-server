#!/usr/local/bin/babel-node
import server from './app'
const PORT = 3000;
//const PORT = server.context.config.app.port
server.listen(PORT);
console.log(`listening on port ${PORT}`);
