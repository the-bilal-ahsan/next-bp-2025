Got it 👍
Here’s a **comprehensive list of Git commands** (usual + uncommon) that you can add to your `.md` file as a handy reference.

---

# 📌 Git Commands Cheat Sheet

## 🔹 Setup & Config

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "code --wait"
git config --list
```

---

## 🔹 Starting a Repository

```bash
git init
git clone <repo-url>
git clone <repo-url> my-folder
```

---

## 🔹 Basic Snapshotting

```bash
git status
git add <file>
git add .                    # Add all changes
git reset <file>             # Unstage file
git reset --hard             # Reset working dir completely
git commit -m "message"
git commit --amend           # Edit last commit
```

---

## 🔹 Branching & Merging

```bash
git branch                   # List branches
git branch new-branch
git checkout new-branch
git switch new-branch        # (new way)
git checkout -b new-branch   # Create + switch
git merge new-branch
git rebase main
git cherry-pick <commit-hash>
git branch -d branch-name    # Delete branch (safe)
git branch -D branch-name    # Delete branch (force)
```

---

## 🔹 Remote Repositories

```bash
git remote -v
git remote add origin <url>
git push -u origin main
git push
git fetch
git pull origin main
git remote remove origin
```

---

## 🔹 Undoing Changes

```bash
git restore <file>           # Undo changes in working dir
git restore --staged <file>  # Unstage file
git checkout -- <file>       # Old way to restore
git revert <commit-hash>     # Make opposite commit
git reset --soft HEAD~1      # Undo last commit but keep changes
git reset --hard HEAD~1      # Undo commit & discard changes
```

---

## 🔹 Stashing

```bash
git stash
git stash save "message"
git stash list
git stash apply stash@{0}
git stash pop
git stash drop stash@{0}
git stash clear
```

---

## 🔹 Logs & History

```bash
git log
git log --oneline
git log --graph --oneline --all
git show <commit-hash>
git diff
git diff --staged
```

---

## 🔹 Tags

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"
git tag
git show v1.0.0
git push origin v1.0.0
git push origin --tags
```

---

## 🔹 Collaboration

```bash
git pull --rebase
git fetch origin main
git merge origin/main
git push origin feature-branch
```

---

## 🔹 Advanced / Unusual Commands

```bash
git reflog                   # History of HEAD
git shortlog -sn             # Contributions per author
git blame <file>             # Who wrote each line
git bisect start             # Start binary search for bug
git bisect good <commit>
git bisect bad <commit>
git bisect reset
git clean -fd                # Remove untracked files/dirs
git cherry -v                # Show unmerged commits
git grep "functionName"      # Search in repo
git archive --format=zip HEAD > repo.zip
git submodule add <url> path
git submodule update --init --recursive
```

---

## 🔹 Aliases (Optional)

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

---

✅ This list includes **everyday commands** + **less common ones** like `bisect`, `reflog`, `grep`, `archive`, and `submodule`.

Do you want me to **organize this into sections with short one-line explanations** (like a real dev handbook), or just keep it as raw command blocks for your `.md` file?
