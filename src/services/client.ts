import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_BACKEND_URL)

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

const clientMemoTest = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache(),
});

export { clientMemoTest };
