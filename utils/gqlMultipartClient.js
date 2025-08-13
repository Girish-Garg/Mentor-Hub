/**
 * GraphQL client for multipart/form-data requests (file uploads)
 * Compatible with GraphQL multipart request specification
 */

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

export const gqlMultipartClient = async (query, variables = {}, files = {}, options = {}) => {
    try {
        console.log('🚀 Setting up multipart GraphQL request...');
        
        // Extract operation name for CSRF protection
        const operationName = extractOperationName(query);
        console.log('📝 Operation name:', operationName);
        
        const formData = new FormData();

        // Prepare the operations object
        const operations = {
            query,
            variables
        };

        console.log('📝 Step 1: Adding operations to FormData');
        // Step 1: Add the operations FIRST
        formData.append('operations', JSON.stringify(operations));

        // Step 2: Create and add the map SECOND
        const map = {};
        let fileIndex = 0;

        // Process files and create mapping
        Object.keys(files).forEach(fieldPath => {
            const fileList = Array.isArray(files[fieldPath]) ? files[fieldPath] : [files[fieldPath]];
            
            fileList.forEach((file, index) => {
                if (file && file instanceof File) {
                    const mapKey = fileIndex.toString();
                    map[mapKey] = [`variables.${fieldPath}.${index}`];
                    fileIndex++;
                }
            });
        });

        console.log('📝 Step 2: Adding map to FormData:', map);
        formData.append('map', JSON.stringify(map));

        // Step 3: Add actual files LAST
        fileIndex = 0;
        Object.keys(files).forEach(fieldPath => {
            const fileList = Array.isArray(files[fieldPath]) ? files[fieldPath] : [files[fieldPath]];
            
            fileList.forEach((file, index) => {
                if (file && file instanceof File) {
                    console.log(`📝 Step 3: Adding file ${fileIndex}: ${file.name}`);
                    formData.append(fileIndex.toString(), file);
                    fileIndex++;
                }
            });
        });

        // Make the request
        console.log('🚀 Sending multipart request...');
        const response = await fetch(options.endpoint || "http://localhost:4000/graphql", {
            method: "POST",
            body: formData,
            headers: {
                // CSRF protection headers for Apollo Server
                'apollo-require-preflight': 'true',
                'x-apollo-operation-name': operationName,
                // Don't set Content-Type - let browser set it with boundary
                ...(options.token && { Authorization: `Bearer ${options.token}` }),
                ...options.headers
            }
        });

        console.log(`📡 Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ HTTP Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ GraphQL Response:', result);

        if (result.errors) {
            console.error('❌ GraphQL Errors:', result.errors);
            throw new Error(result.errors[0]?.message || 'GraphQL error occurred');
        }

        return result;

    } catch (error) {
        console.error('❌ Multipart request failed:', error);
        throw error;
    }
};

// Fallback to regular GraphQL request for non-file mutations
export const gqlFallbackClient = async (query, variables = {}, options = {}) => {
    try {
        // Extract operation name for CSRF protection
        const operationName = extractOperationName(query);
        console.log('📝 Fallback operation name:', operationName);
        
        const response = await fetch(options.endpoint || "http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // CSRF protection headers for Apollo Server
                'apollo-require-preflight': 'true',
                'x-apollo-operation-name': operationName,
                ...(options.token && { Authorization: `Bearer ${options.token}` }),
                ...options.headers
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.errors) {
            throw new Error(result.errors[0]?.message || 'GraphQL error occurred');
        }

        return result;
    } catch (error) {
        console.error('GraphQL request failed:', error);
        throw error;
    }
};
