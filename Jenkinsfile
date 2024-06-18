pipeline {
    agent {label "fn"}
    environment {
        REACT_APP_ENV = 'cicd'
    }
    stages{
        stage("Check old image") {
            steps {
                sh 'docker rm -f hanlabel-fe || echo "this container does not exist" '
                sh 'docker image rm -f  hanlabel-fe || echo "this image dose not exist" '
            }
        }
        stage('Build and Run') {
            steps {
                sh 'export REACT_APP_ENV=${REACT_APP_ENV} && docker compose up -d --build'
            }
        }
        stage('Cleanup unused data') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}