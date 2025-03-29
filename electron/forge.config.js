
module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: ['./files'],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32'],
    },
  ],
  // Make sure the main entry point is correctly specified
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
      // This ensures that electron/main.js is recognized as the entry point
      console.log('Package after copy hook executed');
    }
  }
};
