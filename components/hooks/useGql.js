import { useState, useCallback } from "react";
import { gqlClient } from "@/utils/gqlClient";

const useGql = () => {
    const [gqlData, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeQuery = useCallback(async (query, variables = {}, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await gqlClient(query, variables, options);
            setData(response.data);
            return response.data; // Return the data so it can be used in the calling function
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return { gqlData, loading, error, executeQuery, reset };
}

export default useGql;
