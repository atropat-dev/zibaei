<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions for Modern Persian Website

## Project Overview
This is a modern React-based Persian website project with the following key characteristics:

### Technology Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Vazirmatn Font** for Persian text display
- **RTL Support** for right-to-left layout

### Language and Localization
- Primary language: **Persian (Farsi)**
- Layout direction: **Right-to-Left (RTL)**
- Font: **Vazirmatn** for optimal Persian text rendering
- Code comments and variable names should be in English for maintainability
- UI text and content should be in Persian

### Coding Guidelines
1. **Component Structure**: Use functional components with hooks
2. **Styling**: Prefer Tailwind CSS classes over custom CSS
3. **Typography**: Always use `font-vazirmatn` class for Persian text
4. **Layout**: Apply `dir="rtl"` to containers with Persian content
5. **Responsive Design**: Ensure mobile-first responsive design
6. **Accessibility**: Include proper ARIA labels and semantic HTML

### RTL Considerations
- Use Tailwind's directional utilities (e.g., `mr-4` instead of `ml-4` for RTL)
- Test layouts in both LTR and RTL contexts
- Consider text alignment for Persian content (`text-right` by default)

### File Organization
- Components in `src/components/`
- Pages in `src/pages/` (when router is added)
- Utilities in `src/utils/`
- Types in `src/types/`

### Performance
- Optimize for fast loading
- Use lazy loading for components when appropriate
- Minimize bundle size

When generating code for this project, prioritize Persian user experience, RTL layout compatibility, and modern React best practices.
