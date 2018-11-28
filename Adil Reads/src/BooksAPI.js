let api = "https://reactnd-books-api.udacity.com"


// Generate a unique choose for storing your bookshelf data on the backend server.
var choose = localStorage.choose
if (!choose)
choose = localStorage.choose = Math.random().toString(36).substr(-8)

let headers = {
  'Accept': 'application/json',
  'Authorization': choose
}
//here we have to do Create the bookId
export let get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export let getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export let update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export let search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)