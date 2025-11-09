import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.useFakeTimers();

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts/1');

    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockReturnThis();
    const spyGet = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { id: 1 } });

    jest.advanceTimersByTime(5000);

    await throttledGetDataFromApi('/posts/1');

    expect(spyGet).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnThis();
    jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: { id: 1, post: 'My post' } });

    jest.advanceTimersByTime(5000);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual({ id: 1, post: 'My post' });
  });
});
