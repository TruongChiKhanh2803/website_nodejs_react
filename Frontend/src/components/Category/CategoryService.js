// // src/components/Category/CategoryService.js
// import axios from "axios";

// const API_URL = "http://localhost:6868"; // Đảm bảo API URL đúng với cấu hình của bạn

// // Lấy danh sách danh mục
// export const getCategories = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/categories`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching categories", error);
//         throw error;
//     }
// };

// // Thêm danh mục mới
// export const createCategory = async (categoryData) => {
//     try {
//         const response = await axios.post(`${API_URL}/categories`, categoryData);
//         return response.data;
//     } catch (error) {
//         console.error("Error creating category", error);
//         throw error;
//     }
// };

// // Cập nhật danh mục
// export const updateCategory = async (id, categoryData) => {
//     try {
//         const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
//         return response.data;
//     } catch (error) {
//         console.error("Error updating category", error);
//         throw error;
//     }
// };

// // Xóa danh mục
// export const deleteCategory = async (id) => {
//     try {
//         const response = await axios.delete(`${API_URL}/categories/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error deleting category", error);
//         throw error;
//     }
// };
