export async function get(url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  return data;
}

export async function post(url: string, bodyObj: any): Promise<any> {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  });
  const data = response.json();
  return data;
}

export async function toDelete(url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  const data = response.json();
  return data;
}

export async function update(url: string, body: any): Promise<any> {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify(body)
  });
  const data = response.json();
  return data;
}
