# Installation Guide for NestJS with RabbitMQ

This guide will walk you through the installation process of a NestJS project integrated with RabbitMQ.

### Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your machine:

- Node.js (version 14 or above)
- npm (Node Package Manager) or yarn

### Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:

   ```shell
   git clone https://github.com/mohanadft/Messanger.git
   ```

4. Once the repository is cloned, navigate into the project directory:

   ```shell
   cd Messanger
   ```

### Install Dependencies

1. Run the following command to install the project dependencies:

   ```shell
   yarn install
   ```

   This command will download and install all the required dependencies specified in the `package.json` file.

Certainly! Here's an updated section for using Docker Compose with RabbitMQ in your NestJS project:

### Using Docker Compose with RabbitMQ

If you prefer to run RabbitMQ using Docker Compose, you can follow these steps:

#### Prerequisites

Before proceeding, ensure that you have Docker and Docker Compose installed on your machine.

#### Docker Compose Configuration

1. Create a `docker-compose.yml` file in the root directory of your project.
2. Open the `docker-compose.yml` file and add the following configuration:

   ```yaml
   version: '3'
   services:
   rabbitmq:
     image: rabbitmq:3-management
     container_name: rabbitmq
     hostname: rabbitmq
     volumes:
       - /var/lib/rabbitmq
     ports:
       - '5672:5672'
       - '15672:15672'
     env_file:
       - ./.env
   ```

   This configuration uses the `rabbitmq:3.9-management` image, which includes both RabbitMQ and the management UI. It exposes ports `5672` for RabbitMQ and `15672` for the management UI.

   Make sure to set the `RABBITMQ_DEFAULT_USER` and `RABBITMQ_DEFAULT_PASS` environment variables to the desired username and password for your RabbitMQ instance.

#### Start the Containers

1. Open your terminal or command prompt.
2. Navigate to the root directory of your project (where the `docker-compose.yml` file is located).
3. Run the following command to start the containers:

   ```shell
   docker compose up
   ```

   This command will download the RabbitMQ Docker image (if not already available) and start the RabbitMQ container.

   You should see the RabbitMQ logs in the console, indicating that the RabbitMQ server has started and the management UI is accessible at <http://localhost:15672>.

#### Stop the Containers

To stop and remove the RabbitMQ containers, you can use the following command:

```shell
docker compose down
```

This command will stop the containers and remove them, freeing up the resources.

Make sure to set the URL to `amqp://localhost:5672` to match the Docker container's configuration.

### Run the Application

1. Start the NestJS Application:

   - In your terminal, run the following command to start the NestJS application:

     ```shell
     yarn start:server
     ```

   - Run the auth service:

     ```shell
     cd server
     yarn run start:dev auth
     ```

   - The application will start running, and you should see the console output indicating that the server has started.

2. Verify the Application:
   - Open your browser and navigate to <http://localhost:3000> (or the specified port).
   - If the application loads successfully, you have set up the NestJS project with RabbitMQ correctly.

Congratulations! You have successfully installed and configured a NestJS project integrated with RabbitMQ. You can now proceed with using RabbitMQ for message processing in your NestJS application.

If you encounter any issues or have further questions, please refer to the troubleshooting section or reach out for support.

## Conclusion

In this installation guide, you learned how to set up a NestJS project with RabbitMQ. You cloned the

repository, installed the dependencies, configured RabbitMQ, and ran the application. Feel free to explore the project further and start integrating RabbitMQ into your NestJS application for messaging functionality.

If you have any feedback or suggestions for improvement, please don't hesitate to reach out or contribute to the project.

Happy coding!
