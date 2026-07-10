<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:local-tooling-rules -->
# Local tooling

Do not use `rg` in this workspace; it is not available. Use PowerShell-native alternatives instead:
- Use `Get-ChildItem -Recurse -File` for file discovery.
- Use `Select-String` for text search.
- Use `git ls-files | Select-String ...` when searching tracked source files only.
<!-- END:local-tooling-rules -->

<!-- BEGIN:windows-typescript-rules -->
# Windows TypeScript commands

When running TypeScript or package binaries in this workspace, do not use `npx` from PowerShell because `npx.ps1` may be blocked by execution policy.

Use the local Windows command shim directly instead, for example:

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```
<!-- END:windows-typescript-rules -->