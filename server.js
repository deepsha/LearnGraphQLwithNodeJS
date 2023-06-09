const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express()
const authors = [
	{ id: 1, author_name: 'J. K. Rowling' },
	{ id: 2, author_name: 'J. R. R. Tolkien' },
	{ id: 3, author_name: 'Brent Weeks' },
    { id: 4, author_name: 'Cecila Ahern' }

]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 4 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 4 }
]
const AuthorType = new GraphQLObjectType({
    name:'Author',
    description: 'this is a author',
    fields: () => ({
        id:{type :GraphQLNonNull(GraphQLInt)},
        author_name: {type:GraphQLNonNull(GraphQLString)}
    })
})
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'lis of books written by author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId:{type: GraphQLNonNull(GraphQLInt)},
        author:{
            type: AuthorType,
            resolve: (book) =>{
                return authors.find(author => author.id === book.authorId)
            }
        }     
    })
 })


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book:{
            type:BookType,
            description: 'single book',
            args: {
                id: { type: GraphQLInt }
              },
              resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books:{
            type:new GraphQLList(BookType),
            description: 'List of books',
            resolve: () => books
        },
        author:{
            type:AuthorType,
            description: 'single author',
            args: {
                id: { type: GraphQLInt }
              },
              resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors:{
            type:new GraphQLList(AuthorType),
            description: 'List of authors',
            resolve: () => authors
        }
    })

    })


const RootMutationType =new GraphQLObjectType({

    name: 'Mutation',
    description: 'Root Mutation',
    fields: () =>({
        addBook:{
            type:BookType,
            description:'add new book details',
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                authorId:{type: GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args) =>{
                const book= { id: books.length+1 ,name:args.name,authorId:args.authorId }
                books.push(book)
                return book
            }
        },
        addAuthor:{
            type:AuthorType,
            description:'add new author details',
            args:{
                name:{type: GraphQLNonNull(GraphQLString)}               
            },
            resolve:(parent,args) =>{
                const author= { id: authors.length+1 ,author_name:args.name }
                authors.push(author)
                return author
            }
        }
    })
})
const schema = new GraphQLSchema({
    query: RootQueryType ,// use to behave like GET
    mutation: RootMutationType //use to behave like POST,DELETE
})
 app.use('/getBookDetails', expressGraphQL({
    schema: schema,
    graphiql: true
  }))
app.listen(5001.,() => console.log("Server running at port 5001") )