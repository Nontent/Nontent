pipeline {
    agent any

    stages {
        stage('Dependencies Frontend') {
            steps {
                echo 'Retrieving dependencies..'
				sh 'cd web-app/ && npm install'
                echo 'Installation completed successfully.'
            }
        }
		stage('Dependencies Backend') {
            steps {
                echo 'Retrieving dependencies..'
				sh 'cd backend/src/ && sudo npm install'
                echo 'Installation completed successfully.'
            }
        }
		stage('SonarQube analysis') {
			steps {
				echo 'Running SonarQube analysis..'
				withSonarQubeEnv('sq-main') { 
					sh "/home/yohark/utils/sonarscanner/sonar-scanner-4.7.0.2747-linux/bin/sonar-scanner"
				}
				echo 'SonarQube analysis completed successfully.'
			}
		}
        stage('Build') {
            steps {
                echo 'Building project..'
				sh 'cd web-app/ && npm run build'
                echo 'Build completed successfully.'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
				echo 'No tests implemented yet: skipping tests.'
            }
        }
		stage('Deploying backend to PreProd') {
            steps {
                echo 'Deploying..'
				sh 'cd backend/ && docker build -t nontent-backend-preprod:latest .'
				echo 'Removing outdated container...'
				sh 'docker rm -f container nontent-backend-preprod'
				echo 'starting new container'
				sh 'docker run -d --name nontent-backend-preprod -p 3001:3000 nontent-backend-preprod:latest'
				echo 'Deployment completed successfully.'
			}
		}
        stage('Deploying Frontend to PreProd') {
            steps {
                echo 'Deploying..'
				sh 'cd web-app/ && docker build -t nontent-web-app-preprod:latest .'
				echo 'Removing outdated container...'
				sh 'docker rm -f container nontent-web-app-preprod'
				echo 'starting new container'
				sh 'docker run -d --name nontent-web-app-preprod -p 3000:3000 nontent-web-app-preprod:latest'
				echo 'Deployment completed successfully.'
			}
		}
		// stage('Deploying to Prod') {
		// 	steps {
		// 		echo 'Deploying..'
		// 		echo 'No deployment implemented yet: skipping deployment.'
		// 	}
        // }
    }
}