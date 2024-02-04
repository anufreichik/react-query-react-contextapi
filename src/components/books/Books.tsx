import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Books.css";

import { addPost, fetchPosts, fetchTags } from "../../api/api";
function Books() {
  const queryClient = useQueryClient();
  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", { page: 1 }],
    queryFn: fetchPosts,
    gcTime: 1000,
  });

  const { data: tagsData, isLoading: isTagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    // 👇 Since this wont change we dont want to refetch it
    staleTime: Infinity,
  });

  const {
    mutate: addBookPost,
    isPending,
    isError: isPostError,
    error: addPostError,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      console.log("onMutate");
    },
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data, variables, context);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
    onSettled: () => {},
  });

  console.log(postData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title")?.toString();
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );

    if (!title || !tags) return;

    addBookPost({ id: postData?.items + 1, title, tags });

    e.target.reset(); // reset form
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {isPostError && <h5 onClick={() => reset()}>{addPostError.message}</h5>}
        <input
          type="text"
          placeholder="Enter your post.."
          className="postbox"
          name="title"
        />
        <div className="tags">
          {tagsData?.map((tag) => {
            return (
              <div key={tag}>
                <input name={tag} id={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button disabled={isPending} className="button">
          {isPending ? "Posting..." : "Post"}
        </button>
      </form>
      <div className="title">My Posts</div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {postData &&
        postData.map((post) => {
          return (
            <div key={post.id} className="post">
              <div> {post.title}</div>
              {post.tags.map((tag) => {
                return <span key={tag}>{tag}</span>;
              })}
            </div>
          );
        })}
    </div>
  );
}

export default Books;
