import mongoose from 'mongoose';

const categories = [
  {
    title: 'Install GIT',
    _id: mongoose.Types.ObjectId(),
    privacyStatus: false,
    commands: [
      {
        script: 'brew install git',
        description: 'Install git on macOS with Homebrew',
        keywords: ['install', 'macos', 'homebrew'],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'sudo apt-get install git',
        description: 'Install git on Debian-based linux',
        keywords: ['install', 'apt-get', 'debian', 'linux'],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'choco install git',
        description: 'Install git on Windows with Chocolatey',
        keywords: ['install', 'windows', 'choco'],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
    ],
  },
  {
    title: 'Configuration',
    _id: mongoose.Types.ObjectId(),
    privacyStatus: false,
    commands: [
      {
        script: 'git config --global user.name [name]',
        description: 'Sets the name you want attached to your commit transaction',
        keywords: ['configuration', 'name', 'email', 'user'],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'git config --global user.email [email address]',
        description: 'Sets the email you want attached to your commit transactions',
        keywords: ['configuration', 'name', 'email', 'user'],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'git config --global color.ui auto',
        description: 'Enables helpful colorization of command line output',
        keywords: ['configuration', 'color', 'ui', 'customization'],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
    ],
  },
  {
    title: 'Synchronization and remote repositories',
    _id: mongoose.Types.ObjectId(),
    privacyStatus: false,
    commands: [
      {
        script: 'git push [alias] [branch]',
        description: 'Pushes all local changesets to the remote repository',
        keywords: [],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'git pull',
        description: 'Downloads new remote history and incorporate changes',
        keywords: [],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'git remote -v',
        description: 'Shows the name of remote repositories',
        keywords: [],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'git fetch',
        description: 'Get the latest changes from the origin but not merge',
        keywords: [],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
      {
        script: 'git remote rm [remote repo name]',
        description: 'Removes the remote repository',
        keywords: [],
        _id: mongoose.Types.ObjectId(),
        privacyStatus: false,
      },
    ],
  },
];

export default categories;
