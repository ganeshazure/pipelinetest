/**
 * ================================================================
 * File Name : gitcommands.spec.js
 * Purpose   : Git Commands Cheat Sheet for QA Automation Engineers
 * Author    : Ganesh
 * ================================================================
 *
 * NOTE:
 * This is NOT executable JavaScript.
 * It is a reference file to learn Git commands.
 *
 * ================================================================
 */

/*==================================================================
 STEP 1 : Clone the Repository (One Time Only)
==================================================================*/

// Clone the remote repository to your local machine
git clone https://github.com/company/automation.git


/*==================================================================
 STEP 2 : Go Inside Project Folder
==================================================================*/

cd automation


/*==================================================================
 STEP 3 : Check Current Branch
==================================================================*/

// Shows the current branch
git branch

// Example Output
// * main

// OR

// * develop


/*==================================================================
 STEP 4 : View All Local & Remote Branches
==================================================================*/

git branch -a


/*==================================================================
 STEP 5 : Check Default Branch of Repository
==================================================================*/

git remote show origin

// Example Output
// HEAD branch: main


/*==================================================================
 STEP 6 : Switch to Develop Branch
==================================================================*/

// If develop branch already exists locally
git checkout develop

// OR (Modern Git)
git switch develop


/*==================================================================
 STEP 7 : First Time Switching to Develop
==================================================================*/

// If develop exists only on remote
git checkout -b develop origin/develop

// OR
git switch --track origin/develop


/*==================================================================
 STEP 8 : Get Latest Code
==================================================================*/

// Download + Merge latest code
git pull origin develop


/*==================================================================
 STEP 9 : Download Changes Without Merge
==================================================================*/

git fetch


/*==================================================================
 STEP 10 : Create Your Feature Branch
==================================================================*/

git checkout -b feature/login

// OR

git switch -c feature/login


/*==================================================================
 STEP 11 : Verify Current Branch
==================================================================*/

git branch

// Example
// * feature/login


/*==================================================================
 STEP 12 : Check Current Changes
==================================================================*/

git status


/*==================================================================
 STEP 13 : Compare Changes
==================================================================*/

git diff


/*==================================================================
 STEP 14 : Add Files to Staging
==================================================================*/

// Add all files
git add .

// Add specific file
git add LoginPage.ts

// Add multiple files
git add LoginPage.ts LoginTest.spec.ts


/*==================================================================
 STEP 15 : Commit Changes
==================================================================*/

git commit -m "Added Login Automation"


/*==================================================================
 STEP 16 : View Commit History
==================================================================*/

git log


/*==================================================================
 STEP 17 : Push Feature Branch
==================================================================*/

git push origin feature/login


/*==================================================================
 STEP 18 : Create Pull Request
==================================================================*/

// Done from
// GitHub
// Azure DevOps
// GitLab

// feature/login
//        ↓
// develop


/*==================================================================
 STEP 19 : Lead Reviews Code
==================================================================*/

// Review

// Approve

// Request Changes

// Merge


/*==================================================================
 STEP 20 : Delete Local Branch After Merge
==================================================================*/

git branch -d feature/login


/*==================================================================
 STEP 21 : Delete Remote Branch
==================================================================*/

git push origin --delete feature/login


/*==================================================================
 STEP 22 : Save Unfinished Work
==================================================================*/

// Save current work temporarily
git stash


/*==================================================================
 STEP 23 : Restore Stashed Work
==================================================================*/

git stash pop


/*==================================================================
 STEP 24 : List All Stashes
==================================================================*/

git stash list


/*==================================================================
 STEP 25 : Discard Local Changes
==================================================================*/

// WARNING
// Removes ALL local changes

git reset --hard


/*==================================================================
 STEP 26 : Reset Main Branch
==================================================================*/

// If accidentally committed on main

git checkout main

git reset --hard origin/main


/*==================================================================
 STEP 27 : If You Worked on Main Without Commit
==================================================================*/

// Current branch

main

// Create feature branch

git checkout -b feature/login

// Your changes move automatically


/*==================================================================
 STEP 28 : If You Already Committed on Main
==================================================================*/

// Create feature branch

git checkout -b feature/login

// Return to main

git checkout main

// Reset main

git reset --hard origin/main


/*==================================================================
 STEP 29 : Merge Develop into Feature Branch
==================================================================*/

git checkout feature/login

git merge develop


/*==================================================================
 STEP 30 : Rebase Feature Branch (Optional)
==================================================================*/

git checkout feature/login

git rebase develop


/*==================================================================
 STEP 31 : Resolve Merge Conflict
==================================================================*/

// Open conflicted files

// Remove

<<<<<<< HEAD
=======

>>>>>>> feature/login

// Keep correct code

git add .

git commit -m "Resolved Merge Conflict"


/*==================================================================
 STEP 32 : Undo Last Commit (Keep Changes)
==================================================================*/

git reset --soft HEAD~1


/*==================================================================
 STEP 33 : Undo Last Commit (Discard Changes)
==================================================================*/

git reset --hard HEAD~1


/*==================================================================
 STEP 34 : Revert a Commit
==================================================================*/

git revert <commit-id>


/*==================================================================
 STEP 35 : Check Remote Repository
==================================================================*/

git remote -v


/*==================================================================
 STEP 36 : Check Current Branch
==================================================================*/

git branch


/*==================================================================
 STEP 37 : Clone → Develop → Feature Workflow
==================================================================*/

git clone https://github.com/company/automation.git

cd automation

git checkout develop

git pull origin develop

git checkout -b feature/login


/*==================================================================
 STEP 38 : Complete Daily Workflow
==================================================================*/

git status

git add .

git commit -m "Added Login Automation"

git push origin feature/login

// Create Pull Request

// Wait for Review

// Merge


/*==================================================================
 STEP 39 : Typical Industry Workflow
==================================================================*/

/*

Repository

main
│
├──────── Production

develop
│
├──────── Daily Development

feature/login
feature/search
feature/cart

Automation Engineer

Clone

↓

Checkout develop

↓

Pull latest code

↓

Create feature branch

↓

Write automation

↓

git status

↓

git add

↓

git commit

↓

git push

↓

Create Pull Request

↓

Lead Review

↓

Merge into develop

↓

CI/CD Executes

↓

Reports Generated

*/


/*==================================================================
 STEP 40 : Most Important Git Commands for QA Automation
==================================================================*/

/*

git clone

git branch

git checkout

git checkout -b

git switch

git status

git add .

git commit

git push

git pull

git fetch

git diff

git log

git stash

git stash pop

git merge

git rebase

git reset

git revert

git remote -v

git branch -a

git branch -d

git push origin --delete

*/


/*==================================================================
 INTERVIEW FLOW
==================================================================*/

/*

1. Lead shares repository URL

2. git clone

3. cd project

4. npm install

5. npx playwright install

6. Run existing tests

7. git checkout develop

8. git pull origin develop

9. git checkout -b feature/login

10. Write code

11. git status

12. git add .

13. git commit -m "Implemented Login"

14. git push origin feature/login

15. Create Pull Request

16. Lead Review

17. Merge

18. Pipeline Executes

19. Reports Generated

*/