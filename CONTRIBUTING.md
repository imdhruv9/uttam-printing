# Contributing to Printing Pro

Thank you for considering contributing to Printing Pro! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```powershell
   git clone https://github.com/your-username/printing-pro.git
   cd printing-pro
   ```
3. **Run the setup script**:
   ```powershell
   .\setup.ps1
   ```

## Development Workflow

### Backend Development

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Make your changes

3. Run tests:
   ```powershell
   .\mvnw.cmd test
   ```

4. Check code style:
   ```powershell
   .\mvnw.cmd checkstyle:check
   ```

### Frontend Development

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Make your changes

3. Run tests:
   ```powershell
   npm test
   ```

4. Check linting:
   ```powershell
   npm run lint
   ```

5. Format code:
   ```powershell
   npm run format
   ```

## Code Standards

### Backend (Java/Spring Boot)

- Follow Google Java Style Guide
- Use meaningful variable and method names
- Write JavaDoc comments for public methods
- Keep methods small and focused
- Use `@Component` for mappers (not static methods)
- Add validation annotations to DTOs
- Write unit tests for services
- Write integration tests for controllers

### Frontend (React/TypeScript)

- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use functional components
- Write descriptive prop types
- Use Zod for form validation
- Keep components small and reusable
- Write tests for critical components
- Use semantic HTML and ARIA attributes

### Git Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in present tense (e.g., "Add", "Fix", "Update")
- Keep the first line under 72 characters
- Reference issues when applicable

Examples:
```
Add product search functionality
Fix image upload validation bug
Update README with deployment instructions
```

## Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them with clear messages

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Description of what was changed and why
   - Screenshots (if UI changes)
   - Reference to related issues

5. **Wait for review** - maintainers will review your PR and may request changes

6. **Address feedback** if requested

7. **Merge** - once approved, your PR will be merged

## Reporting Issues

When reporting issues, please include:

- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, versions)

## Feature Requests

Feature requests are welcome! Please:

- Check if the feature already exists or is planned
- Describe the feature clearly
- Explain the use case and benefits
- Be open to discussion and feedback

## Code Review

All submissions require review. We use GitHub pull requests for this purpose. Be patient and respectful during the review process.

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful test coverage
- Test edge cases and error conditions

## Documentation

- Update README if adding new features
- Add inline comments for complex logic
- Update API documentation for endpoint changes
- Include JSDoc/JavaDoc for public APIs

## Questions?

If you have questions, please:

- Check the README first
- Search existing issues
- Create a new issue with the "question" label

Thank you for contributing to Printing Pro!

