const categories = [
  {
    title: 'Install GIT',
    description: '',
    commands: [
      { script: 'brew install git', description: 'Install git on macOS with Homebrew', keywords: ['install', 'macos', 'homebrew'] },
      { script: 'sudo apt-get install git', description: 'Install git on Debian-based linux', keywords: ['install', 'apt-get', 'debian', 'linux'] },
      { script: 'choco install git', description: 'Install git on Windows with Chocolatey', keywords: ['install', 'windows', 'choco'] },
    ],
  },
  {
    title: 'Configuration',
    description: '',
    commands: [
      { script: 'git config --global user.name [name]', description: 'Sets the name you want attached to your commit transaction', keywords: ['configuration', 'name', 'email', 'user'] },
      { script: 'git config --global user.email [email address]', description: 'Sets the email you want attached to your commit transactions', keywords: ['configuration', 'name', 'email', 'user'] },
      { script: 'git config --global color.ui auto', description: 'Enables helpful colorization of command line output', keywords: ['configuration', 'color', 'ui', 'customization'] },
    ],
  },
  {
    title: 'Create Repositories',
    description: '',
    commands: [
      { script: 'git init [project-name]', description: 'Creates a new local repository with the specified name', keywords: ['new', 'project', 'create'] },
      { script: 'git clone [url]', description: 'Downloads a project and its entire version history', keywords: ['download', 'remote', 'clone', 'checkout'] },
    ],
  },
  {
    title: 'Make Changes',
    description: '',
    commands: [
      { script: 'git status', description: 'Lists all new or modified files to be commited', keywords: ['change', 'modifications', 'commit'] },
      { script: 'git diff', description: 'Shows file differences not yet staged', keywords: ['modifications', 'changes', 'diff'] },
      { script: 'git add [file]', description: 'Add the specified file to the staging area', keywords: [] },
      { script: 'git diff --staged', description: 'Shows file differences between staging and the last file version', keywords: ['modifications'] },
      { script: 'git reset [file]', description: 'Unstages the file, but preserve its contents', keywords: [] },
      { script: 'git commit -m [descriptive message]', description: 'Records staged snapshots in version history', keywords: [] },
    ],
  },
  {
    title: 'Branches',
    description: '',
    commands: [
      { script: 'git branch', description: 'Lists all local branches in the current repository', keywords: [] },
      { script: 'git branch [branch-name]', description: 'Creates a branch', keywords: [] },
      { script: 'git merge [branch-name]', description: 'Merges the specified branch’s history into the current branch', keywords: [] },
      { script: 'git checkout [branch-name]', description: 'Switches to the specified branch', keywords: [] },
      { script: 'git checkout -b [branch-name]', description: 'Creates a branch and switch to it', keywords: [] },
      { script: 'git checkout -m [new-branch-name]', description: 'Rename branch', keywords: [] },
      { script: 'git branch -d [branch-name]', description: 'Deletes the specified branch, locally', keywords: [] },
    ],
  },
  {
    title: 'Moving and removing files',
    description: '',
    commands: [
      { script: 'git rm [file]', description: 'Deletes the file from the working directory and stages the deletion', keywords: [] },
      { script: 'git rm --cached [file]', description: 'Removes the file from version control but preserves the file locally', keywords: [] },
      { script: 'git mv [from] [to]', description: 'Renames the file', keywords: [] },
    ],
  },
  {
    title: 'Stashing',
    description: '',
    commands: [
      { script: 'git stash', description: 'Temporarily stores all modified tracked files', keywords: [] },
      { script: 'git stash pop', description: 'Restores the most last stashed files and deletes the stashed changeset', keywords: [] },
      { script: 'git stash list', description: 'Lists all stashed changesets', keywords: [] },
      { script: 'git stash drop', description: 'Deletes the last stashed changeset', keywords: [] },
    ],
  },
  {
    title: 'History and diff',
    description: '',
    commands: [
      { script: 'git log', description: 'Lists version history for the current branch', keywords: [] },
      { script: 'git log --follow [file]', description: 'Lists version history for a file, including renames', keywords: [] },
      { script: 'git diff [first-branch]...[second-branch]', description: 'Shows content differences between two branches', keywords: [] },
      { script: 'git show [commit]', description: 'Shows changes of the specified commit', keywords: [] },
    ],
  },
  {
    title: 'Cancel and redo stuffs',
    description: '',
    commands: [
      { script: 'git reset [commit]', description: 'Undoes all commits afer [commit], preserving changes locally', keywords: [] },
      { script: 'git reset --hard [commit]', description: 'Discards all history and changes back to the specified commit', keywords: [] },
      { script: 'git reset –hard HEAD', description: 'Discards all local changes in the working directory', keywords: [] },
      { script: 'git commit --amend', description: 'Change the commit message', keywords: ['undo', 'message', 'commit'] },
    ],
  },
  {
    title: 'Synchronization and remote repositories',
    description: '',
    commands: [
      { script: 'git push [alias] [branch]', description: 'Pushes all local changesets to the remote repository', keywords: [] },
      { script: 'git pull', description: 'Downloads new remote history and incorporate changes', keywords: [] },
      { script: 'git remote -v', description: 'Shows the name of remote repositories', keywords: [] },
      { script: 'git fetch', description: 'Get the latest changes from the origin but not merge', keywords: [] },
      { script: 'git remote rm [remote repo name]', description: 'Removes the remote repository', keywords: [] },
    ],
  },
  {
    title: 'Tagging',
    description: '',
    commands: [
      { script: 'git tag', description: 'Lists tags', keywords: ['tag', 'version', 'release'] },
      { script: 'git tag -l "[pattern]"', description: 'Lists tags with specified pattern', keywords: ['tag', 'version', 'release', 'pattern'] },
      { script: 'git tag -a [version] -m [message]', description: 'Create annotated tag', keywords: ['tag', 'version', 'release', 'annotate'] },
      { script: 'git tag [version]', description: 'Create a lightweight tag', keywords: ['tag', 'version', 'release', 'lightweight'] },
      { script: 'git tag -a [version] [commit]', description: 'Tagging a commit', keywords: ['tag', 'version', 'release', 'later'] },
      { script: 'git push [alias] [version]', description: 'Sharing a tag', keywords: ['tag', 'version', 'release', 'later'] },
      { script: 'git checkout [version]', description: 'Checkout tags', keywords: ['tag', 'version', 'release'] },
    ],
  },
];

export default categories;
