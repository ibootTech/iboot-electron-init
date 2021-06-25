class Platform {
  constructor(val) {
    switch (val) {
      case 'win':
        this.arch = 'x64'
        this.platform = 'win32'
        break
      case 'darwin':
        this.arch = 'x64'
        this.platform = 'darwin'
        break
      default:
        if (val.indexOf('linux') !== -1) {
          this.arch = val.split(':')[1]
          this.platform = 'linux'
        }
        break
    }
  }
}
module.exports = Platform
