# AI Agent Rules for Client-Mobile Project

## Redux State Management

1. Follow the Redux Toolkit pattern with slices, thunks, and builders
2. Always implement all three thunk cases (pending, fulfilled, rejected)
3. Update pending state handlers with appropriate loading states
4. Structure thunk builders in separate files following `*ThunkBuilder.ts` naming convention
5. Use the established builder pattern for combining reducers

## TypeScript Standards

1. Define strict types for all API requests and responses
2. Maintain type consistency between API and state interfaces
3. Use existing type definitions from `src/types` and `src/models` directories
4. Ensure null-safety with optional chaining and nullish coalescing

## API Communication

1. Use the appropriate service for API calls (e.g., `authApiService` for auth endpoints)
2. Follow the managed axios instance pattern for HTTP requests
3. Properly handle API responses with the `ApiResponse<T>` generic type
4. Implement consistent error handling for API failures

## Authentication Flow

1. Follow the OTP verification pattern for user authentication
2. Maintain JWT token storage in user state and local storage
3. Use utility services for storing/retrieving auth tokens
4. Implement proper login/logout state transitions

## Project Structure

1. Place components in appropriate directories based on their purpose:
   - `components/ui/` for reusable UI components
   - `components/feature/` for feature-specific components
   - `components/modals/` for modal dialogs
2. Organize pages under the `src/pages` directory by feature area
3. Keep services organized in the `src/services` directory

## Error Handling

1. Use toast notifications for user feedback on errors
2. Implement comprehensive error handling in thunk rejected cases
3. Follow established error message format from constants
4. Log detailed errors for debugging while showing user-friendly messages

## Code Style

1. Follow naming conventions:
   - camelCase for variables, functions, and instance methods
   - PascalCase for types, interfaces, and components
   - kebab-case for file names
2. Maintain consistent file structure within modules
3. Use descriptive names that reflect purpose and context

## User Experience

1. Show appropriate loading states during API calls
2. Provide meaningful error messages for failed operations
3. Implement consistent form validation patterns
4. Follow established UI component patterns

## State Persistence

1. Use utility services for localStorage interactions
2. Maintain consistency between Redux state and persisted storage
3. Clear appropriate state on user logout

## Performance

1. Avoid unnecessary re-renders in React components
2. Implement proper memoization for selectors
3. Use appropriate data structures for efficient state updates

## Security

1. Never store sensitive data in client-side storage unencrypted
2. Implement proper token management for authentication
3. Validate all user inputs before submission
