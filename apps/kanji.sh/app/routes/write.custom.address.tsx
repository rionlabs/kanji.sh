import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { PDFView } from '@kanji-sh/app/components';


export const loader: LoaderFunction = async () => {
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method != 'POST') {
    throw json({ message: 'Method not allowed' }, { status: 405 });
  }

  const formData = await request.formData();
  const address = formData.get('address') as string;


  return json({ address });
};

const WriteAddressRoute = () => {
  const data = useLoaderData();
  return <div>
    <h1>Write Address</h1>
    <Form method='post'>
      <label>
        Address:
        <input type='text' name='address' />
      </label>
      <button type='submit'>Submit</button>
    </Form>

    <div className="select-none">
    <PDFView fileUrl={'/api/generate'} pageCount={1} />
    </div>

  </div>;
};

export default WriteAddressRoute;
