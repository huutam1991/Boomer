pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        bat 'npm install'
        bat 'node ./node_modules/gulp/bin/gulp.js'
      }
    }
  }
}