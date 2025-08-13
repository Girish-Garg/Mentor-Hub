import axios from "axios";

/**
 * Extract operation name from GraphQL query
 */
const extractOperationName = (query) => {
    try {
        // Simple regex to extract operation name
        const match = query.match(/(?:mutation|query)\s+(\w+)/);
        return match ? match[1] : 'GraphQLOperation';
    } catch (error) {
        return 'GraphQLOperation';
    }
};

export const gqlClient = async (query, variables = {}, options = {}) => {
    try {
        // Extract operation name for CSRF protection
        const operationName = extractOperationName(query);
        
        const response = await axios.post("http://localhost:4000/graphql", {
            query,
            variables
        }, {
            headers: {
                "Content-Type": "application/json",
                // CSRF protection headers for Apollo Server
                'apollo-require-preflight': 'true',
                'x-apollo-operation-name': operationName,
                ...(options.token && { Authorization: `Bearer ${options.token}` }),
                ...options.headers
            },
            timeout: 10000 // 10 second timeout
        });
        if (response.data.errors) {
            throw new Error(response.data.errors[0].message || 'There is Some Server Error');
        }

        return response.data; // Axios automatically parses JSON
    } catch (error) {
        console.error("Error in GraphQL request:", error);
        throw error;
    }

}