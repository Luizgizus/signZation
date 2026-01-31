const parseBody = async <T>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return text as unknown as T;
};

const parseError = async (response: Response): Promise<string> => {
  try {
    const data = await response.clone().json();
    return JSON.stringify(data);
  } catch {
    const text = await response.text();
    return text || response.statusText;
  }
};

export const requestJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const body = await parseBody<T>(response);
  return body as T;
};

export const requestVoid = async (input: RequestInfo, init?: RequestInit): Promise<void> => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};
