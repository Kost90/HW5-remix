import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI';

export const loader = async ({
                               params: { userId },
                               request: { signal },
                             }: Parameters<LoaderFunction>[number]) => {
  if (!userId) throw new Error('No user ID provided')

  return await JsonPlaceholderAPI.getUser({ signal, userId: Number(userId) })
}

export const action = async ({ request, params }: Parameters<LoaderFunction>[number]) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  if (!params.userId) throw new Error('No user ID provided')

  await JsonPlaceholderAPI.updateUser({ signal: request.signal, userId: Number(params.userId), updates })

  return redirect(`/users/${params.userId}`)
}

export default function UserEditPage() {
  const user = useLoaderData<typeof loader>()

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <Card>
        <CardContent>
          <Form method="patch">
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput id="name" name="name" label="Name" fullWidth defaultValue={user.name} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput id="email" name="email" label="E-mail" fullWidth defaultValue={user.email} required />
              </FormControl>
            </Box>
            <Button variant={'contained'} type="submit" color={'primary'}>
              Save
            </Button>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
