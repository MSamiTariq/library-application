// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import type { Book } from "@prisma/client";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";

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

const DeleteBookMutation = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export default function Home() {
  const { data, loading, error, refetch } = useQuery(AllBookssQuery);
  const [deleteBook] = useMutation(DeleteBookMutation);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !error) {
      refetch();
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const handleDeleteClick = async (e: any, id: any) => {
    e.preventDefault();
    try {
      setIsDeleting(true);
      await deleteBook({
        variables: { id },
        refetchQueries: [{ query: AllBookssQuery }],
      });
    } catch (error) {
      console.error("Error deleting link:");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Library Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.books.map((book: Book) => (
            <Link href={`/edit/${book.id}`}>
              <li key={book.id} className="shadow  max-w-md  rounded">
                <div className="p-5 flex flex-col space-y-2">
                  <p className="text-lg font-medium">{book.title}</p>
                  <p className="text-gray-600">{book.description}</p>
                  <p className="text-gray-600">Student ID: {book.studentId}</p>
                  <p className="text-gray-600">Author ID: {book.authorId}</p>
                  <MdDelete onClick={(e) => handleDeleteClick(e, book.id)} />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
