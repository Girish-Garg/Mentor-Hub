import axios from "axios";

export const gqlClient = async (query, variables = {}, options = {}) => {
    try {
        const response = await axios.post("http://localhost:4000/graphql", {
            query,
            variables
        }, {
            headers: {
                "Content-Type": "application/json",
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