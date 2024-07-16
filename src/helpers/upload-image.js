import axios from 'axios';
import FormData from 'form-data';

export const uploadImageToImgBB = async (img) => {
    try {
        const data = new FormData();
        data.append('image', img.data.toString('base64'));

        const response = await axios.post(`${process.env.API_IMG}&name=${img.name}`, data, {
            headers: {
                'Content-Type': `multipart/form-data'`,
            }
        });

        if (response.data && response.data.data && response.data.data.url) {
            return response.data.data.url;
        } else {
            throw new Error('Failed to upload image to ImgBB');
        }
    } catch (error) {
        throw new Error(`Image upload error: ${error.message}`);
    }
};