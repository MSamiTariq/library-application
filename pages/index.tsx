// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import type { Book } from "@prisma/client";

const AllBookssQuery = gql`
  query {
    books {
      id
      title
      description
      studentId
      authorId
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(AllBookssQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.books.map((book: Book) => (
            <li key={book.id} className="shadow  max-w-md  rounded">
              {/* <img className="shadow-sm" src={link.imageUrl} /> */}
              <div className="p-5 flex flex-col space-y-2">
                {/* <p className="text-sm text-blue-500">{book.title}</p> */}
                <p className="text-lg font-medium">{book.title}</p>
                <p className="text-gray-600">{book.description}</p>
                <p className="text-gray-600">Student ID: {book.studentId}</p>
                <p className="text-gray-600">Author ID: {book.authorId}</p>
                {/* <a href={link.url} className="flex hover:text-blue-500">
                  {link.url.replace(/(^\w+:|^)\/\//, "")}
                  <svg
                    className="w-4 h-4 my-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
