import { getDeclarationsList, DeclarationPath } from './get-declarations-list'
import { prepareDeclaration } from './prepare-declaration'
import { docgenParser } from './docgen-parser'

export function generateDeclarations(paths: DeclarationPath[]) {
  const declarations = getDeclarationsList(paths)

  return docgenParser.parse(declarations).reduce((acc, declaration) => {
    const componentName = declaration.displayName.replace(
      /@antares\/([^\s]+)\//,
      ''
    )
    ;(acc as any)[componentName] = prepareDeclaration(declaration)
    return acc
  }, {})
}
