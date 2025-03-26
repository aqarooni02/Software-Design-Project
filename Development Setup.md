# How to setup dev environment

## repo setup

- ensure node is installed
  - check by doing ``` node -v ```
- git clone this repo
  - ``` git clone https://github.com/aqarooni02/Software-Design-Project.git ```
- cd into Software-Design-Project
  - ``` cd Software-Design-Project ```
- install node packages
  - ``` npm install ```
- Run live dev server
  - ``` npm run dev ```

## Create your own dev branch

- while in main checkout a new branch with your name
  - ``` git checkout -b "YourName" ```

### This is for ensuring your changes are in your isolated branch

## Update your dev branch with main

### To update your branch with the latest changes of main

### Typically done before starting on a new feature

- While in main, pull latest changes
  - ``` git pull ```
- Checkout your branch
  - ``` git checkout YourBranchName ```
- Merge latest main with your branch
  - ``` git merge main ```

## After developing your feature

### While on your branch follow these steps

- Add changes to be staged
  - ``` git add . ``` adds all changes
- Commit staged changes. This saves your commit locally
  - ``` git commit -m "commit message" ```
- Push your commits to your branch
  - ``` git push ```
  - You may get a prompt to set upstream origin. In that case copy the command it gives and run it
  - What this does is link your local branch to the cloud/remote branch in github

## Integrating your changes to main

### The reason for seperate dev branches is to allow resolving merge conflicts to be done in the dev branch instead of main

### main should only contain the latest error free code

- Pull latest changes from main branch
  - ``` git pull ```
- Ensure your branch has the changes
- While in main merge your branch into main
  - ``` git merge YourBranchName ```
- Ensure no conflicts, resolve if necessary
- Push the merged commits
  - ``` git push ```

## Useful git commands

- Log the commits in current branch
  - ``` git log ```
- Check the status and changes of the current branch
  - ``` git status ```
- Continue a merge after resolving conflicts
  - ``` git merge --continue ```
