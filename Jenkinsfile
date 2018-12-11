pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        bat 'npm install'
        bat 'gulp'
      }
    }
  }
}