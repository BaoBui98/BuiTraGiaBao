"use client";
import { useCommentBlog, useEditComment } from "@/apis/blog";
import { ICommentTypes } from "@/types";
import { Avatar, TextField } from "@mui/material";
import React, { useState } from "react";

const Comment: React.FC<{ comment: ICommentTypes; blogId: number }> = ({
  comment,
  blogId,
}) => {
  // Custom hook call api
  const { commentBlog, isCommentingBlog } = useCommentBlog(blogId);

  const { editComment, isEditComment } = useEditComment(comment.id);

  // Show modal
  const [show, setShow] = useState({
    reply: false,
    edit: false,
  });

  // Set Content for reply and edit
  const [content, setContent] = useState({
    replyContent: "",
    editContent: "",
  });

  const handleReply = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (content.replyContent.trim() === "") return;
      commentBlog(
        {
          data: {
            content: content.replyContent,
            parent_comment_id: comment.id,
          },
        },
        {
          onSuccess: () => {
            setContent({
              ...content,
              replyContent: "",
            });
            setShow({ ...show, reply: false });
          },
        }
      );
    }
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (content.editContent.trim() === "") return;
      editComment(
        { data: { content: content.editContent } },
        {
          onSuccess: () => {
            setContent({
              ...content,
              editContent: "",
            });
            setShow({ ...show, edit: false });
          },
        }
      );
    }
  };

  const handleReplyClick = () => {
    setShow({
      reply: !show.reply,
      edit: false,
    });
  };

  const handleEditClick = (comment: ICommentTypes) => {
    setShow({
      reply: false,
      edit: !show.edit,
    });
    setContent({
      ...content,
      editContent: comment.content,
    });
  };

  return (
    <div
      className="comment"
      style={{
        marginLeft: comment.parent_comment_id ? "40px" : "0",
        paddingLeft: "10px",
        marginBottom: "20px",
      }}
    >
      <div className="flex items-start mb-4 gap-4">
        <Avatar>{comment.name.charAt(0).toUpperCase()}</Avatar>
        <div className="flex-grow">
          <div className="mb-2">
            <span className="font-bold">{comment.name}</span>
            <span className="text-gray-500 text-sm ml-2">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="mb-2">{comment.content}</p>
          <div className="flex gap-2">
            <div
              onClick={handleReplyClick}
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Reply
            </div>
            <div
              onClick={() => handleEditClick(comment)}
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Edit
            </div>
          </div>
          {show.reply && (
            <div className="mt-2">
              <TextField
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "12px",
                }}
                InputProps={{
                  sx: {
                    borderRadius: "12px",
                    height: "80px",
                    alignItems: "flex-start",
                  },
                }}
                disabled={isCommentingBlog}
                placeholder="Write your reply..."
                value={content.replyContent}
                // onChange={(e) => setReplyContent(e.target.value)}
                onChange={(e) =>
                  setContent({
                    ...content,
                    replyContent: e.target.value,
                  })
                }
                onKeyDown={(e) => handleReply(e)}
              />
            </div>
          )}

          {show.edit && (
            <div className="mt-2">
              <TextField
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "12px",
                }}
                InputProps={{
                  sx: {
                    borderRadius: "12px",
                    height: "80px",
                    alignItems: "flex-start",
                  },
                }}
                disabled={isEditComment}
                placeholder="Write your edit..."
                value={content.editContent}
                onChange={(e) =>
                  setContent({
                    ...content,
                    editContent: e.target.value,
                  })
                }
                onKeyDown={(e) => handleEdit(e)}
              />
            </div>
          )}
        </div>
      </div>
      {comment.child_comments.length > 0 && (
        <div className="pl-8 border-l border-gray-200">
          {comment.child_comments.map((childComment) => (
            <Comment
              blogId={blogId}
              key={childComment.id}
              comment={childComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function CommentComponent({
  comments,
  blogId,
}: {
  comments: ICommentTypes[];
  blogId: number;
}) {
  const [comment, setComment] = useState("");

  const { commentBlog, isCommentingBlog } = useCommentBlog(blogId);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (comment.trim() === "") return;
      commentBlog(
        { data: { content: comment, parent_comment_id: null } },
        {
          onSuccess: () => {
            setComment("");
          },
        }
      );
    }
  };

  return (
    <div className="bg-[#D9D9D9] p-6 flex flex-col gap-6">
      <h4 className="font-semibold text-lg">{`${comments.length} comments`}</h4>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} blogId={blogId} />
      ))}

      <TextField
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        value={comment}
        disabled={isCommentingBlog}
        placeholder="Write a comment..."
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => setComment(e.target.value)}
        InputProps={{
          sx: {
            height: "100px",
            alignItems: "flex-start",
            borderRadius: "20px",
          },
        }}
      />
    </div>
  );
}
