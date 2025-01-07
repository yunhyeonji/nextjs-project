"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Control() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  return (
    <ul>
      <li>
        <Link href="/create">CREATE</Link>
      </li>
      {id && (
        <>
          <li>
            <Link href={`/update/${id}`}>UPDATE</Link>
          </li>
          <li>
            <input type="button" value={"DELETE"} onClick={() => {
                const options = {method:'DELETE'};
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
                    .then(res => res.json())
                    .then(res => {
                        router.push('/');
                        router.refresh();
                    })
            }}/>
          </li>
        </>
      )}
    </ul>
  );
}
