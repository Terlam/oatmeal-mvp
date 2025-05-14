    // src/mocks/handlers.ts
    import { http, HttpResponse } from 'msw';
    
    interface User {
      id: number;
      name: string;
    }

    const userHandler = http.get('/api/user', () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
      };
      return HttpResponse.json(mockUser);
    });
    
    export const handlers = [userHandler];