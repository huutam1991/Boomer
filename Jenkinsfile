pipeline {
  agent any
  stages {
    stage('554655') {
      steps {
        bat 'npm install'
        bat 'node ./node_modules/gulp/bin/gulp.js'
      }
    }
    stage('deploy') {
      steps {
        bat 'xcopy "./dist" "E:/Projects/1241234" /s /l'
      }
    }
  }
}