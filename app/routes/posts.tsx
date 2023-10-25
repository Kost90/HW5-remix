import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import JsonPlaceholderAPI from "~/api/JsonPlaceholderAPI/JsonPlaceholderAPI";

export const loader = async ({request: signal} : Parameters<LoaderFunction>[number]) =>{
  return await JsonPlaceholderAPI.getPosts(signal)
}

export default function PostsPage () {
  const posts = useLoaderData <typeof loader>();
  return (
    <>
    <Typography variant="h4" gutterBottom>
      Posts
    </Typography>
    <List>
      {posts.map((post) => (
        <ListItem key={post.id} component={Link} to={`/posts/${post.id}`}>
          <ListItemText primary={post.title} secondary={post.body} />
        </ListItem>
      ))}
    </List>
</>
  )
 
};
