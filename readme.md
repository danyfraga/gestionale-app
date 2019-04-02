# Git Commands

- git init - Crea una nuova repository git.
- git status - Visualizza i cambiamenti del codice nel progetto
- git add - Aggiunge files alla staging area
- git commit - Crea un nuovo commit con i files della staging area
- git log - Visualizza i commit recenti

# Istruzioni per la creazione di una nuova repository

1) Fare login su github.com
2) Creare una nuova repository
3) Su terminale all'interno della folder del progetto -> ssh-keygen -t rsa -b 4096 -C "danielefragale18@gmail.com" (email) -> premere invio, premere invio
4) Su terminale -> ls -a ~/.ssh
5) Su terminale -> eval "$(ssh-agent -s)"
6) Su terminale -> ssh-add ~/.ssh/id_rsa
7) Su terminale -> pbcopy < ~/.ssh/id_rsa.pub (-> a questo punto viene copiata la stringa della chiave)
8) Su github.com -> andare sulle impostazioni del profilo,
                    andare nella sezione SSH and GPG keys,
                    inserire il titolo della chiave e incollare la stringa della chiave sotto la voce key
9) Su terminale -> ssh -T git@github.com (connessione a github)
10) Su terminale -> Are you sure you want to continue connecting (yes/no)? yes (rispondere yes)
11) Su github.com -> andare sulla repository appena creata e copiare il Quick setup sotto la voce SSH
12) Su terminale -> git remote add origin (incollare il Quick setup)
13) Su terminale -> git remote 
14) Su terminale -> git remote -v
15) Su terminale -> git push -u origin master 
16) Su github.com -> si dovrebbe vedere tutto il progetto importato.
