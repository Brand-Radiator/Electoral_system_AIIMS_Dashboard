import ApiService from "./ApiService";

const fetchData = async (endpoint: string): Promise<any> => {
    try {
        const response = await ApiService.get(endpoint);
        return response.data;
    } catch (error) {
        // Handle errors
        throw new Error('Failed to fetch data');
    }
};

const createData = async (endpoint: string, data: any): Promise<any> => {
    try {
        const response = await ApiService.post(endpoint, data);
        return response.data;
    } catch (error) {
        // Handle errors
        throw new Error('Failed to create data');
    }
};

const updateData = async (endpoint: string, data: any): Promise<any> => {
    try {
        const response = await ApiService.put(endpoint, data);
        return response.data;
    } catch (error) {
        // Handle errors
        throw new Error('Failed to update data');
    }
};


const updatePatchData = async (endpoint: string, data: any): Promise<any> => {
    try {
        const response = await ApiService.patch(endpoint, data);
        return response.data;
    } catch (error) {
        // Handle errors
        throw new Error('Failed to update data');
    }
};

const deleteData = async (endpoint: string): Promise<any> => {
    try {
        const response = await ApiService.delete(endpoint);
        return response.data;
    } catch (error) {
        // Handle errors
        throw new Error('Failed to delete data');
    }
};

const api = {
    fetchData,
    createData,
    updateData,
    deleteData,
    updatePatchData
};

export default api;

