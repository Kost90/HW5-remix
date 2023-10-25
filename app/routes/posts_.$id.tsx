
import { Form, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

import { Button, List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaceholderAPI, { Posts } from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI';

const FIELDS = [
    { name: 'Titel', key: 'title' },
    { name: 'Body', key: 'body' },
  ]satisfies { name: string; key: keyof Pick<Posts, 'userId' | 'id' | 'title' | 'body'> }[]

  export const loader = async ({request: {signal}, params: {id}} : Parameters<LoaderFunction>[number]) =>{
    if(!id) throw new Error('No ID provided')
    return await JsonPlaceholderAPI.getPost({signal, id: Number(id)})
  }

export default function PostDetails() {
    const post = useLoaderData <typeof loader>();
  return (
    <>
    <Typography variant='h4' gutterBottom>
        Post Details
    </Typography>
    {post && (
        <List>
            {FIELDS.map(field => (
                <ListItem key={field.key}>
                    <ListItemText primary={field.name} secondary={post[field.key]}/>
                </ListItem>
            ))}
        </List>
    )}
    <Form 
    method='DELETE'
    action='destroy'
    onSubmit={(event) => {
        if (!confirm('Please confirm that you want to delete this post.')) {
          event.preventDefault()
        }
      }}>
        <Button variant="contained" color="error" type="submit">Delete post</Button>
    </Form>
    </>
  )
}
