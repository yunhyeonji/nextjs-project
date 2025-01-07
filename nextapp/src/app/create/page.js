"use client";

import { useRouter } from "next/navigation";

function Create(props) {
  const router = useRouter();
  const postFormData = (title, description) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, description})
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`,options)
      .then(res => res.json())
      .then(result => {
        const lastId = result.id;
        router.push(`/read/${lastId}`);
        router.refresh();
      })
  }
  return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        postFormData(title,description);
      }}>
        <p>
        <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
        <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit" value={"create"} />
        </p>
      </form>

  );
}

export default Create;
