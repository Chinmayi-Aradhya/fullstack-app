# VS Code Terminal: 
# DOCKER

docker-compose up --build

# KUBERNETES

kubectl apply -f k8s/

kubectl get pods -n fullstack-app


# BROWSER: 

http://localhost:3000 ---> frontend

http://localhost:5000/api/users


# POSTGRESQL:

select * from users


# NEWMAN - RestAPI

GET ------------> http://localhost:5000/api/users

POST -----------> http://localhost:5000/api/users

{

    "name": "Meri",

    "email": "meri@mail.com"

}

PUT ------------> http://localhost:5000/api/users/5

{

    "name": "John",

    "email": "john@mail.com"
    
}

DELETE ---------> http://localost:5000/api/users/5


# UNIT TEST using JEST
# Move to backend folder

cd backend/

npm test


# For argocd 
helm repo add argo https://argoproj.github.io/argo-helm

helm repo update

kubectl create namespace argocd

helm install argocd argo/argo-cd -n argocd --create-namespace

kubectl get pods -n argocd

kubectl port-forward service/argocd-server -n argocd 8080:443

(If you directly want to login then)

argocd login localhost:8080 --username admin --password ([System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String((kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}")))) --insecure

(Or else if you want password first then you wnat to login then)

$pass = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($pass))

Open http://localhost:8080