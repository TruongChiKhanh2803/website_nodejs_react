import News from "../models/NewsModel.js";
import jwt from "jsonwebtoken";

export const getAllNews = async (req, res) => {
    let news = await News.findAll();
    return res.status(200).json({
        errCode: 1,
        message: "Success",
        news: news
    })
}

export const getByNewsID = async (req, res) => {
    const { NewsID } = req.params;
    try {
        const news = await News.findByPk(NewsID);
        if (!news) return res.status(404).json({ msg: "Không tìm thấy tin tức" });

        // Explicitly return necessary fields
        return res.status(200).json({
            errCode: 1,
            message: "Success",
            news: {
                Title: news.Title,
                Content: news.Content,
                ImageURL: news.ImageURL,
                CreatedAt: news.CreatedAt,
                UpdatedAt: news.UpdatedAt,
                Status: news.Status
            }
        });
    } catch (error) {
        return res.status(500).json({ errCode: 0, message: "Lỗi khi tải tin tức", error });
    }
};



export const createNews = async (req, res) => {
    const { Title, Content } = req.body;
    try {
        // Tạo một bản tin tức mới
        await News.create({ Title, Content });

        // Trả về phản hồi thành công
        return res.status(200).json({
            errCode: 1, // Mã lỗi (thành công)
            message: "Tin tức đã được tạo thành công",
            news: { Title, Content } // Trả về tin tức mới đã được tạo
        });
    } catch (error) {
        // Trả về phản hồi lỗi nếu có lỗi
        return res.status(500).json({
            errCode: 0, // Mã lỗi (thất bại)
            message: "Lỗi khi tạo tin tức",
            error: error.message
        });
    }
};



export const updateNews = async (req, res) => {
    const { NewsID } = req.params; // Lấy NewsID từ URL
    const { Title, Content } = req.body; // Dữ liệu cần cập nhật

    try {
        // Tìm bản ghi cần cập nhật
        const news = await News.findByPk(NewsID);

        if (!news) {
            // Nếu không tìm thấy tin tức, trả về lỗi
            return res.status(404).json({
                errCode: 0,
                message: "Tin tức không tồn tại",
            });
        }

        // Cập nhật tin tức
        await News.update(
            { Title, Content }, // Dữ liệu cần cập nhật
            { where: { NewsID } } // Điều kiện
        );

        // Trả về phản hồi thành công
        return res.status(200).json({
            errCode: 1,
            message: "Tin tức đã được cập nhật thành công",
        });
    } catch (error) {
        // Trả về lỗi nếu có vấn đề
        return res.status(500).json({
            errCode: 0,
            message: "Lỗi khi cập nhật tin tức",
            error: error.message,
        });
    }
};


export const deleteNews = async (req, res) => {
    const { NewsID } = req.params;
    try {
        const result = await News.destroy({ where: { NewsID: NewsID } });
        if (!result) return res.status(404).json({ msg: "Không tìm thấy tin tức" });
        res.json({ msg: "Tin tức đã được xóa thành công" });
    } catch (error) {
        res.status(500).json({ msg: "Lỗi khi xóa tin tức", error });
    }
};

