"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update(props) {
    const router = useRouter();
    const patchFormData = (title, description) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description})
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,options)
        .then(res => res.json())
        .then(result => {
            const lastId = result.id;
            router.push(`/read/${lastId}`);
            router.refresh();
        })
    }
    const id = useParams().id;
    const [data, setData] = useState({});
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`)
            .then(res => res.json())
            .then(result => setData(result))
    },[])

    const handleChange = (title, e) => {
        setData({...data, [title]:e.target.value})
    }

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        patchFormData(title,description);
    }}>
    <p>
        <input type="text" name="title" placeholder="title" 
        value={data?.title} onChange={(e) => handleChange('title', e)}
        />
    </p>
    <p>
        <textarea name="description" placeholder="description" 
        value={data?.description} onChange={(e) => handleChange('description', e)}
        />
    </p>
    <p>
        <input type="submit" value={"update"} />
    </p>
    </form>

  );
}

