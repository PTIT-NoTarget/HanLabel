pipeline {
    agent {label 'hanlabel'}
    stages {
        stage('Clean up old containers and images') {
            steps {
                script {
                    try {
                        sh 'docker rm -f hanlabel-fe || true'
                        sh 'docker image rm -f hanlabel-fe || true'
                    } catch (Exception e) {
                        echo 'No old containers or images to remove'
                    }
                }
            }
        }
        stage('Build and Run') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
        stage('Cleanup unused data') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}
