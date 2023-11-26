import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import { type SubmitHandler, useForm } from "react-hook-form";

const BookQuery = gql`
  query book($id: ID!) {
    book(id: $id) {
      title
      description
      authorId
      studentId
    }
  }
`;

const UpdateBookMutation = gql`
  mutation updateBook(
    $id: ID!
    $title: String!
    $description: String!
    $authorId: Int!
    $studentId: Int
  ) {
    updateBook(
      id: $id
      title: $title
      description: $description
      authorId: $authorId
      studentId: $studentId
    ) {
      id
      title
      studentId
      description
      authorId
    }
  }
`;

type FormValues = {
  title: string;
  authorId: number;
  studentId: number;
  description: string;
};

const EditBookPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [updateBook, { loading, error }] = useMutation(UpdateBookMutation, {
    onCompleted: () => {
      reset();
      // Redirect to the home page after the book is created
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let { title, description, authorId, studentId } = data;
    authorId = parseInt(authorId.toString(), 10);
    studentId = parseInt(studentId.toString(), 10);

    const variables = { id, title, description, authorId, studentId };
    console.log(variables);
    try {
      toast.promise(updateBook({ variables }), {
        loading: "Updating the book..",
        success: "Book successfully updated!🎉",
        error: `Something went wrong 😥 Please try again -  ${error}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the book details based on the ID
  const {
    data,
    loading: loadingBook,
    error: bookError,
  } = useQuery(BookQuery, {
    variables: { id },
  });

  if (loadingBook) return <p>Loading...</p>;
  if (bookError) return <p>Error: {bookError.message}</p>;

  const book = data.book;

  return (
    <div className="container mx-auto max-w-md py-12">
      <Toaster />
      <h1 className="text-3xl font-medium my-5">Update the book</h1>
      <form
        className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="text-gray-700">Title</span>
          <input
            placeholder="Title"
            {...register("title", { required: true })}
            name="title"
            type="text"
            defaultValue={book.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <input
            placeholder="Description"
            {...register("description", { required: true })}
            name="description"
            type="text"
            defaultValue={book.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Author ID</span>
          <input
            placeholder="Author ID"
            {...register("authorId", { required: true })}
            name="authorId"
            type="text"
            defaultValue={book.authorId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Student ID</span>
          <input
            placeholder="Student ID"
            {...register("studentId", { required: true })}
            name="studentId"
            defaultValue={book.studentId}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Creating...
            </span>
          ) : (
            <span>Update Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
