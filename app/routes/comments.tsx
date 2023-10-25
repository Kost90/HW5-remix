import { List, ListItem, ListItemText, Typography } from "@mui/material";
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import JsonPlaceholderAPI from "~/api/JsonPlaceholderAPI/JsonPlaceholderAPI";

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
    return await JsonPlaceholderAPI.getComments({ signal })
  }

export default function CommentsPage  () {

  const comments = useLoaderData<typeof loader>()
  console.log(comments)

    return (
      <>
      <Typography variant="h4" gutterBottom>
        Comments
      </Typography>
      <List>
      {comments.map(coment => (
        <ListItem key={coment.id} alignItems="flex-start">
          <ListItemText primary={coment.name} secondary={
                <>
                  <Typography variant="subtitle1">{coment.email}</Typography>
                  {coment.body}
                </>
              }/>
        </ListItem>
      ))}
      </List>
      </>
    )
  }
  