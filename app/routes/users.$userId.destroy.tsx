import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI';

export const action = async ({
                               params: { userId },
                               request: { signal },
                             }: Parameters<LoaderFunction>[number]) => {
  if (!userId) throw new Error('No user ID provided')

  await JsonPlaceholderAPI.deleteUser({ signal, userId: Number(userId) })

  return redirect('/users')
}
