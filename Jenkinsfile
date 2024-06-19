pipeline {
    agent {label "fn"}
    environment {
        REACT_APP_ENV = 'cicd'
    }
    stages {
        stage("Check old image") {
            steps {
                sh 'docker rm -f hanlabel-fe || echo "this container does not exist"'
                sh 'docker image rm -f hanlabel-fe || echo "this image does not exist"'
            }
        }
        stage('Build and Run') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }
}
