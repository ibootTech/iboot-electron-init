const requireAll = requireContext => requireContext.keys().map(requireContext)
const svgFiles = require.context('@/components', true, /\.svg$/)
svgFiles.keys().filter(key => {
  return key.includes('/svg')
})
requireAll(svgFiles)
