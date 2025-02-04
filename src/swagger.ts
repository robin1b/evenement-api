// swagger.ts
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Evenementen API",
      version: "1.0.0",
      description: "API voor het beheren van evenementen"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server"
      }
    ],
    paths: {
      "/events": {
        get: {
          summary: "Haal alle evenementen op",
          responses: {
            "200": {
              description: "Lijst met evenementen",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Event" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Voeg een nieuw evenement toe",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Event" }
              }
            }
          },
          responses: {
            "201": {
              description: "Evenement toegevoegd",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Event" }
                }
              }
            },
            "400": {
              description: "Ongeldige invoer"
            }
          }
        }
      },
      "/events/{id}": {
        get: {
          summary: "Haal details van een specifiek evenement op",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            "200": {
              description: "Evenement details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Event" }
                }
              }
            },
            "404": {
              description: "Evenement niet gevonden"
            }
          }
        },
        put: {
          summary: "Werk een evenement bij",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Event" }
              }
            }
          },
          responses: {
            "200": {
              description: "Evenement bijgewerkt",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Event" }
                }
              }
            },
            "400": {
              description: "Ongeldige invoer"
            },
            "404": {
              description: "Evenement niet gevonden"
            }
          }
        },
        delete: {
          summary: "Verwijder een evenement",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            "200": {
              description: "Evenement verwijderd"
            },
            "404": {
              description: "Evenement niet gevonden"
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Event: {
          type: "object",
          required: ["name", "date", "location"],
          properties: {
            name: { type: "string" },
            date: { type: "string", format: "date-time" },
            location: { type: "string" },
            description: { type: "string" },
            isFree: { type: "boolean", default: false }
          }
        }
      }
    }
  };
  
  export default swaggerDocument;
  