# EzAI Securitas

A modern React application built with Vite, TypeScript, React 19, and a comprehensive UI component system based on Shadcn UI.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- Yarn package manager

### Installation

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd ezai-securitas
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Set up environment variables

   ```bash
   cp .env.sample .env.local
   ```

   Then edit `.env.local` with your specific configuration.

4. Start the development server
   ```bash
   yarn dev
   ```

## 📚 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── ui/          # Shadcn UI components
│   └── ...          # Custom components
├── constants/       # Application constants
├── contexts/        # React context providers
├── enums/           # TypeScript enums
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization setup
│   └── locales/     # Translation files
├── lib/             # Utility libraries
├── pages/           # Page components
├── routes/          # Routing configuration
│   └── guard/       # Route protection components
├── stores/          # State management (Zustand)
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Routing**: React Router v7
- **State Management**:
  - Context API for app-wide state
  - Zustand for specific state requirements
  - React Query for server state management
- **UI Components**: Shadcn UI with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Internationalization**: i18next
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Date Handling**: date-fns, moment, moment-timezone
- **Utilities**: lodash, clsx, tailwind-merge

## 🌐 Authentication & Authorization

The application uses a token-based authentication system managed through the `AuthContext`. It supports:

- User login/logout
- Role-based access control
- Protected routes
- Session management

## 🔒 Route Protection

Routes are protected using guard components:

- `ProtectedRoute`: Requires authentication
- `RejectedRoute`: Redirects authenticated users
- `RoleProtectedRoute`: Restricts access based on user roles

## 🌍 Internationalization

The app supports multiple languages using i18next. Translation files are located in `src/i18n/locales/`.

## 🧩 Components

The UI is built using Shadcn UI components, which are based on Radix UI primitives. These components are highly customizable and follow best practices for accessibility.

### Core UI Components

The application includes a comprehensive set of UI components including:

- Accordion, Alert, Avatar
- Buttons, Badges, Breadcrumbs
- Cards, Carousels, Charts
- Dialogs, Dropdowns, Forms
- Tables, Tabs, Tooltips
- And many more...

## 🧪 Error Handling

Error handling is implemented using:

- React Error Boundaries
- Axios interceptors
- Form validation with Zod

## 📏 Code Quality

The project maintains high code quality through:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking
- Husky for pre-commit hooks

## 📦 Build & Deployment

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

## 📋 Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Fix linting issues
- `yarn prettier`: Check formatting
- `yarn prettier:fix`: Fix formatting issues
- `yarn preview`: Preview production build

## 🧠 Best Practices

1. **Component Organization**:

   - Keep components small and focused
   - Use composition over complex props

2. **State Management**:

   - Use React Query for server state
   - Use Context API for global app state
   - Use component state for UI state

3. **Performance**:

   - Memoize expensive computations
   - Use React.memo and useMemo appropriately
   - Implement virtualization for long lists

4. **Styling**:

   - Follow Tailwind CSS best practices
   - Use the `cn` utility for conditional classes

5. **Routing**:
   - Keep route definitions organized
   - Use lazy loading for better performance

## 🔄 Commit Rules

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and standardized commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Changes to build system or dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files

### Examples

```
feat(auth): add login functionality
```

```
fix(form): resolve validation issue in signup form

Closes #123
```

```
docs(readme): update installation instructions
```

```
refactor(api): simplify error handling
```

### Commit Message Guidelines

1. **Subject Line**:

   - Keep it under 50 characters
   - Use imperative mood ("add" not "added" or "adds")
   - Capitalize first letter
   - No period at the end

2. **Body**:

   - Wrap at 72 characters
   - Explain what and why, not how
   - Use blank line to separate from subject

3. **Footer**:
   - Reference issues with "Closes #123" or "Relates to #123"
   - Breaking changes should start with "BREAKING CHANGE:"

## 🤝 Contributing

1. Follow the established coding style
2. Write appropriate tests
3. Update documentation as needed
4. Use clear, descriptive commit messages

## 📄 License

[Your license information here]
