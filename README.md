# LearnGraphQL
 learning GraphQL using NodeJS
From terminal of Visual Studio, run this to start server at port 5001
$npm run devStart

API end point:http://localhost:5001/getBookDetails?
Input1:-> to get list of books
{
  books {
    id,
    name,
    author {
      id,
     author_name 
    }
  }
}

Input2:->to get list of authors
{
 authors{
  id,
  author_name
	}
}

Input3:to get single book by book_id
{
  book(id:4) {   
    name
    author {
      author_name 
    }
  }
}
Input4:to get single author by author_id
{
 author(id:3){
  id,
  author_name
	}
}

Input 5:to add new book named "Alice in wonderland" for author name 'J. R. R. Tolkien'
mutation{
 addBook(name:"Alice in wonderland",authorId:2) {
   id
 },
 
}

Input6:to add new author named "Paulo Coelho" 
mutation{
 addAuthor(name:"Paulo Coelho") {
   id
 },
 
}