const http = require('http')

const posts = [
  { id: 1, title: 'post 1' },
  { id: 2, title: 'post 2' },
]

const server = http.createServer((request, response) => {
  if (request.url === '/api/posts' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(posts))
  } else if (
    request.url.match(/\/api\/posts\/([0-9]+)/) &&
    request.method === 'GET'
  ) {
    // split the url to get the id
    const id = request.url.split('/')[3]
    // use the id to get the post from the posts array
    const post = posts.find((post) => post.id == id)
    //send the response
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(post))
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ message: 'bad request' }))
  }

  // send back html
  /* response.statusCode = 200
  response.setHeader('Content-Type', 'text/html')
  response.write('<h1>hello world</h1>')
  response.end() */
})

server.listen(5001, console.log('server running'))
