import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Películas',
    version: '1.0.0',
    description: 'Documentación de la API de Películas con Swagger',
    contact: {
      name: 'Madeleine Daniela Fonseca Bernal',
      email: 'madeleine.fonseca@uptc.edu.co',
    },
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
