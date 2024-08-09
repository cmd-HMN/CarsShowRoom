import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation } from "react-query";
import * as apiClient from '../api-client'
import { useForm } from "react-hook-form";
interface blog {
  title: string;
  description: string;
  coverImage: string;
}

const AdminBlog = () => {
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("")

  
  const {register, formState:{errors}, handleSubmit, setValue} = useForm<blog>()
  
  useEffect(() => {
    setValue("coverImage", coverImage, {shouldValidate: true})
  }, [coverImage, setValue])

  const handleEditorChange = (content: string) => {
    setContent(content);
    setValue("description", content, {shouldValidate: true})
  };
  const {mutate: blogUpload} = useMutation('blogUpload', (blog: blog) => apiClient.BlogUpl(blog), {
    onSuccess: () => {
      alert('Blog uploaded successfully')
    }
  })

  const handleCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blog/cloudinary-upload`, {
        method: "POST",
        body: formData
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const result = await response.json();
      if (result.url) {
        setCoverImage(result.url);
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };
  
  const api = import.meta.env.VITE_TINY as string;

  const onSubmit = (blog: blog) => {
    blogUpload(blog)
    console.log(blog)
  };

  return (
    <div className="flex flex-col min-h-screen p-7">
      <div className="flex flex-row justify-center items-center font-bold text-xl sm:text-3xl text-Dark">
        Write a <span className="text-orange-500 ml-1"> Blog</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex flex-row justify-start font-bold text-xs sm:text-sm text-Dark">
          Some instruction to write a blog.
          <br />
          1. Write a proper Blog
          <br />
          2.To upload the image use Cloudinary
          <br />
          3. Upload image in the cloud get the url and paste it write here.
          <br />
          4.Don't use image at the starting
        </div>
      </div>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 my-3 border-2 border-gray-200 rounded-md"
          {...register('title', {required: true})}
        />
        {
          errors.title && <span className="text-red-500">Title is required</span>
        }
        <input
          type="file"
          className="w-full p-3 my-3 border-2 border-gray-200 rounded-md"
          onChange={handleCoverImage}
        />
        <Editor
          apiKey={api}
          initialValue="<p>Start writing your blog...</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "headings",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "image",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "link media advlist"+
              "removeformat | help image",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          value={content}
          onEditorChange={handleEditorChange}
        />

        <button
          type="submit"
          className="mt-4 bg-orange-500 hover:bg-orange-600 rounded-md p-2 text-white px-4"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AdminBlog;
