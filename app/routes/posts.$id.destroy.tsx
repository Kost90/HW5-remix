import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI';

export const action = async ({
                               params: { id },
                               request: { signal },
                             }: Parameters<LoaderFunction>[number]) => {
  if (!id) throw new Error('No ID provided')

  await JsonPlaceholderAPI.deleteUser({ signal, userId: Number(id) })

  return redirect('/posts')
}