import { useState, useCallback } from "react";
import gqlClient from "@/utils/gqlClient";

export default useGql = async (query, variables = {}, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeQuery = useCallback(async () => {
        setLoading(true);
        try {
            const response = await gqlClient(query, variables, options);
            setData(response.data);
        } catch (err) {
            setError(err);
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
